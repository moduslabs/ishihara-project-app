import { Component, h } from '@stencil/core';
import { fetchPlates } from '../../helpers/utils';
import state from '../../store'

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {

  async componentWillLoad() {
    const plates = await fetchPlates();
    state.plates = plates.map((plate) => ({...plate, answer: null}))
  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-home" />
          <ion-route url="/page/one" component="page-one" />
          <ion-route url="/page/two" component="page-two" />
          <ion-route url="/page/three" component="page-three" />
          <ion-route url="/page/four" component="page-four" />
          <ion-route url="/page/five" component="page-five" />
          <ion-route url="/page/confirmation" component="confirmation-page" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
