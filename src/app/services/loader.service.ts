import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loader: HTMLIonLoadingElement | undefined ;
  // private loaderInterval = null;
  // private loaderTime = 0;

  constructor(private loadingController: LoadingController) { }

  showHideAutoLoader(time = 2000) {

    this.loadingController.create({
      message: `This Loader Will Auto Hide in ${(time > 0 ? time : 1000) / 1000} Seconds`,
      duration: time > 0 ? time : 1000
    }).then(async (res) => {
      await res.present();

      res.onDidDismiss().then((dis) => {
        console.log(`Loading dismissed! after ${(time > 0 ? time : 1000) / 1000} Seconds`, dis);
      });
    });
  }

  async showLoader(backdropDismiss = true, message = 'Please wait...', duration = 30000) {
    if (this.loader && document.getElementById(this.loader.id)) {
      await this.loader.dismiss();
       
    }

    this.loader = await this.loadingController.create({
      spinner: 'crescent',
      message: message,
      translucent: true,
      backdropDismiss: backdropDismiss,
      duration: duration
    });

    // this.loaderTimeout = setTimeout(() => {
    //   if (this.loader) this.loader.message = 'Slow network detected! Please wait...';
    //   clearTimeout(this.loaderTimeout);
    // }, 2000);

    // this.loaderInterval = setInterval(async () => {
    //   this.loaderTime++;
    //   if (this.loaderTime > 3) {
    //     if (this.loader) this.loader.message = 'Slow network. This is taking some time...';
    //   }
    //   if (this.loaderTime > 5) {
    //     if (this.loader) this.loader.message = 'Network issue detected. Try again if request fails.';
    //   }
    //   console.log(this.loaderTime);
    // }, 1000);

    await this.loader.present();
  }

  async hideLoader() {
    if (this.loader) {
      await this.loadingController.dismiss(null,    this.loader.id);
      
      // clearInterval(this.loaderInterval);
      // this.loaderTime = 0;
    }
    else {
     
      // clearInterval(this.loaderInterval);
      // this.loaderTime = 0;
    }
  }
}
