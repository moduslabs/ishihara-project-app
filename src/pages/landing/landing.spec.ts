import { LandingPage } from './landing';
import { newSpecPage } from '@stencil/core/testing';

describe('app-landing', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [LandingPage],
      html: '<app-landing></app-landing>',
    });
    expect(root.querySelector('ion-title').textContent).toEqual('Home');
  });
});
