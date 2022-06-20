import { Component, Element, h, State } from '@stencil/core';
import state from '../../store';
import { Keyboard } from '@capacitor/keyboard';
import { capitalizePlateAnswer } from '../../helpers/utils';
import routes from '../../helpers/routes';
import { Plate } from '../../types/plate';
import { toastController, alertController } from '@ionic/core';
import { SlideChangeDirection, SliderInputState } from '../../types/slider';

@Component({
  tag: 'app-slider',
  styleUrl: 'slider.css',
  scoped: true,
})
export class SliderPage {
  @Element() el: HTMLElement;
  @State() slides: HTMLIonSlidesElement;
  @State() slideIndex: number = 0;
  @State() plates: Plate[] = state.plates;
  @State() shouldHide: boolean = false;
  @State() inputState: SliderInputState = {
    isDirty: false,
    isValid: false,
  };
  private router: HTMLIonRouterElement = document.querySelector('ion-router');
  private slideOpts = { initialSlide: 0, speed: 400 };

  componentDidLoad() {
    this.slides = this.el.querySelector('ion-slides');
    this.slides.lockSwipeToNext(true);
    this.infoAlert();

    Keyboard.addListener('keyboardWillShow', () => {
      this.shouldHide = true;
    });
    
    Keyboard.addListener('keyboardDidHide', () => {
      this.shouldHide = false;
    });
  }

  disconnectedCallback() {
    Keyboard.removeAllListeners();
  }

  /**
   * Handle input from the user
   *
   * This is called when the user enters an answer.
   * It updates the answer of the target plate and component state, and enables
   * swiping to the next slide if a valid answer was entered.
   * @param e - Input event
   * @param index - Index of the plate the input is for
   */
  async handleInput(e: Event, index: number) {
    const inputEl = await (e.target as HTMLIonInputElement).getInputElement();

    // Set input state
    this.inputState = {
      isDirty: true,
      isValid: inputEl.validity.valid,
    };

    // Update plate answer only if the input is valid
    if (this.inputState.isValid) {
      // Mutate the plates array state to trigger component update & re-render
      this.plates = this.plates.map((plate, i) => {
        if (i === index) {
          plate.answer = inputEl.value;
        }
        return plate;
      });
    }

    // Enable swiping to the next slide - if an answer was entered
    this.slides.lockSwipeToNext(!this.inputState.isValid || !inputEl.value);
  }
  
  /**
   * Swipe over the current slide
   *
   * This is called when the user press the Enter key 
   * @param e - Input event
   * @param index - Index of the plate
   */
  handleKeyDown(e: KeyboardEvent, index: number) {
    // Enable swiping to the next slide by pressing the keyboard enter key
    if(e.key === "Enter") {
      this.next(index);
    }
  }

  /**
   * Skip the current slide
   *
   * This is called when the user clicks the skip button.
   * It resets the answer of the target plate and skips to the next slide.
   * @param index - Index of the plate to skip
   */
  skip(index: number) {
    // Remove answer, in case an answer was already entered
    delete this.plates[index].answer;
    // Enable swiping to the next slide before skipping, else the user can't skip to the next slide
    this.slides.lockSwipeToNext(false);
    this.next(index, false);
  }

  /**
   * Handle the slide change event
   *
   * This is called when the user switches to a different slide either by swiping or by clicking the next/prev/skip buttons.
   * It updates the slide index and enables/disables swiping to the next slide - if the user has already answered the current slide.
   * @param changeDirection - Direction of the slide change: 'prev' or 'next'.
   */
  handleSlideChange(changeDirection: SlideChangeDirection) {
    switch (changeDirection) {
      case SlideChangeDirection.Previous:
        if (this.slideIndex > 0) this.slideIndex--;
        break;

      case SlideChangeDirection.Next:
        if (this.slideIndex < this.plates?.length - 1) this.slideIndex++;
        break;

      default:
        throw new Error(`Unknown slide change type: ${changeDirection}`);
    }

    // Update input state and enable/disable swiping to the next slide
    this.inputState = {
      isDirty: false,
      isValid: !!this.plates[this.slideIndex].answer,
    };
    this.slides.lockSwipeToNext(!this.inputState.isValid || !this.plates[this.slideIndex].answer);
  }

