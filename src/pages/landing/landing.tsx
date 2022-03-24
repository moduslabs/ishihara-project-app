import { Component, h } from '@stencil/core';
import routes from '../../helpers/routes';

@Component({
  tag: 'app-landing',
  styleUrl: 'landing.css',
})
export class LandingPage {
  render() {
    return (
      <div class="ion-padding">
        <h2>Ishihara Color Blindness Test</h2>
        <div class="container">
          <img src="/assets/images/cover-isihara.png" alt="Ishihara" />
        </div>
        <h3 class="caption">Optometry Color Deficiency Test App</h3>
        <p>The Ishihara test is a color perception test for color deficiencies, the first in a class of successful color vision tests called pseudo-isochromatic plates</p>
        <app-button to={routes.slides.url} value="Get Started" expand="block" />
      </div>
    );
  }
}
