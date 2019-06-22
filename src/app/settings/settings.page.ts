import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../_services/settings.service';
import { ThemeService } from '../_services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public apiUrl: string
  public theme: string

  constructor(private settingsService: SettingsService, private themeService: ThemeService) {
  }

  ngOnInit() {
    // Set default settings if none have been set yet
    this.settingsService.getSettings().then(settings => {
      if (settings) {
        this.apiUrl = settings['apiUrl']
        this.theme = settings['theme']
      } else {
        this.apiUrl = "http://localhost:8000/api/qns/"
        this.theme = "neon"
      }
    })
  }

  public onApiUrlChanged(apiUrl) {
    this.settingsService.setApiUrl(apiUrl)
  }

  public onThemeChanged(theme) {
    this.settingsService.setTheme(theme)
    this.themeService.setTheme(themes[theme])
  }

}

/**
 * Here are stored theme parameters
 * themeService.setTheme creates the theme on the fly
 */
const themes = {
  autumn: {
    primary: '#F78154',
    secondary: '#4D9078',
    tertiary: '#B4436C',
    light: '#FDE8DF',
    medium: '#FCD0A2',
    dark: '#B89876'
  },
  night: {
    primary: '#8CBA80',
    secondary: '#FCFF6C',
    tertiary: '#FE5F55',
    medium: '#BCC2C7',
    dark: '#F7F7FF',
    light: '#495867'
  },
  neon: {
    primary: '#39BFBD',
    secondary: '#4CE0B3',
    tertiary: '#FF5E79',
    light: '#F4EDF2',
    medium: '#B682A5',
    dark: '#34162A'
  }
};