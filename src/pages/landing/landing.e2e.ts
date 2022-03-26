import { newE2EPage } from '@stencil/core/testing';

describe('app-landing', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-landing></app-landing>');

    const element = await page.find('app-landing');
    expect(element).toHaveClass('hydrated');
  });

  it('contains a "Profile Page" button', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-landing></app-landing>');

    const element = await page.find('app-landing app-button ion-button');
    expect(element.textContent).toEqual('Profile page');
  });
});
