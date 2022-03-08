import { Component, h, State } from '@stencil/core';
import state from '../../store';

@Component({
  tag: 'page-five',
  styleUrl: 'page-five.css',
})
export class PageFive {
  @State() plateData = state.plates[4];

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/page/four" />
          </ion-buttons>
          <ion-title>Color Deficiency Test</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
       <div class="image-container">
          <img src={this.plateData.url} alt="plate five" />
        </div>
        <user-input next="confirmation-page" plate={this.plateData} ></user-input>
      </ion-content>,
    ];
  }
}
