import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Ishihara Color Blindness Test</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <div class="image-container cover-image">
           <img src="/assets/images/cover-isihara.png" alt="Ishihara" />
        </div>
        <h3 class="caption">Optometry Color Deficiency Test App</h3>
        <p>The Ishihara test is a color perception test for color deficiencies, the first in a class of successful color vision tests called pseudo-isochromatic plates</p>
        <ion-button href="/page/one" expand="block">
          Get Started
        </ion-button>
      </ion-content>
    ];
  }
}
