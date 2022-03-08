import { Component, h, State } from '@stencil/core';
import state from '../../store';

@Component({
  tag: 'page-one',
  styleUrl: 'page-one.css',
})
export class PageOne {
   @State() plateData = state.plates[0];

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

      <ion-content class="ion-padding">
        <div class="image-container">
          <img src={this.plateData.url} alt="plate one" />
        </div>
        <user-input next="page-two" plate={this.plateData} ></user-input>
      </ion-content>,
    ];
  }
}
