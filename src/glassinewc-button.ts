import { LitElement, html, css, type CSSResultGroup, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ButtonVariant, ButtonSize, GlassinewcClickDetail } from './types.js';

/**
 * A MD3 like button component.
 *
 * @element glassinewc-button
 * @slot    - Button label / content
 * @fires   glassinewc-click  - Fired on click; detail: { originalEvent }
 * @fires   glassinewc-change - Fired when a property changes; detail: { prop, oldValue, newValue }
 */
@customElement('glassinewc-button')
export class GlassinewcButton extends LitElement {
  /** Visual style variant */
  @property({ type: String, reflect: true })
  variant: ButtonVariant = 'primary';

  /** Size of the button */
  @property({ type: String, reflect: true })
  size: ButtonSize = 'md';

  /** Disables all interaction */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Callback fired on click (alternative to listening for `glassinewc-click`). */
  @property({ attribute: false })
  onClick: ((detail: GlassinewcClickDetail) => void) | null = null;

  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
      font-family: inherit;
    }

    button {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      font-family: inherit;
      font-weight: 500;
      letter-spacing: 0.025em;
      border-radius: 12px;
    }`;

  private _handleClick(e: MouseEvent): void {
    if (this.disabled) return;
    const detail: GlassinewcClickDetail = { originalEvent: e };
    this.dispatchEvent(new CustomEvent<GlassinewcClickDetail>('glassinewc-click', { detail, bubbles: true, composed: true }));
    this.onClick?.(detail);
  }

  override render(): TemplateResult {
    return html`
      <button
        part="button"
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
