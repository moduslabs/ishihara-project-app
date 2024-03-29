/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppButton {
        "clickHandler": (e: MouseEvent) => void;
        "dataTestId"?: string;
        "disabled"?: boolean;
        "expand"?: 'block' | 'full';
        "secondary"?: boolean;
        "size"?: 'large' | 'small' | 'default';
        "to"?: string;
        "value": string | number;
    }
    interface AppFeedback {
    }
    interface AppLanding {
    }
    interface AppLayout {
        "hasBack": boolean;
        "shouldHideFooter": boolean;
    }
    interface AppResult {
    }
    interface AppRoot {
    }
    interface AppSlider {
    }
}
export interface AppLayoutCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLAppLayoutElement;
}
export interface AppSliderCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLAppSliderElement;
}
declare global {
    interface HTMLAppButtonElement extends Components.AppButton, HTMLStencilElement {
    }
    var HTMLAppButtonElement: {
        prototype: HTMLAppButtonElement;
        new (): HTMLAppButtonElement;
    };
    interface HTMLAppFeedbackElement extends Components.AppFeedback, HTMLStencilElement {
    }
    var HTMLAppFeedbackElement: {
        prototype: HTMLAppFeedbackElement;
        new (): HTMLAppFeedbackElement;
    };
    interface HTMLAppLandingElement extends Components.AppLanding, HTMLStencilElement {
    }
    var HTMLAppLandingElement: {
        prototype: HTMLAppLandingElement;
        new (): HTMLAppLandingElement;
    };
    interface HTMLAppLayoutElement extends Components.AppLayout, HTMLStencilElement {
    }
    var HTMLAppLayoutElement: {
        prototype: HTMLAppLayoutElement;
        new (): HTMLAppLayoutElement;
    };
    interface HTMLAppResultElement extends Components.AppResult, HTMLStencilElement {
    }
    var HTMLAppResultElement: {
        prototype: HTMLAppResultElement;
        new (): HTMLAppResultElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLAppSliderElement extends Components.AppSlider, HTMLStencilElement {
    }
    var HTMLAppSliderElement: {
        prototype: HTMLAppSliderElement;
        new (): HTMLAppSliderElement;
    };
    interface HTMLElementTagNameMap {
        "app-button": HTMLAppButtonElement;
        "app-feedback": HTMLAppFeedbackElement;
        "app-landing": HTMLAppLandingElement;
        "app-layout": HTMLAppLayoutElement;
        "app-result": HTMLAppResultElement;
        "app-root": HTMLAppRootElement;
        "app-slider": HTMLAppSliderElement;
    }
}
declare namespace LocalJSX {
    interface AppButton {
        "clickHandler"?: (e: MouseEvent) => void;
        "dataTestId"?: string;
        "disabled"?: boolean;
        "expand"?: 'block' | 'full';
        "secondary"?: boolean;
        "size"?: 'large' | 'small' | 'default';
        "to"?: string;
        "value"?: string | number;
    }
    interface AppFeedback {
    }
    interface AppLanding {
    }
    interface AppLayout {
        "hasBack"?: boolean;
        "onNavBackAction"?: (event: AppLayoutCustomEvent<any>) => void;
        "shouldHideFooter"?: boolean;
    }
    interface AppResult {
    }
    interface AppRoot {
    }
    interface AppSlider {
        "onCurrentSlideIndex"?: (event: AppSliderCustomEvent<number>) => void;
    }
    interface IntrinsicElements {
        "app-button": AppButton;
        "app-feedback": AppFeedback;
        "app-landing": AppLanding;
        "app-layout": AppLayout;
        "app-result": AppResult;
        "app-root": AppRoot;
        "app-slider": AppSlider;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-button": LocalJSX.AppButton & JSXBase.HTMLAttributes<HTMLAppButtonElement>;
            "app-feedback": LocalJSX.AppFeedback & JSXBase.HTMLAttributes<HTMLAppFeedbackElement>;
            "app-landing": LocalJSX.AppLanding & JSXBase.HTMLAttributes<HTMLAppLandingElement>;
            "app-layout": LocalJSX.AppLayout & JSXBase.HTMLAttributes<HTMLAppLayoutElement>;
            "app-result": LocalJSX.AppResult & JSXBase.HTMLAttributes<HTMLAppResultElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "app-slider": LocalJSX.AppSlider & JSXBase.HTMLAttributes<HTMLAppSliderElement>;
        }
    }
}
