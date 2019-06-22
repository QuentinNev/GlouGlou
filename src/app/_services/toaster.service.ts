/**
 * This service can show a toaster everywhere on the app
 */

import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class ToasterService {
  private duration: number

  constructor(public toastController: ToastController) {
    this.duration = 1000
  }

  showToast(message) {
    if (message != null) {
      this.toastController.create({
        message: message,
        showCloseButton: true,
        duration: this.duration
      }).then((toastData) => {
        toastData.present()
      })
    } else {
      this.toastController.create({
        message: "No wines have been fetched yet.",
        showCloseButton: true,
        duration: this.duration
      }).then((toastData) => {
        toastData.present()
      })
    }
  }
}
