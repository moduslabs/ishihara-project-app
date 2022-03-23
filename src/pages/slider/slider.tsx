import { Component, Element, h, State } from '@stencil/core';
import state from '../../store';
import { capitalizePlateAnswer } from '../../helpers/utils';
import routes from '../../helpers/routes';

export type Plate = {
  key: string;
  url: string;
  answer?: null | string | number;
};

@Component({
  tag: 'ish-slider',
  styleUrl: 'slider.css',
})
export class SliderPage {
  @Element() el: HTMLElement;
  @State() slides: HTMLIonSlidesElement;
  @State() plates: Plate[] = state.plates;
  private router: HTMLIonRouterElement = document.querySelector('ion-router');
  private slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

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
      this.router.push(routes.confirmation.url);
    } else {
      this.slides.slideNext();
    }
  }

  prev() {
    this.slides.slidePrev();
  }

  render() {
    return (
      <div>
        <h2 class="heading">Color Deficiency Test</h2>
        <ion-slides options={this.slideOpts}>
          {this.plates?.map((plate, index) => (
            <ion-slide>
              <div class="image-container">
                <img src={plate.url} alt="plate two" />
                <span>
                  {index + 1}/{this.plates.length}
                </span>
              </div>
              <ion-row class="input-container">
                <ion-label>Enter what you see</ion-label>
                <ion-col>
                  <ion-input class="uppercase" autofocus value={plate.answer} onInput={e => this.handleChange(e, plate)}></ion-input>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <ish-button to={routes.slides.url} secondary value="Previous" disabled={index === 0} clickHandler={this.prev.bind(this)} />
                </ion-col>
                <ion-col>
                  <ish-button to={routes.slides.url} value="Next" clickHandler={this.next.bind(this)} />
                </ion-col>
              </ion-row>
            </ion-slide>
          ))}
        </ion-slides>
      </div>
    );
  }
}
