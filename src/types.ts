/** Shared prop-value union types used across GlassineWC components. */

export type ButtonType = 'button' | 'submit' | 'reset' | 'link' | 'checkbox' | 'radio';
export type ButtonVariant = 'filled' | 'tonal' | 'danger' | 'outlined' | 'elevated' | 'text';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonShape = 'round' | 'square';
export type IconButton = 'none' | 'default' | 'narrow' | 'wide';

/** Payload of the `glassinewc-click` custom event. */
export interface GlassinewcClickDetail {
  /** The original native MouseEvent. */
  originalEvent: MouseEvent;
}

/** Payload of the `glassinewc-change` custom event. */
export interface GlassinewcChangeDetail {
  /** The property name that changed. */
  prop: string;
  /** Previous value. */
  oldValue: unknown;
  /** New value. */
  newValue: unknown;
}
