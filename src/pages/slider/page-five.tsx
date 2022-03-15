import { Component, Element, h, Prop, State } from '@stencil/core';
import { updateStateWithUserInput } from '../../helpers/utils';
import state from '../../store';

const nav = document.querySelector('ion-nav');

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
  @State() plateData = state.plates[1];
  @State() values = {};
  @State() currentIndex: number = 0;
  @State() isLastSlide: boolean = false;
  @Prop() plate: Plate;
  @Prop({ mutable: true }) value: string;

  private slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  setLastSlide() {
    this.isLastSlide = true;
  }

  handleChange(ev, i) {
    this.currentIndex = i;
    this.value = ev.target ? ev.target.value : null;
    this.values[i] = this.value ? this.value.toUpperCase() : null;
  }

  next() {
    const slider = this.el.querySelector('ion-slides');
    const plate: Plate = state.plates[this.currentIndex];
    plate.answer = this.values[this.currentIndex];
    state.plates = updateStateWithUserInput(state.plates, plate);
    slider.slideNext();

    if (this.isLastSlide) {
      nav.push('confirmation-page');
    }
  }

  prev() {
    this.el.querySelector('ion-slides').slidePrev();
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" />
          </ion-buttons>
          <ion-title>Color Deficiency Test</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <ion-slides options={this.slideOpts} onIonSlideReachEnd={this.setLastSlide.bind(this)}>
          {state.plates.map((plate, i) => (
            <ion-slide>
              <img class="image-container" src={plate.url} alt="plate two" />

              <ion-row class="input-container">
                <ion-label>Enter what you see</ion-label>
                <ion-col>
                  <ion-input value={this.values[i]} onInput={ev => this.handleChange(ev, i)}></ion-input>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <ion-button onClick={this.prev.bind(this)} expand="block">
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
