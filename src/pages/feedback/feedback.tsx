import { alertController } from '@ionic/core';
import { Component, h, State } from '@stencil/core';
import { FeedbackFormErrorType } from './feedback.types';

@Component({
  tag: 'app-feedback',
  styleUrl: 'feedback.css',
  scoped: true,
})
export class FeedbackPage {

  @State() selectEmail: string;
  @State() selectName: string;
  @State() selectRating: string = "3";
  @State() ratingMessage: string;
  @State() feedbackMessage: string;
  @State() formErrors: FeedbackFormErrorType =  {
    selectName: false,
    selectEmail: false,
    feedbackMessage: false,
  };


  async handleSubmit(e) {
    e.preventDefault();
    const feedbackData = {
      name: this.selectName,
      email: this.selectEmail,
      rating: this.selectRating,
      message: this.feedbackMessage
    };
    // Validate form
    if (this.formErrors.selectName || this.formErrors.selectEmail || this.formErrors.feedbackMessage) {
      const alert = await alertController.create({
        header: 'Error',
        message: 'Please check your form for errors',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    //validate form is empty
    if (this.selectName === '' || this.selectEmail === '' || this.feedbackMessage === '') {
      const alert = await alertController.create({
        header: 'Error',
        message: 'Please fill out all fields',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    // TODO: send feedback data to server
    console.log(feedbackData);

    // show an alert message from stencil
    const alert = await alertController.create({
      header: 'Thank you!',
      message: 'We have successfully received your feedback!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            let transition = alert.dismiss();
            transition.then(() => {
              // clear all data
              this.selectName = '';
              this.selectEmail = '';
              this.selectRating = '';
              this.ratingMessage = '';
              this.feedbackMessage = '';
            });
          },
        },
      ],
    });

    await alert.present(); 
    
  }

  handleName(event) {
    this.selectName = event.target.value;
    // validate name
    if (event.target.validity.patternMismatch === true || event.target.value === '') {
      event.target.setCustomValidity('Please enter a valid name');
      this.formErrors.selectName = true;
    } else {
      event.target.setCustomValidity('');
      this.formErrors.selectName = false;
    }
  }

  handleEmail(event) {
    this.selectEmail = event.target.value;
    // Validate email
    if (event.target.validity.typeMismatch === true || event.target.value === '') {
      event.target.setCustomValidity('Please enter a valid email');
      this.formErrors.selectEmail = true;
    } else {
      event.target.setCustomValidity('');
      this.formErrors.selectEmail = false;
    }
  }

  handleRating(event) {
    this.selectRating = event.target.innerText;
    this.ratingMessage = event.target.attributes.title.value;
  }
  

  handleMessage(event) {
    this.feedbackMessage = event.target.value;
    // validate message
    if (event.target.validity.patternMismatch === true || event.target.value === '') {
      event.target.setCustomValidity('Please enter a valid message');
      this.formErrors.feedbackMessage = true;
    } else {
      event.target.setCustomValidity('');
      this.formErrors.feedbackMessage = false;
    }
  }

  render() {
    return (
      <app-layout hasBack={false}>
        <div class="ion-padding">
          <h2 data-testid="landing-page-title">Ishihara Feedback form</h2>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <ion-row>
              <ion-col>
                <ion-label>Name</ion-label>
                <ion-input class={this.formErrors.selectName?'error':''} type="text" name='name' value={this.selectName} onInput={(e) => this.handleName(e)}></ion-input>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-label>Email</ion-label>
                <ion-input class={this.formErrors.selectEmail?'error':''} type="email" name='email' value={this.selectEmail} onInput={(e) => this.handleEmail(e)} ></ion-input>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="rating-column">
                <ul class="rate-area">
                  <input type="radio" id="5-star" name="rating" value="5" checked={this.selectRating== "5"} /><ion-label onClick={(event) => this.handleRating(event)}  title="Amazing">5</ion-label>
                  <input type="radio" id="4-star" name="rating" value="4" checked={this.selectRating== "4"} /><ion-label onClick={(event) => this.handleRating(event)} title="Good">4</ion-label>
                  <input type="radio" id="3-star" name="rating" value="3" checked={this.selectRating== "3"} /><ion-label onClick={(event) => this.handleRating(event)} title="Average">3</ion-label>
                  <input type="radio" id="2-star" name="rating" value="2" checked={this.selectRating== "2"} /><ion-label onClick={(event) => this.handleRating(event)} title="Not Good">2</ion-label>
                  <input type="radio" id="1-star" name="rating" value="1" checked={this.selectRating== "1"} /><ion-label onClick={(event) => this.handleRating(event)} title="Bad">1</ion-label>
                </ul>
              </ion-col>
            </ion-row>
          <ion-row>
          <ion-col class="rating-message" no-padding>
          <ion-text color="medium"><sub>{this.ratingMessage}</sub></ion-text>
          </ion-col>
          </ion-row>
            <ion-row>
              <ion-col>
                <ion-label>Message</ion-label>
                <ion-textarea class={this.formErrors.feedbackMessage?'error':''} name='feedback' value={this.feedbackMessage} onInput={(e)=> this.handleMessage(e)}></ion-textarea>
              </ion-col>
            </ion-row>
          <ion-row class="feedback-btn">
            <ion-button class="feedback-btn" type='submit' shape='round'  expand="block"> Submit</ion-button>
          </ion-row>
          </form>
        </div>
      </app-layout>
    );
  }
}
