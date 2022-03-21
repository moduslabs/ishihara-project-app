import { Component, h, State } from '@stencil/core';
import cx from 'classnames';
import state from '../../store';

@Component({
  tag: 'confirmation-page',
  styleUrl: 'confirmation-page.css',
})
export class ConfirmationPage {
  @State() score = state.plates.filter(plate => plate.key === plate.answer);

  render() {
    console.log('Scores', this.score);
    console.log('Plates', state.plates);
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
              <span class="score">
                {this.score.length}/{state.plates.length}
              </span>
            </div>
          </div>
        </div>
        <ion-grid>
          <ion-row class="header-row">
            <ion-col size="4">Plate</ion-col>
            <ion-col size="4">Your Answer</ion-col>
            <ion-col size="4">Correct</ion-col>
          </ion-row>
          {state.plates?.map(({ answer, key }, index) => {
            return (
              <ion-row>
                <ion-col size="4">{index + 1}</ion-col>
                <ion-col
                  size="4"
                  class={cx({
                    'no-answer': !answer,
                    'flawed': key !== answer,
                    'flawless': key === answer,
                  })}
                >
                  {answer || '(no answer)'}
                </ion-col>
                <ion-col size="4">{key}</ion-col>
              </ion-row>
            );
          })}
        </ion-grid>
      </ion-content>,
    ];
  }
}