  /**
   * Show a toast to inform the user that they need to enter an answer
   */
  async requireInputToast() {
    (
      await toastController.create({
        message: 'Please enter your answer',
        animated: true,
        duration: 2000,
        position: 'bottom',
      })
    ).present();
  }

  /**
   * Show an alert to inform the user that letters in the test are upper-case
   */
  async infoAlert() {
    const alert = await alertController.create({
      header: 'Important',
      message: 'All the letters shown in this test are upper-case.',
      buttons: ['Got it']
    });

    await alert.present();
  }

  /**
   * Move to the next slide
   *
   * This is called when the user clicks the next or skip buttons.
   * - If the skip button was clicked, it skips to the next slide or the results page if the last slide was reached.
   * - If the next button was clicked, it checks if an answer was entered for the current slide.
   *   - If an answer was entered, it updates the answers in the store and moves to the next slide.
   *   - Otherwise, it shows a toast to inform the user that they need to enter an answer.
   * @param currentIndex - Index of the current slide
   * @param requireAnswerToProceed - Whether or not to require an answer to proceed.
   * True by default (for the next func), should be false for the skip func.
   */
  async next(currentIndex: number, requireAnswerToProceed = true) {
    // Ensure the user has entered an answer, if input is required to proceed
    if (requireAnswerToProceed && !this.plates[currentIndex].answer) {
      await this.requireInputToast();
      return;
    }

    state.plates = capitalizePlateAnswer(this.plates);
    const isLastSlide = await this.slides.isEnd();
    if (isLastSlide) {
      this.router.push(routes.result.url, 'root');
    } else {
      this.slides.slideNext();
    }
  }

  /**
   * Move to the previous slide
   */
  async prev() {
    this.slides.slidePrev();
  }

  render() {
    return (
      <app-layout shouldHide={this.shouldHide}>
        <div class="ion-padding">
          <h2>Color Deficiency Test</h2>
          <ion-slides
            options={this.slideOpts}
            onIonSlideNextStart={this.handleSlideChange.bind(this, SlideChangeDirection.Next)}
            onIonSlidePrevStart={this.handleSlideChange.bind(this, SlideChangeDirection.Previous)}
          >
            {this.plates?.map((plate, index) => (
              <ion-slide>
                <div class="plate">
                  <img data-testid={`plate-${index}`} src={plate.url} alt={`plate ${index}`} />
                  <span>
                    {index + 1}/{this.plates.length}
                  </span>
                </div>
                <ion-row class="input-container">
                  <ion-label>Enter what you see</ion-label>
                  <ion-col>
                    <ion-input
                      data-testid="user-input"
                      class="uppercase"
                      autofocus
                      autocapitalize="capitalize"
                      value={plate.answer}
                      debounce={300}
                      onIonInput={e => this.handleInput(e, index)}
                      onKeyDown={e => this.handleKeyDown(e, index)}
                      type="text"
                      pattern="[A-Za-z0-9]*"
                    ></ion-input>
                    {this.inputState.isDirty && !this.inputState.isValid ? <ion-label color="danger">Answer should be alphanumeric</ion-label> : null}
                  </ion-col>
                  <ion-col class="ion-margin-top">
                    <app-button size="large" dataTestId={`skip-btn-${index}`} value="Skip" clickHandler={this.skip.bind(this, index)} expand="block"></app-button>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col>
                    <app-button size="large" dataTestId={`prev-btn-${index}`} secondary value="Previous" disabled={index === 0} clickHandler={this.prev.bind(this)} expand="block" />
                  </ion-col>
                  <ion-col>
                    <app-button
                      dataTestId={`next-btn-${index}`}
                      value={index + 1 === this.plates.length ? 'Finish' : 'Next'}
                      clickHandler={this.next.bind(this, index)}
                      expand="block"
                      size="large"
                      disabled={!this.inputState.isValid || !this.plates[index].answer}
                    />
                  </ion-col>
                </ion-row>
              </ion-slide>
            ))}
          </ion-slides>
        </div>
      </app-layout>
    );
  }
}
