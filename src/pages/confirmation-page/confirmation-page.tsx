import { Component, h, State } from '@stencil/core';
import cx from 'classnames';
import state from '../../store';

@Component({
  tag: 'confirmation-page',
  styleUrl: 'confirmation-page.css',
})
export class ConfirmationPage {
  @State() correctPlates = state.plates.filter(plate => plate.key === plate.answer);

  render() {
    const scorePercentage = ((this.correctPlates.length / state.plates.length) * 100).toFixed(0);
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Color Deficiency Test Report</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <div class="result">
          <h2>Test result</h2>
          <p>
            {this.correctPlates.length}/{state.plates.length} ({scorePercentage}%)
          </p>
          <ion-button href="/">Retake</ion-button>
        </div>

        <ion-grid class="result-table">
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
