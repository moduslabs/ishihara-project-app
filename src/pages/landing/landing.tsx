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
          <h2 data-testid="landing-page-title">Ishihara Plates Challenge</h2>
          <div class="container">
            <img data-testid="landing-page-image" src="/assets/images/cover-isihara.png" alt="Ishihara" />
          </div>
          <h3 data-testid="landing-page-caption">Challenge</h3>
          <p data-testid="landing-page-text">
          Ishihara is an experimental app and not a substitute for medical diagnosis, advice, or treatment.
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
