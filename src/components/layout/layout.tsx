import { h, Component, Prop } from '@stencil/core';
import routes from '../../helpers/routes';

export type Plate = {
  key: string;
  url: string;
  answer?: null | string | number;
};

@Component({
  tag: 'app-layout',
  styleUrl: 'layout.css',
  scoped: true,
})
export class Layout {
  @Prop() hasBack: boolean = false;

  render() {
    return (
      <ion-app>
        <ion-header>
          <ion-toolbar color="primary">
            {this.hasBack && (
              <ion-buttons slot="start">
                <ion-back-button defaultHref={routes.home.url} />
              </ion-buttons>
            )}
            <ion-title>
              <img src="/assets/images/ishihara-logo.svg" alt="Ishihara" />
            </ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <slot />
        </ion-content>
        <ion-footer>
          <img src="/assets/images/modus-logo.svg" alt="Modus Create" />
        </ion-footer>
      </ion-app>
    );
  }
}
