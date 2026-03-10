import { LitElement, html, css, type CSSResultGroup, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ButtonType, ButtonVariant, ButtonSize, ButtonShape, IconButton } from './types.js';
import { px2rem, lightDark } from './utils.js';

const height: Record<ButtonSize, number> = { xs: 32, sm: 40, md: 56, lg: 96, xl: 136 };

const width: Record<IconButton, Record<ButtonSize, number | undefined>> = {
  none: { xs: undefined, sm: undefined, md: undefined, lg: undefined, xl: undefined },
  default: height,
  narrow: { xs: 28, sm: 32, md: 48, lg: 64, xl: 104 },
  wide: { xs: 40, sm: 52, md: 72, lg: 128, xl: 184 },
};

const targetMinHeight: Record<IconButton, number> = {
  none: 40,
  default: 48,
  narrow: 48,
  wide: 48,
};

const targetMinWidth: Record<IconButton, number> = {
  none: 0,
  default: 48,
  narrow: 48,
  wide: 48,
};

const targetOffsetY = (iconButton: IconButton, size: ButtonSize) =>
  Math.min(0, (height[size] - targetMinHeight[iconButton]) / 2);

const targetOffsetX = (iconButton: IconButton, size: ButtonSize) =>
  width[iconButton][size]
    ? Math.min(0, (width[iconButton][size]! - targetMinWidth[iconButton]) / 2)
    : 0;

const paddingX: Record<IconButton, Record<ButtonSize, number>> = {
  none: { xs: 12, sm: 16, md: 24, lg: 48, xl: 64 },
  default: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 },
  narrow: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 },
  wide: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 },
};

const gap: Record<ButtonSize, number> = { xs: 4, sm: 8, md: 8, lg: 12, xl: 16 };

const buttonRadius: Record<ButtonShape, Record<IconButton, Record<ButtonSize, number>>> = {
  round: {
    none: { xs: 16, sm: 20, md: 28, lg: 48, xl: 68 },
    default: { xs: 16, sm: 20, md: 28, lg: 48, xl: 68 },
    narrow: { xs: 14, sm: 16, md: 24, lg: 32, xl: 52 },
    wide: { xs: 16, sm: 20, md: 28, lg: 48, xl: 68 },
  },
  square: {
    none: { xs: 12, sm: 12, md: 16, lg: 28, xl: 28 },
    default: { xs: 12, sm: 12, md: 16, lg: 28, xl: 28 },
    narrow: { xs: 12, sm: 12, md: 16, lg: 28, xl: 28 },
    wide: { xs: 12, sm: 12, md: 16, lg: 28, xl: 28 },
  },
};

const radiusPressed: Record<ButtonSize, number> = { xs: 8, sm: 8, md: 12, lg: 16, xl: 16 };

const iconSize: Record<ButtonSize, number> = { xs: 20, sm: 20, md: 24, lg: 32, xl: 40 };

const toggleColor: Record<'selected' | 'unselected', Record<ButtonVariant, string>> = {
  unselected: {
    filled: lightDark('on-surface-variant'),
    tonal: lightDark('on-secondary-container'),
    danger: lightDark('on-error-container'),
    outlined: lightDark('on-surface-variant'),
    elevated: lightDark('primary'),
    text: lightDark('primary'),
  },
  selected: {
    filled: lightDark('on-primary'),
    tonal: lightDark('on-secondary'),
    danger: lightDark('on-error'),
    outlined: lightDark('inverse-on-surface'),
    elevated: lightDark('on-primary'),
    // Unsupported in MD3, but we use the same color for simplicity
    text: lightDark('primary'),
  },
};

const toggleBGColor: Record<'selected' | 'unselected', Record<ButtonVariant, string>> = {
  unselected: {
    filled: lightDark('surface-container'),
    tonal: lightDark('secondary-container'),
    danger: lightDark('error-container'),
    outlined: 'inherit',
    elevated: lightDark('surface-container-low'),
    text: 'inherit',
  },
  selected: {
    filled: lightDark('primary'),
    tonal: lightDark('secondary'),
    danger: lightDark('error'),
    outlined: lightDark('inverse-surface'),
    elevated: lightDark('primary'),
    // Unsupported in MD3, but we use the same color for simplicity
    text: 'inherit',
  },
};

