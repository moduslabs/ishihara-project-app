import { Component, h, State } from '@stencil/core';
import routes from '../helpers/routes';
import { loadPlates } from '../helpers/utils';

@Component({
  tag: 'app-root',
})
export class AppRoot {
  @State() hasBack: boolean = false;

  async componentWillLoad() {
    await loadPlates();
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
