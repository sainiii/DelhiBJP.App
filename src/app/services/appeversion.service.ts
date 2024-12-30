// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { InAppBrowser, InAppBrowserObject } from '@awesome-cordova-plugins/in-app-browser/ngx';
// import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
// import { AlertController, Platform } from '@ionic/angular';
// import { AppAvailability } from '@awesome-cordova-plugins/app-availability/ngx';

@Injectable({
    providedIn: 'root'
})
export class AppeversionService {

    // maintenancexapmle = "https://trialapi.practice2perfection.com/api/Shared/getAppversion";

    // constructor(private http: HttpClient,
    //     private alertCtrl: AlertController,
    //     private appversion: AppVersion,
    //     private iab: InAppBrowser,
    //     private appAvailability: AppAvailability,
    //     private plt: Platform) { }




    // async checkforupdate() {
    //     this.http.get(this.maintenancexapmle).subscribe(async (info: any) => {

    //         //console.log(info);
    //         if (this.plt.is('cordova')) {
    //             if (info.enabled) {
    //                 const versionnumber = await this.appversion.getVersionNumber();
    //                 const splitversion = versionnumber.split('.');
    //                 const splitserverversion = info.current.split('.');
    //                 if (splitversion[0] !== splitserverversion[0]) {
    //                     this.presentAlert(info.majorMsg!.title, info.majorMsg!.msg, info.majorMsg!.btn, false)
    //                 }
    //                 else if (splitversion[1] !== splitserverversion[1]) {
    //                     this.presentAlert(info.minorMsg!.title, info.minorMsg!.msg, info.majorMsg!.btn, false)
    //                 }
    //                 else if (splitversion[2] !== splitserverversion[2]) {
    //                     this.presentAlert(info.minorMsg!.title, info.minorMsg!.msg, info.majorMsg!.btn, false)
    //                 }
    //             }
    //         }
    //     });
    // }


    // async launchApp() {
    //     let app: string;
    //     // check if the platform is ios or android, else open the web url
    //     if (this.plt.is('android')) {
    //         app = 'com.stier.p2p';
    //     } else {
    //         let browser = null;
    //         browser = this.iab.create('https://play.google.com/store/apps/details?id=com.stier.p2p', '_blank', 'location=no')
    //         return;
    //     }
    //     this.appAvailability.check(app).then(
    //         () => {

    //             // success callback, the app exists and we can open it
    //             const browser: InAppBrowserObject = this.iab.create('https://play.google.com/store/apps/details?id=com.stier.p2p', '_system');
    //             browser.on('loadstart').subscribe((event: { url: any; }) => {
    //                 console.log('loadstart', event.url);


    //             }, (err: string) => {
    //                 console.log("InAppBrowser loadstart Event Error: " + err);
    //             });

    //             browser.on('loadstop').subscribe((event: { url: any; }) => {
    //                 console.log('loadstop', event.url);


    //             }, (err: string) => {
    //                 console.log("InAppBrowser loadstop Event Error: " + err);
    //             });

    //         },
    //         () => {
    //             // error callback, the app does not exist, open regular web url instead
    //             //  const browser: InAppBrowserObject = this.inAppBrowser.create(webUrl, '_system');

    //             const browser: InAppBrowserObject = this.iab.create('https://play.google.com/store/apps/details?id=com.stier.p2p', '_system');

    //         }
    //     );
    // }

    // async openAppstoreEntry() {


    //     if (this.plt.is('cordova')) {

    //         this.launchApp();
    //     }
    //     else {

    //     }
    // }
    // async presentAlert(header: string, message: string, buttonText = '', allowcase = false) {
    //     const buttons: any = [];
    //     if (buttonText != "") {
    //         buttons.push({
    //             text: buttonText,
    //             handler: () => {
    //                 this.launchApp()
    //             }
    //         });
    //     }

    //     const alert = await this.alertCtrl.create({
    //         header,
    //         message,
    //         buttons,
    //         backdropDismiss: allowcase

    //     });
    //     await alert.present();
    // }
}
interface AddupdateApp {
    current: string;
    enabled: boolean;
    msg?: {
        title: string;
        msg: string;
        btn: string;
    };
    majorMsg?: {
        title: string;
        msg: string;
        btn: string;
    }
    minorMsg?: {
        title: string;
        msg: string;
        btn: string;
    }

}