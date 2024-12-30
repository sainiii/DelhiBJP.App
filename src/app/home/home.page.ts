import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { AuthConstants } from 'src/app/services/constants/auth.constant';
import { ViewWillEnter } from '@ionic/angular';
import { App, AppInfo } from '@capacitor/app';
import { LoaderService } from '../services/loader.service';
import { DataSharingService } from '../services/data-sharing.service';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  appInfo: AppInfo | undefined;

  constructor(private loaderService: LoaderService,
    private data: DataSharingService,
    private router: Router,
    private httpService: ApiService,
    private storageService: StorageService,
    private toastService: ToastService,) { }
  postData = {
    UserCodeStr: '',
    UserPW: ''
  };
  validateInputs() {
    let username = this.postData.UserCodeStr.trim();
    let password = this.postData.UserPW.trim();
    return (
      this.postData.UserCodeStr &&
      this.postData.UserPW &&
      username.length > 0 &&
      password.length > 0
    );
  }
  async loginAction() {
    await this.loaderService.showLoader();
    if (this.validateInputs()) {
      this.httpService.post('/api/user/LoginWebUser', this.postData)
        .subscribe(async (x: any) => {
          if (x.Data[0]) {
            //this.updateFCMID();
            const token = x.Data[0].TockenID;
            const roleName = x.Data[0].UserType;



            this.storageService
              .store(AuthConstants.AUTH, x.Data[0])
              .then(x => {
                localStorage.setItem('token', token);
                this.data.SetUserData();
                this.router.navigate(['/admin/dashboard'], { replaceUrl: true });

              });
          }
          else {
            await this.loaderService.hideLoader();
            this.toastService.presentToast('Incorrect username and password.', 'danger');
          }
        }, async error => {
          await this.loaderService.hideLoader();
          this.toastService.presentToast('Network Issue.', 'danger');
        });
    } else {
      await this.loaderService.hideLoader();
      this.toastService.presentToast('Please enter email/username or password.', 'danger');
    }
  }

}
