import { Component, h } from '@stencil/core';
import { fetchPlates } from '../../helpers/utils';
import state from '../../store';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  
  async componentWillLoad() {
    try {
      const plates = await fetchPlates();
      state.plates = plates.map(plate => ({ ...plate, answer: null }));
    } catch (error) {
      //TODO display error message to users
      console.log(error);
    }
  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-home" />
          <ion-route url="/page/confirmation" component="confirmation-page" />
          <ion-route url="/page/slides" component="slides-photo" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
