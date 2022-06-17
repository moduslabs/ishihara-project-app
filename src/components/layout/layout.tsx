import { h, Component, Prop, State } from '@stencil/core';
import { Keyboard } from '@capacitor/keyboard';
import state from '../../store';

@Component({
  tag: 'app-layout',
  styleUrl: 'layout.css',
  scoped: true,
})
export class Layout {
  @Prop() hasBack: boolean = true;
  @State() shouldHide: boolean = false;

  componentDidLoad() {
    Keyboard.addListener('keyboardWillShow', () => {
      this.shouldHide = true;
    });
    
    Keyboard.addListener('keyboardDidHide', () => {
      this.shouldHide = false;
    });
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          {this.hasBack ? (
            <ion-buttons slot="start">
              <ion-back-button defaultHref={state.history[0]?.previous ?? '/'}></ion-back-button>
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
      <ion-footer class={this.shouldHide ? 'hide' : ''}>
        <img src="/assets/images/modus-logo.svg" alt="Modus Create Logo" />
      </ion-footer>,
    ];
  }
}
