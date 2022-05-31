import { Component, h } from '@stencil/core';
import routes from '../../helpers/routes';
import state from '../../store';

@Component({
  tag: 'app-landing',
  styleUrl: 'landing.css',
  scoped: true,
})
export class LandingPage {
  private router: HTMLIonRouterElement = document.querySelector('ion-router');

  navigateToSlides = () => {
    this.router.push(routes.slides.url, 'root');
  };

  render() {
    return (
      <app-layout hasBack={false}>
        <div class="ion-padding">
          <h2 data-testid="landing-page-title">Ishihara Color Blindness Test</h2>
          <div class="container">
            <img data-testid="landing-page-image" src="/assets/images/cover-isihara.png" alt="Ishihara" />
          </div>
          <h3 data-testid="landing-page-caption">Optometry Color Deficiency Test</h3>
          <p data-testid="landing-page-text">
            The Ishihara test is a color perception test for color deficiencies, the first in a class of successful color vision tests called pseudo-isochromatic plates
          </p>
          <app-button
            dataTestId="landing-page-btn"
            clickHandler={this.navigateToSlides}
            value={state.loadingPlates ? 'Please wait...' : 'Get Started'}
            expand="block"
            disabled={state.loadingPlates}
          />
        </div>
      </app-layout>
    );
  }
}
