import { h, Component, Prop, Event, EventEmitter, State, Listen } from '@stencil/core';

@Component({
  tag: 'app-layout',
  styleUrl: 'layout.css',
  scoped: true,
})
export class Layout {
  @Prop() hasBack: boolean = true;
  @Prop() shouldHideFooter: boolean = false;
  @State() slideIndex: number;
  @Event() navBackAction: EventEmitter;
  private router: HTMLIonRouterElement = document.querySelector('ion-router');


  /**
   * Update the slideIndex property with the value obtained from event emmitted
   */
  @Listen('currentSlideIndex', {target: 'document'})
   updateSlideIndex(event: CustomEvent<number>) {
    this.slideIndex = event.detail;
  }

  /**
   * handle the tap of the toolbar's back button
   */
  backButtonAction = () => {
    if(this.slideIndex && this.slideIndex > 0) {
      this.navBackAction.emit();
    } else {
      this.router.push('/', 'back');
    }
  }


  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          {this.hasBack ? (
            <ion-buttons slot="start" onClick={this.backButtonAction}>
              <ion-button>
                <ion-icon name="arrow-back-outline" slot="icon-only"></ion-icon>
              </ion-button>
            </ion-buttons>
          ) : null}
          <ion-title>
            <div class="ishihara-logo">
              <img src="/assets/images/ishihara-logo.svg" alt="Ishihara" />
            </div>
          </ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <slot />
      </ion-content>,
      <ion-footer class={this.shouldHideFooter ? 'hide' : ''}>
        <img src="/assets/images/modus-logo.svg" alt="Modus Create Logo" />
      </ion-footer>,
    ];
  }
}
