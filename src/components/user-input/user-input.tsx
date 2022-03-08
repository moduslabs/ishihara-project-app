import { Component, h, Prop } from '@stencil/core';
import { updateStateWithUserInput } from '../../helpers/utils';
import state from '../../store';

const nav = document.querySelector('ion-nav');

export type Plate = {
    key: string;
    url: string;
    answer?: null | string | number
}

@Component({
  tag: 'user-input',
  styleUrl: 'user-input.css',
})
export class UserInput {
  @Prop() next: string;
  @Prop() plate: Plate;
  @Prop() answer: HTMLIonInputElement;  


  handleFormSubmit(evt: Event) {
    evt.preventDefault();
    this.plate.answer = this.answer.value
    state.plates = updateStateWithUserInput(state.plates, this.plate)
    console.log(state.plates)
    nav.push(this.next);
  }

  render() {
    return [
      <ion-grid>
        <form onSubmit={this.handleFormSubmit.bind(this)}>
          <ion-row class="input-container">
            <ion-label>Enter what you see</ion-label>
            <ion-input ref={el => this.answer = el} ></ion-input>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button type="submit" expand="block">
                Skip
              </ion-button>
            </ion-col>
            <ion-col>
              <ion-button type="submit" expand="block">
                Next
              </ion-button>
            </ion-col>
          </ion-row>
        </form>
      </ion-grid>,
    ];
  }
}
