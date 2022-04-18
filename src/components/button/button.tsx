import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-button',
  styleUrl: 'button.css',
  shadow: true,
})
export class Button {
  @Prop() id?: string;
  @Prop() to?: string;
  @Prop() value: string | number;
  @Prop() expand?: 'block' | 'full';
  @Prop() disabled?: boolean;
  @Prop() secondary?: boolean = false;
  @Prop() clickHandler: (e: MouseEvent) => void;
  props: any = {
    ...(this.secondary ? { fill: 'outline' } : { fill: 'solid' }),
    ...(this.to ? { href: this.to } : {}),
  };

  render() {
    return (
      <ion-button shape="round" expand={this.expand} disabled={this.disabled} onClick={this.clickHandler} {...this.props}>
        {this.value}
      </ion-button>
    );
  }
}
