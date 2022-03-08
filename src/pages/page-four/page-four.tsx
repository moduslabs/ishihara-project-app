import { Component, h, State } from '@stencil/core';
import state from '../../store';

@Component({
  tag: 'page-four',
  styleUrl: 'page-four.css',
})
export class PageFour {
  @State() plateData = state.plates[3];

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/page/three" />
          </ion-buttons>
          <ion-title>Color Deficiency Test</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
       <div class="image-container">
          <img src={this.plateData.url} alt="plate four" />
        </div>
        <user-input next="page-five" plate={this.plateData} ></user-input>
      </ion-content>,
    ];
  }
}