const toggleActionColor: Record<'selected' | 'unselected', Record<ButtonVariant, string>> = {
  unselected: {
    filled: lightDark('on-surface-container'),
    tonal: lightDark('on-secondary-container'),
    danger: lightDark('on-error-container'),
    outlined: lightDark('on-surface-variant'),
    elevated: lightDark('primary'),
    text: lightDark('primary'),
  },
  selected: {
    filled: lightDark('on-primary'),
    tonal: lightDark('on-secondary'),
    danger: lightDark('on-error'),
    outlined: lightDark('inverse-on-surface'),
    elevated: lightDark('on-primary'),
    // Unsupported in MD3, but we use the same color for simplicity
    text: lightDark('primary'),
  },
};

const buttonColor: Record<ButtonVariant, string> = {
  filled: toggleColor.selected.filled,
  tonal: toggleColor.unselected.tonal,
  danger: toggleColor.selected.danger,
  outlined: toggleColor.unselected.outlined,
  elevated: toggleColor.unselected.elevated,
  text: toggleColor.unselected.text,
};

const buttonBGColor: Record<ButtonVariant, string> = {
  filled: toggleBGColor.selected.filled,
  tonal: toggleBGColor.unselected.tonal,
  danger: toggleBGColor.selected.danger,
  outlined: toggleBGColor.unselected.outlined,
  elevated: toggleBGColor.unselected.elevated,
  text: toggleBGColor.unselected.text,
};

const actionColor: Record<ButtonVariant, string> = {
  filled: toggleActionColor.selected.filled,
  tonal: toggleActionColor.unselected.tonal,
  danger: toggleActionColor.selected.danger,
  outlined: toggleActionColor.unselected.outlined,
  elevated: toggleActionColor.unselected.elevated,
  text: toggleActionColor.unselected.text,
};

const outline: Record<ButtonVariant, string> = {
  filled: 'none',
  tonal: 'none',
  danger: 'none',
  outlined: `${px2rem(1, '0')} solid ${lightDark('outline-variant')}`,
  elevated: 'none',
  text: 'none',
};

const shadow: Record<ButtonVariant, string> = {
  filled: 'none',
  tonal: 'none',
  danger: 'none',
  outlined: 'none',
  elevated: `${px2rem(0.5, '0')} ${px2rem(1, '0')} ${px2rem(1, '0')} ${px2rem(0.5, '0')} light-dark(hwb(from var(--color-light-shadow) h w b / 0.3), hwb(from var(--color-dark-shadow) h w b / 0.3))`,
  text: 'none',
};

const disabledColor: string =
  'light-dark(hwb(from var(--color-light-on-surface) h w b / 0.3), hwb(from var(--color-dark-on-surface) h w b / 0.1))';
const disabledBGColor: string =
  'light-dark(hwb(from var(--color-light-on-surface) h w b / 0.3), hwb(from var(--color-dark-on-surface) h w b / 0.38))';

/**
 * A MD3 like button component.
 *
 * @element glassinewc-button
 *
 * @attr {ButtonType}      type        - Button type: 'button'(default) | 'submit' | 'reset' | 'checkbox' | 'radio' | 'link'
 * @attr {string}          name        - Name attribute forwarded to the native input/button/anchor
 * @attr {string}          value       - Value attribute forwarded to the native input/button
 * @attr {boolean}         checked     - Checked state for checkbox/radio type
 * @attr {string}          href        - URL for link type
 * @attr {string}          target      - Target for link type (e.g. '_blank')
 * @attr {string}          mime-type   - MIME type forwarded to link type
 * @attr {ButtonVariant}   variant     - Visual style: 'filled'(default) | 'tonal' | 'danger' | 'outlined' | 'elevated' | 'text'
 * @attr {ButtonSize}      size        - Size: 'xs' | 'sm'(default) | 'md' | 'lg' | 'xl'
 * @attr {ButtonShape}     shape       - Shape: 'round'(default) | 'square'
 * @attr {IconButton}      icon-button - Icon button width mode: 'none'(default) | 'default' | 'narrow' | 'wide'
 * @attr {boolean}         disabled    - Disables the button
 *
 * @slot - Button label / content
 *
 * @prop {(event: MouseEvent) => void | null} onClick  - Native-like click handler; receives the raw MouseEvent
 * @prop {(event: Event) => void | null}      onChange - Native-like change handler; receives the raw change Event from the inner input
 */
