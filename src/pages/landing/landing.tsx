import { Component, h } from '@stencil/core';
import routes from '../../helpers/routes';

@Component({
  tag: 'app-landing',
  styleUrl: 'landing.css',
  scoped: true,
})
export class LandingPage {
  render() {
    return (
      <div class="ion-padding">
        <h2 id="landing-page-title">Ishihara Color Blindness Test</h2>
        <div class="container">
          <img id="landing-page-image" src="/assets/images/cover-isihara.png" alt="Ishihara" />
        </div>
        <h3 id="landing-page-caption">Optometry Color Deficiency Test</h3>
        <p id="landing-page-text">The Ishihara test is a color perception test for color deficiencies, the first in a class of successful color vision tests called pseudo-isochromatic plates</p>
        <app-button id="landing-page-btn" to={routes.slides.url} value="Get Started" expand="block" />
      </div>
    );
  }
}
