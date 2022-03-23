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
  tag: 'slides-photo',
  styleUrl: 'page-five.css',
})
export class SlidesExample {
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
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref={routes.home.url} />
          </ion-buttons>
          <ion-title>Color Deficiency Test</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
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
                  <ion-button disabled={index === 0} onClick={this.prev.bind(this)} expand="block">
                    Previous
                  </ion-button>
                </ion-col>
                <ion-col>
                  <ion-button onClick={this.next.bind(this)} expand="block">
                    Next
                  </ion-button>
                </ion-col>
              </ion-row>
            </ion-slide>
          ))}
        </ion-slides>
      </ion-content>,
    ];
  }
}
