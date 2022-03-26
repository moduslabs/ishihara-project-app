import { Component, h } from '@stencil/core';
import cx from 'classnames';
import state from '../../store';

@Component({
  tag: 'app-result',
  styleUrl: 'result.css',
  scoped: true,
})
export class ResultPage {
  render() {
    const correctPlates = state.plates.filter(plate => plate.key === plate.answer);

    const scorePercentage = ((correctPlates.length / state.plates.length) * 100).toFixed(0);
    return (
      <div class="ion-padding">
        <h2>Color Deficiency Test Report</h2>
        <div class="result">
          <h3>Test result</h3>
          <p>
            {correctPlates.length}/{state.plates.length} ({scorePercentage}%)
          </p>
        </div>

        <ion-grid class="table">
          <ion-row class="table-header">
            <ion-col size="4">Plate</ion-col>
            <ion-col size="4">Your answer</ion-col>
            <ion-col size="4">Correct</ion-col>
          </ion-row>
          {state.plates?.map(({ answer, key }, index) => {
            return (
              <ion-row>
                <ion-col size="4">{index + 1}</ion-col>
                <ion-col
                  size="4"
                  class={cx('white', {
                    'no-answer': !answer,
                    'flawed': key !== answer,
                    'flawless': key === answer,
                  })}
                >
                  {answer || '(no answer)'}
                </ion-col>
                <ion-col size="4" class="bold">
                  {key}
                </ion-col>
              </ion-row>
            );
          })}
        </ion-grid>
        <p class="caption">These are sample results and do not constitute medical advice</p>
        <div class="center">
          <app-button to="/" value="Retake" />
        </div>
      </div>
    );
  }
}
