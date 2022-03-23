import { h, Component, Fragment, Prop } from '@stencil/core';
import routes from '../../helpers/routes';

export type Plate = {
  key: string;
  url: string;
  answer?: null | string | number;
};

@Component({
  tag: 'ish-layout',
  styleUrl: 'layout.css',
})
export class Layout {
  @Prop() hasBack: boolean = false;

  render() {
    return (
      <ion-app>
        <Fragment>
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
          <ion-content class="ion-padding">
            <slot />
          </ion-content>
          <ion-footer>
            <img src="/assets/images/modus-logo.svg" alt="Modus Create" />
          </ion-footer>
        </Fragment>
      </ion-app>
    );
  }
}
