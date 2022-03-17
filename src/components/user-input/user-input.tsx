import { Component, Element, h, Prop } from '@stencil/core';
import { updateStateWithUserInput } from '../../helpers/utils';
import state from '../../store';

//const nav = document.querySelector('ion-nav');

export type Plate = {
  key: string;
  url: string;
  answer?: null | string | number;
};

@Component({
  tag: 'user-input',
  styleUrl: 'user-input.css',
})
export class UserInput {
  @Element() el: HTMLElement;
  @Prop() plate: Plate;
  @Prop() answer: HTMLIonInputElement;

  componentDidLoad() {
    console.log(this.el.querySelector('ion-slides'))
  }

  handleFormSubmit() {
    this.plate.answer = this.answer.value;
    state.plates = updateStateWithUserInput(state.plates, this.plate);
  }


  render() {
    return [
      <ion-grid>
        <form >
          <ion-row class="input-container">
            <ion-label>Enter what you see</ion-label>
            <ion-col>
              <ion-input ref={el => (this.answer = el)}></ion-input>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button  expand="block">
                Previous
              </ion-button>
            </ion-col>
            <ion-col>
              <ion-button  onClick={this.handleFormSubmit.bind(this)} expand="block">
                Next
              </ion-button>
            </ion-col>
          </ion-row>
        </form>
      </ion-grid>,
    ];
  }
}
