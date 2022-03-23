import { Component, h } from '@stencil/core';
import routes from '../../helpers/routes';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  render() {
    return (
      <div>
        <h2 class="heading">Ishihara Color Blindness Test</h2>
        <div class="image-container cover-image">
          <img src="/assets/images/cover-isihara.png" alt="Ishihara" />
        </div>
        <h3 class="caption">Optometry Color Deficiency Test App</h3>
        <p>The Ishihara test is a color perception test for color deficiencies, the first in a class of successful color vision tests called pseudo-isochromatic plates</p>
        <ish-button value="Get Started" to={routes.slides.url} />
      </div>
    );
  }
}
