/** Shared prop-value union types used across GlassineWC components. */

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

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
