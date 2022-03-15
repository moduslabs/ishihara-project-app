import { Component, h, State } from '@stencil/core';
import state from '../../store';

@Component({
  tag: 'confirmation-page',
  styleUrl: 'confirmation-page.css',
})
export class ConfirmationPage {
  @State() score = state.plates.filter((plate) => plate.key === plate.answer)

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/confirmation/page" />
          </ion-buttons>
          <ion-title>Color Deficiency Test Report</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <div class="image-container report-image">
          <img src="/assets/images/cover-isihara.png" alt="Ishihara" />
          <div class="report">
            <div class="circle">
              <span class="score">{this.score.length}/{state.plates.length}</span>
            </div>
          </div>
        </div>
      </ion-content>,
    ];
  }
}