@customElement('glassinewc-button')
export class GlassinewcButton extends LitElement {
  @property({ type: String, reflect: true })
  type: ButtonType = 'button';

  @property({ type: String, reflect: true })
  name: string | undefined;

  @property({ type: String, reflect: true })
  value: string | undefined;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: String, reflect: true })
  href: string | undefined;

  @property({ type: String, reflect: true })
  target: string | undefined;

  @property({ type: String, reflect: true, attribute: 'mime-type' })
  mimeType: string | undefined;

  @property({ type: String, reflect: true })
  variant: ButtonVariant = 'filled';

  @property({ type: String, reflect: true })
  size: ButtonSize = 'sm';

  @property({ type: String, reflect: true })
  shape: ButtonShape = 'round';

  @property({ type: String, reflect: true, attribute: 'icon-button' })
  iconButton: IconButton = 'none';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ attribute: false })
  onClick: ((event: MouseEvent) => void) | undefined;

  @property({ attribute: false })
  onChange: ((event: Event) => void) | undefined;

  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
      font-family: var(--glassinewc-font-family);
      font-weight: normal;
    }

    button,
    a,
    div {
      background-color: var(--_bg-color);
      color: var(--_color);
    }

    label {
      background-color: var(--_bg-color-unselected);
      color: var(--_color-unselected);

      input {
        appearance: none;
        width: 0;
        height: 0;
        opacity: 0;
        position: absolute;
        pointer-events: none;

        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        &::-moz-focus-inner {
          border: 0;
          padding: 0;
        }
      }

      &:has(input:checked) {
        background-color: var(--_bg-color-selected);
        color: var(--_color-selected);
        border-radius: var(--_border-radius-selected);
      }
    }

    button,
    a,
    div,
    label {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: var(--_height);
      width: var(--_width);
      padding: 0 var(--_padding);
      gap: var(--_gap);
      border-radius: var(--_border-radius);
      border: none;
      outline: var(--_outline);
      box-shadow: var(--_shadow);
      font-family: var(--glassinewc-font-family);
      font-weight: normal;
      font-size: calc(var(--_icon-size) * 0.8);
      text-decoration: none;
      user-select: none;
      cursor: pointer;

      &::before {
        content: '';
        position: absolute;
        pointer-events: auto;
        cursor: pointer;
        inset: var(--_target-offset-y) var(--_target-offset-x);
      }

      &::after {
        content: '';
        position: absolute;
        inset: 0 0;
        border-radius: inherit;
        pointer-events: none;
        display: var(--_action);
      }

      &:hover::after {
        background-color: var(--_action-color);
        opacity: 0.08;
      }

      &:focus::after,
      &:active::after {
        background-color: var(--_action-color);
        opacity: 0.1;
      }

      &:active {
        border-radius: var(--_border-radius-pressed);
      }

      &:focus,
      &:has(input:enabled:focus) {
        outline: solid 0.125rem
          light-dark(var(--color-light-secondary), var(--color-dark-secondary));
        outline-offset: 0.0625rem;
      }
    }

    ::slotted(img),
    ::slotted(svg) {
      width: var(--_icon-size);
      min-width: var(--_icon-size);
      max-width: var(--_icon-size);
      height: var(--_icon-size);
      min-height: var(--_icon-size);
      max-height: var(--_icon-size);
      display: block;
      flex-shrink: 0;
    }
  `;

  override willUpdate(changed: Map<PropertyKey, unknown>): void {
    if (changed.has('size')) {
      this.style.setProperty('--_height', px2rem(height[this.size], 'auto'));
      this.style.setProperty('--_gap', px2rem(gap[this.size], '0'));
      this.style.setProperty('--_icon-size', px2rem(iconSize[this.size], '0'));
    }
    if (changed.has('size') || changed.has('iconButtonWidth')) {
      this.style.setProperty('--_width', px2rem(width[this.iconButton][this.size], 'auto'));
      this.style.setProperty('--_padding', px2rem(paddingX[this.iconButton][this.size], '0'));
      this.style.setProperty(
        '--_target-offset-x',
        px2rem(targetOffsetX(this.iconButton, this.size), '0'),
      );
      this.style.setProperty(
        '--_target-offset-y',
        px2rem(targetOffsetY(this.iconButton, this.size), '0'),
      );
    }
    if (changed.has('size') || changed.has('shape') || changed.has('iconButtonWidth')) {
      this.style.setProperty(
        '--_border-radius',
        px2rem(buttonRadius[this.shape][this.iconButton][this.size], '0'),
      );
      this.style.setProperty(
        '--_border-radius-selected',
        px2rem(buttonRadius['square'][this.iconButton][this.size], '0'),
      );
    }
    if (
      changed.has('size') ||
      changed.has('shape') ||
      changed.has('iconButtonWidth') ||
      changed.has('disabled')
    ) {
      this.style.setProperty(
        '--_border-radius-pressed',
        this.disabled
          ? px2rem(buttonRadius[this.shape][this.iconButton][this.size], '0')
          : px2rem(radiusPressed[this.size], '0'),
      );
    }
    if (changed.has('disabled') || changed.has('variant')) {
      if (this.disabled) {
        this.style.setProperty('--_action', this.disabled ? 'none' : 'inherit');
        this.style.setProperty('--_color', disabledColor);
        this.style.setProperty('--_bg-color', disabledBGColor);
        this.style.setProperty('--_color-unselected', disabledColor);
        this.style.setProperty('--_color-selected', disabledColor);
        this.style.setProperty('--_bg-color-unselected', disabledBGColor);
        this.style.setProperty('--_bg-color-selected', disabledBGColor);
      } else {
        if (changed.has('variant')) {
          this.style.setProperty('--_color', buttonColor[this.variant]);
          this.style.setProperty('--_bg-color', buttonBGColor[this.variant]);
          this.style.setProperty('--_color-unselected', toggleColor['unselected'][this.variant]);
          this.style.setProperty('--_color-selected', toggleColor['selected'][this.variant]);
          this.style.setProperty(
            '--_bg-color-unselected',
            toggleBGColor['unselected'][this.variant],
          );
          this.style.setProperty('--_bg-color-selected', toggleBGColor['selected'][this.variant]);
          this.style.setProperty('--_outline', outline[this.variant]);
          this.style.setProperty('--_shadow', shadow[this.variant]);
          this.style.setProperty('--_action-color', actionColor[this.variant]);
        }
      }
    }
  }

  private _handleClick(e: MouseEvent): void {
    if (this.disabled) return;
    this.onClick?.(e);
  }

  private _handleChange(e: Event): void {
    this.onChange?.(e);
  }

  override render(): TemplateResult {
    return ['checkbox', 'radio'].includes(this.type)
      ? html`
          <label>
            <input
              type="${this.type}"
              name="${this.name}"
              value="${this.value}"
              ?disabled=${this.disabled}
              ?checked=${this.checked}
              @change=${this._handleChange}
            />
            <slot></slot>
          </label>
        `
      : 'link' === this.type
        ? this.disabled
          ? html`
              <div>
                <slot></slot>
              </div>
            `
          : html`
              <a
                href="${this.href}"
                target="${this.target}"
                type="${this.mimeType}"
                @click=${this._handleClick}
              >
                <slot></slot>
              </a>
            `
        : html`
            <button
              type="${this.type}"
              name="${this.name}"
              value="${this.value}"
              ?disabled=${this.disabled}
              @click=${this._handleClick}
            >
              <slot></slot>
            </button>
          `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'glassinewc-button': GlassinewcButton;
  }
}
