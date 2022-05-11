import { LandingPage } from './landing';
import { newSpecPage } from '@stencil/core/testing';

describe('app-landing', () => {
  it('should build', () => {
    expect(new LandingPage()).toBeTruthy();
  });

  it('renders landing page with a title', async () => {
    const page = await newSpecPage({
      components: [LandingPage],
      html: '<app-landing></app-landing>',
    });
    const pageTitle = await page.root.querySelector('[data-testid="landing-page-title"]').textContent
    expect(pageTitle).toEqual('Ishihara Color Blindness Test');
  });
});
