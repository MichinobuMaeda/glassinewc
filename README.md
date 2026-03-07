# GlassineWC

> MD3 like **Web Components** built with [Lit](https://lit.dev) + **TypeScript**.  
> Zero framework required.

[![npm version](https://img.shields.io/npm/v/glassinewc)](https://www.npmjs.com/package/glassinewc)
[![license](https://img.shields.io/npm/l/glassinewc)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)

---

## ✨ Components

| Element               | Description                                           |
| --------------------- | ----------------------------------------------------- |
| `<glassinewc-button>` | Glass button with variants, sizes, disabled & loading |

---

## 📦 Installation

```bash
npm install glassinewc lit
```

---

## 🚀 Usage

### HTML

```html
<script type="module">
  import 'glassinewc';
</script>

<glassinewc-button variant="primary" size="lg">Hello</glassinewc-button>

<glassinewc-card title="My Card" subtitle="Subtitle" hoverable>
  <p>Card body content.</p>
  <glassinewc-button slot="footer" variant="success" size="sm">Action</glassinewc-button>
</glassinewc-card>

<glassinewc-badge variant="success" pill dot>Live</glassinewc-badge>
```

### TypeScript

```ts
import { GlassinewcButton, type ButtonVariant } from 'glassinewc';

// Full type-safety and editor autocomplete
const btn = document.querySelector<GlassinewcButton>('glassinewc-button')!;
btn.variant = 'success'; // type: ButtonVariant
btn.loading = true;
```

### Cherry-pick individual components

```ts
import 'glassinewc/glassinewc-button';
import 'glassinewc/glassinewc-card';
import 'glassinewc/glassinewc-badge';
```

---

## 🔘 glassinewc-button

```html
<glassinewc-button>Default</glassinewc-button>
<glassinewc-button variant="secondary" size="lg">Large</glassinewc-button>
<glassinewc-button variant="danger" disabled>Disabled</glassinewc-button>
<glassinewc-button loading>Saving…</glassinewc-button>
```

| Property   | Type            | Default     | Values                                           |
| ---------- | --------------- | ----------- | ------------------------------------------------ |
| `variant`  | `ButtonVariant` | `"primary"` | `primary` `secondary` `danger` `success` `ghost` |
| `size`     | `ButtonSize`    | `"md"`      | `sm` `md` `lg`                                   |
| `disabled` | `boolean`       | `false`     |  E                                               |
| `loading`  | `boolean`       | `false`     |  E                                               |

---

## 🃏 glassinewc-card

```html
<glassinewc-card title="Hello" subtitle="Subtitle" hoverable blur-amount="20" glass-opacity="0.15">
  <p>Body text goes here.</p>
  <glassinewc-button slot="footer" variant="primary" size="sm">Action</glassinewc-button>
</glassinewc-card>
```

| Property        | Type          | Default | Notes                      |
| --------------- | ------------- | ------- | -------------------------- |
| `title`         | `string`      |  E      | Card heading               |
| `subtitle`      | `string`      |  E      | Muted sub-heading          |
| `padding`       | `CardPadding` | `"md"`  | `none` `sm` `md` `lg` `xl` |
| `hoverable`     | `boolean`     | `false` | Hover lift animation       |
| `blur-amount`   | `number`      | `16`    | Backdrop blur in px        |
| `glass-opacity` | `number`      | `0.1`   | Background opacity 0 E     |
| `accent-color`  | `string`      |  E      | Top accent line CSS color  |

**Slots:** default body · `header` · `footer`

---

## 🏷�E�Eglassinewc-badge

```html
<glassinewc-badge variant="success" pill dot>Live</glassinewc-badge>
<glassinewc-badge variant="warning" outline>Beta</glassinewc-badge>
```

| Property  | Type           | Default     | Values                                                  |
| --------- | -------------- | ----------- | ------------------------------------------------------- |
| `variant` | `BadgeVariant` | `"default"` | `default` `primary` `success` `warning` `danger` `info` |
| `size`    | `BadgeSize`    | `"md"`      | `sm` `md` `lg`                                          |
| `pill`    | `boolean`      | `false`     | Fully rounded capsule                                   |
| `outline` | `boolean`      | `false`     | Transparent fill                                        |
| `dot`     | `boolean`      | `false`     | Colored dot prefix                                      |

---

## 🛠 Development

```bash
npm install
npm run dev          # Vite dev server + live preview at localhost:5173
npm run build        # Type-check then build library ↁEdist/
npm run build:lib    # Build only (skip tsc)
npm run typecheck    # Run tsc --noEmit
npm run preview      # Preview built output
```

---

## 📁 Project structure

```
glassinewc/
├── src/
━E  ├── index.ts              # Barrel export
━E  ├── types.ts              # Shared union types
━E  ├── glassinewc-button.ts
━E  ├── glassinewc-card.ts
━E  └── glassinewc-badge.ts
├── dist/                     # Built output (ES module + .d.ts)
├── index.html                # Interactive preview page
├── tsconfig.json
├── vite.config.ts
├── package.json
└── LICENSE
```

---

## 📄 License

MIT © 2026
