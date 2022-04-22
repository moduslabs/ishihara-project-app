import { Component, h } from '@stencil/core';
import { SplashScreen } from '@capacitor/splash-screen';
import routes from '../helpers/routes';
import { loadPlates } from '../helpers/utils';

@Component({
  tag: 'app-root',
})
export class AppRoot {
  async componentWillLoad() {
    await loadPlates();
    await SplashScreen.hide();
  }

  async handlePageEnter(e) {
    const { to = routes.home.url, from } = e.detail;
    if (from && to === routes.home.url) {
      await loadPlates();
    }
  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={false} onIonRouteWillChange={e => this.handlePageEnter(e)}>
          {Object.values(routes).map(({ url, component }) => (
            <ion-route url={url} component={component} />
          ))}
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
