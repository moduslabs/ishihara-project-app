import { Component, Element, h, State } from '@stencil/core';
import state from '../../store';
import { capitalizePlateAnswer } from '../../helpers/utils';
import routes from '../../helpers/routes';
import { Plate } from '../../types/plate';

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
  }

  handleChange(e, plate: Plate) {
    plate.answer = e.target?.value || null;
  }

  async next() {
    state.plates = capitalizePlateAnswer(this.plates);
    const isLastSlide = await this.slides.isEnd();
    if (isLastSlide) {
      this.router.push(routes.result.url);
    } else {
      this.slides.slideNext();
    }
    if (this.slideIndex < this.plates?.length - 1) this.slideIndex++;
  }

  prev() {
    this.slides.slidePrev();
    if (this.slideIndex > 0) this.slideIndex--;
  }

  render() {
    return (
      <div class="ion-padding">
        <h2>Color Deficiency Test</h2>
        <ion-slides options={this.slideOpts}>
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
                  <ion-input data-testid="user-input" class="uppercase" autofocus value={plate.answer} onInput={e => this.handleChange(e, plate)}></ion-input>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <app-button data-testid={`prev-btn-${index}`} to={routes.slides.url} secondary value="Previous" disabled={index === 0} clickHandler={this.prev.bind(this)} expand="block" />
                </ion-col>
                <ion-col>
                  <app-button data-testid={`next-btn-${index}`} to={routes.slides.url} value="Next" clickHandler={this.next.bind(this)} expand="block" />
                </ion-col>
              </ion-row>
            </ion-slide>
          ))}
        </ion-slides>
      </div>
    );
  }
}
