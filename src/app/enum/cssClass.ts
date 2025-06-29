export enum CssClass {
  None = 0,
  FixedHeader = 1,
  TransparentHeader = 2,
  WindowScrolled = 3,
}

export const CSS_CLASS_MAP: Record<CssClass, string> = {
  [CssClass.None]: '',
  [CssClass.FixedHeader]: 'fixed-header',
  [CssClass.TransparentHeader]: 'transparent-header',
  [CssClass.WindowScrolled]: 'window-scrolled',
};

export function formatCssClass(cssClass: CssClass): string {
  return CSS_CLASS_MAP[cssClass];
}
