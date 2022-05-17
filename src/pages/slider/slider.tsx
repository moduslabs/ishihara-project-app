import { Component, Element, h, State } from '@stencil/core';
import state from '../../store';
import { assertOnlyAlphanumericChars, capitalizePlateAnswer } from '../../helpers/utils';
import routes from '../../helpers/routes';
import { Plate } from '../../types/plate';
import { toastController } from '@ionic/core';
import { SlideChangeDirection } from '../../types/slider';

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
  private router: HTMLIonRouterElement = document.querySelector('ion-router');
  private slideOpts = { initialSlide: 0, speed: 400 };

  componentDidLoad() {
    this.slides = this.el.querySelector('ion-slides');
    this.slides.lockSwipeToNext(!this.plates[this.slideIndex].answer);
  }

  /**
   * Handle input from the user
   *
   * This is called when the user enters an answer.
   * It updates the answer of the target plate and component state, and enables
   * swiping to the next slide if an answer was entered.
   * @param e - Input event
   * @param index - Index of the plate the input is for
   */
  handleInput(e: Event, index: number) {
    const value = (e.target as HTMLInputElement).value;

    // Mutate the plates array state to trigger component update & re-render
    this.plates = this.plates.map((plate, i) => {
      if (i === index) {
        plate.answer = value;
      }
      return plate;
    });

    // Enable swiping to the next slide - if an answer was entered
    this.slides.lockSwipeToNext(!value);
  }
  
  /**
   * Handle keydown events
   * 
   * This is called when the user presses a key in the input field.
   * It validates the input and allows only alphanumeric characters to be entered.
   * @param e - Keyboard event
   */
  handleKeyDown(e: KeyboardEvent) {
    /**
     * Proceed only if key length is 1.
     * If key length is greater than 1, it means key is a modifier key, e.g ctrl, shift, enter, etc.
     */
    if (e.key.length === 1 && !assertOnlyAlphanumericChars(e.key)) {
      e.preventDefault();
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

    this.slides.lockSwipeToNext(!this.plates[this.slideIndex].answer);
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
      this.router.push(routes.result.url);
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
      <app-layout>
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
                      onInput={e => this.handleInput(e, index)}
                      onKeyDown={e => this.handleKeyDown(e)}
                    ></ion-input>
                  </ion-col>
                  <ion-col>
                    <app-button
                      dataTestId={`skip-btn-${index}`}
                      to={routes.slides.url}
                      value="Skip"
                      clickHandler={this.skip.bind(this, index)}
                      expand="block"
                    ></app-button>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col>
                    <app-button
                      dataTestId={`prev-btn-${index}`}
                      to={routes.slides.url}
                      secondary
                      value="Previous"
                      disabled={index === 0}
                      clickHandler={this.prev.bind(this)}
                      expand="block"
                    />
                  </ion-col>
                  <ion-col>
                    <app-button
                      dataTestId={`next-btn-${index}`}
                      to={routes.slides.url}
                      value={index + 1 === this.plates.length ? 'Finish' : 'Next'}
                      clickHandler={this.next.bind(this, index)}
                      expand="block"
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
