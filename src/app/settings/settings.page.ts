import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../_services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public apiUrl: string
  public theme: string

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.settingsService.getSettings().then(settings => {
      if (settings) {
        this.apiUrl = settings['apiUrl']
        this.theme = settings['theme']
      } else {
        this.apiUrl = "http://localhost:8000/api/qns/"
        this.theme = "default"
      }
    })
  }

  public onApiUrlChanged(apiUrl) {
    this.settingsService.setApiUrl(apiUrl)
  }

  public onThemeChanged(theme) {
    this.settingsService.setTheme(theme)
  }

}
