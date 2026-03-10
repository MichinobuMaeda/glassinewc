export function px2rem(px: number | undefined, defaultValue: string, base: number = 16): string {
  return px === undefined ? defaultValue : !px ? '0' : `${px / base}rem`;
}

export function lightDark(name: string) {
  return `light-dark(var(--color-light-${name}), var(--color-dark-${name}))`;
}
