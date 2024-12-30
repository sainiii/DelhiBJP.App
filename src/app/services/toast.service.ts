import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(public toastController: ToastController) { }

  async presentToast(infoMessage: string, type?: "danger" | "secondary" | "success" | "tertiary" | "warning", duration: number = 3500) {
    const toast = await this.toastController.create({
      message: infoMessage,
      duration: duration,
      color: type,
      swipeGesture: "vertical"
    });
    toast.present();
  }
}
