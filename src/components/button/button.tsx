import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-button',
  styleUrl: 'button.css',
})
export class Button {
  @Prop() to?: string;
  @Prop() value: string | number;
  @Prop() disabled?: boolean;
  @Prop() secondary?: boolean = false;
  @Prop() clickHandler: (e: MouseEvent) => void;
  props: any = this.secondary ? { fill: 'outline' } : { fill: 'solid' };

  render() {
    return (
      <ion-button shape="round" expand="block" disabled={this.disabled} href={this.to} onClick={this.clickHandler} {...this.props}>
        {this.value}
      </ion-button>
    );
  }
}
