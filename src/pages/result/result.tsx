import { Component, State, h } from '@stencil/core';
import { Share } from '@capacitor/share';
import cx from 'classnames';
import state from '../../store';
import { Screenshot } from '@ionic-native/screenshot';
import routes from '../../helpers/routes';

@Component({
  tag: 'app-result',
  styleUrl: 'result.css',
  scoped: true,
})
export class ResultPage {
  @State() canShare: boolean;
  private router: HTMLIonRouterElement = document.querySelector('ion-router');
  correctPlates = state.plates.filter(plate => plate.key === plate.answer);
  scorePercentage = ((this.correctPlates.length / state.plates.length) * 100).toFixed(0);
  result = `${this.correctPlates.length}/${state.plates.length} (${this.scorePercentage}%)`;

  async componentWillLoad() {
    this.canShare = (await Share.canShare())?.value;
  }

  navigateToHome = () => {
    this.router.push(routes.home.url, 'root');
  };

  handleShare() {
    let url = { value: '' };
    Screenshot.save('jpg', 100)
      .then(s => {
        url.value = `file://${s.filePath}`;
      })
      .catch(() => {
        url.value = '';
      })
      .finally(() => {
        const message = `Hey👋, I scored ${this.result} on my Ishihara test`;
        Share.share({
          title: message,
          text: message,
          url: url.value,
          dialogTitle: message,
        });
      });
  }

  render() {
    return (
      <app-layout>
        <div class="ion-padding">
          <h2>Final Report</h2>
          <div class="result">
            <h3>Challenge Result</h3>
            <p data-testid="percentage">
              {this.correctPlates.length}/{state.plates.length} ({this.scorePercentage}%)
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
                <ion-row data-testid={`result-row-${index}`}>
                  <ion-col size="4">
                    <ion-icon
                      class={cx('result-icon', {
                        'no-answer': !answer,
                        'flawed': key !== answer,
                        'flawless': key === answer,
                      })}
                      name={!answer ? 'remove-circle' : key === answer ? 'checkmark-circle' : 'close-circle'}
                    ></ion-icon>
                    {index + 1}
                  </ion-col>
                  <ion-col size="4" class={cx({ bold: answer })}>
                    {answer || '(no answer)'}
                  </ion-col>
                  <ion-col size="4" class="bold">
                    {key}
                  </ion-col>
                </ion-row>
              );
            })}
          </ion-grid>
          <p data-testid="result-caption" class="caption">
            These are sample results and do not constitute medical advice
          </p>
          <ion-row>
            <ion-col>
              <app-button dataTestId="share-result" clickHandler={this.handleShare.bind(this)} value="Share" expand="block" />
            </ion-col>
            <ion-col>
              <app-button dataTestId="retake-test" clickHandler={this.navigateToHome} value="Retake" expand="block" />
            </ion-col>
          </ion-row>
        </div>
      </app-layout>
    );
  }
}
