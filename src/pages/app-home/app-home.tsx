import { Component, h } from '@stencil/core';
import routes from '../../helpers/routes';
import { loadPlates } from '../../helpers/utils';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  private router: HTMLIonRouterElement = document.querySelector('ion-router');

  async handlePageEnter(e) {
    if (e.detail.from && e.detail.to === routes.home.url) {
      try {
        await loadPlates();
      } catch (error) {
        //TODO display error message to users
        console.log(error);
      }
    }
  }
  componentDidLoad() {
    this.router.addEventListener('ionRouteDidChange', this.handlePageEnter);
  }

  disconnectedCallback() {
    this.router.removeEventListener('ionRouteDidChange', this.handlePageEnter);
  }

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
        <ion-button href={routes.slides.url} expand="block">
          Get Started
        </ion-button>
      </ion-content>,
    ];
  }
}
