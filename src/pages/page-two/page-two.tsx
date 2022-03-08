import { Component, h, State } from '@stencil/core';
import state from '../../store';

@Component({
  tag: 'page-two',
  styleUrl: 'page-two.css',
})
export class PageTwo {
  @State() plateData = state.plates[1];

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/page/one" />
          </ion-buttons>
          <ion-title>Color Deficiency Test</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <div class="image-container">
          <img src={this.plateData.url} alt="plate two" />
        </div>

        <user-input next="page-three" plate={this.plateData} ></user-input>
      </ion-content>,
    ];
  }
}
