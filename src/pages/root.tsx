import { Component, h, State } from '@stencil/core';
import { SplashScreen } from '@capacitor/splash-screen';
import routes from '../helpers/routes';
import { loadPlates } from '../helpers/utils';
import { Capacitor } from '@capacitor/core';

@Component({
  tag: 'app-root',
})
export class AppRoot {
  @State() hasBack: boolean = false;

  async componentWillLoad() {
    if (Capacitor.getPlatform() === 'android') {
      window.screen.orientation.lock('portrait');
    }
    await loadPlates();
    await SplashScreen.hide();
  }

  async handlePageEnter(e) {
    this.hasBack = e.detail.to === routes.slides.url;
    if (e.detail.from && e.detail.to === routes.home.url) {
      await loadPlates();
    }
  }

  render() {
    return (
      <app-layout hasBack={this.hasBack}>
        <ion-router useHash={false} onIonRouteWillChange={e => this.handlePageEnter(e)}>
          {Object.values(routes).map(({ url, component }) => (
            <ion-route url={url} component={component} />
          ))}
        </ion-router>
        <ion-nav />
      </app-layout>
    );
  }
}
