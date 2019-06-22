import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import * as Color from 'color'
import { Storage } from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private theme: string

  constructor(
    private storage: Storage,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.storage.get('currentTheme').then(theme => {
      this.setGlobalCSS(theme)
    })
  }

  setTheme(theme) {
    const cssText = CSSTextGenerator(theme)
    this.setGlobalCSS(cssText)
    this.storage.set('currentTheme', cssText)
  }

  setVariable(name, value) {
    this.document.documentElement.style.setProperty(name, value)
  }

  private setGlobalCSS(css: string) {
    this.document.documentElement.style.cssText = css
  }
}

function contrast(color, ratio = 0.8) {
  color = Color(color)
  return color.isDark ? color.lighten(ratio) : color.darken(ratio)
}

function CSSTextGenerator(colors) {
  colors = { ...defaults, ...colors }

  const {
    primary,
    secondary,
    tertiary,
    success,
    warning,
    danger,
    dark,
    medium,
    light
  } = colors

  const shadeRatio = 0.1
  const tintRatio = 0.1

  return `
    --ion-color-base: ${light};
    --ion-color-contrast: ${dark};

    --ion-color-primary: ${primary};
    --ion-color-primary-rgb: 56,128,255;
    --ion-color-primary-contrast: ${contrast(primary)};
    --ion-color-primary-contrast-rgb: 255,255,255;
    --ion-color-primary-shade:  ${Color(primary).darken(shadeRatio)};
  `
}

const defaults = {
  primary: '#3880ff',
  secondary: '#0cd1e8',
  tertiary: '#7044ff',
  success: '#10dc60',
  warning: '#ffce00',
  danger: '#f04141',
  dark: '#222428',
  medium: '#989aa2',
  light: '#f4f5f8'
}
