import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  connected: boolean = true;

  constructor(private toast: ToastService) { }

  init() {
    Network.addListener('networkStatusChange', async status => {
      if (!status.connected && this.connected) {
        this.connected = status.connected;
        await this.toast.presentToast("You are offline!", "danger");
      }
      else if (status.connected && !this.connected) {
        this.connected = status.connected;
        await this.toast.presentToast("You are back online!", "success");
      }
    });
  }
}
