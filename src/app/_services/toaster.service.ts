import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
// use this class to show a toast
export class ToasterService {
  private duration: number

  constructor(public toastController: ToastController) {
    this.duration = 1000
  }

  showToast(message) {
    if (message != null) {
      this.toastController.create({
        message: message,
        duration: this.duration
      }).then((toastData) => {
        toastData.present();
      });
    } else {
      this.toastController.create({
        message: "No wines have been fetched yet.",
        duration: this.duration
      }).then((toastData) => {
        toastData.present();
      });
    }
  }

  HideToast() {
    this.toastController.dismiss();
  }
}
