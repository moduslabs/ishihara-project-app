import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-feedback',
  styleUrl: 'feedback.css',
  scoped: true,
})
export class FeedbackPage {

  render() {
    return (
      <app-layout hasBack={false}>
        <div class="ion-padding">
          <h2 data-testid="landing-page-title">Ishihara Feedback form</h2>
          <form>
            <ion-row>
              <ion-col>
                <ion-label>Name</ion-label>
                <ion-input type="text"></ion-input>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-label>Email</ion-label>
                <ion-input type="email"></ion-input>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-label>Rating</ion-label>
                <ion-select>
                  <ion-select-option value="1">1</ion-select-option>
                  <ion-select-option value="2">2</ion-select-option>
                  <ion-select-option value="3">3</ion-select-option>
                  <ion-select-option value="4">4</ion-select-option>
                  <ion-select-option value="5">5</ion-select-option>
                </ion-select>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-label>Message</ion-label>
                <ion-textarea></ion-textarea>
              </ion-col>
            </ion-row>
          </form>

          <ion-row class="feedback-btn">
            <app-button dataTestId="feedback-btn" clickHandler={() => {}} value="Submit" expand="block" />
          </ion-row>
        </div>
      </app-layout>
    );
  }
}
