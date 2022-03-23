import { Component, h } from '@stencil/core';
import routes from '../../helpers/routes';
import { loadPlates } from '../../helpers/utils';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  async componentWillLoad() {
    try {
      await loadPlates();
    } catch (error) {
      //TODO display error message to users
      console.log(error);
    }
  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          {Object.values(routes).map(({ url, component }) => (
            <ion-route url={url} component={component} />
          ))}
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
