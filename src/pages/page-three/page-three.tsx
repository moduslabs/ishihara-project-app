import { Component, h, State } from '@stencil/core';
import state from '../../store';

@Component({
  tag: 'page-three',
  styleUrl: 'page-three.css',
})
export class PageThree {
@State() plateData = state.plates[2];

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/page/two" />
          </ion-buttons>
          <ion-title>Color Deficiency Test</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <div class="image-container">
          <img src={this.plateData.url} alt="plate three" />
        </div>
        <user-input next="page-four" plate={this.plateData} ></user-input>
      </ion-content>,
    ];
  }
}
