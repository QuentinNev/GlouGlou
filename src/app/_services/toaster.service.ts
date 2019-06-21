import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
// use this class to show a toast
export class ToasterService {

  constructor(public toastController: ToastController) { }

  showToast(date) {
    let text: Date = new Date(date)
    this.toastController.create({
      message: `Last successful update : ${text.toString()}`,
      duration: 2000
    }).then((toastData) => {
      toastData.present();
    });
  }

  HideToast() {
    this.toastController.dismiss();
  }
}
