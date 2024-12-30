import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform, ViewWillEnter } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { LoaderService } from 'src/app/services/loader.service';



import { takeUntil } from 'rxjs';
import { App, AppInfo } from '@capacitor/app';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from '../../services/constants/auth.constant';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

    public authUser: any;
  notifications = 0;
  interval: any;
  profilePic = '';
  VersionNumber: string = '';
  apiconfig: any;
  imageurl = '';
  appInfo: AppInfo | undefined;

  // private modalService = inject(NgbModal);

  constructor(private router: Router,
    private loaderService: LoaderService,
    private auth: AuthService,
    private httpService: ApiService,
    private authService: AuthService,
    private menu: MenuController,

    private dataSharing: DataSharingService,

    private platform: Platform,
    private storageService: StorageService) {
    if (this.platform.is('cordova')) {
    }
    else {
      this.VersionNumber = '0.0.1';
    }
  }

  async ionViewWillEnter() {
    this.apiconfig = await this.storageService.get('apiconfig');
    this.imageurl = this.apiconfig._upload_url;
    this.authUser = await this.storageService.get(AuthConstants.AUTH);
     
  }

  ionViewDidEnter() {
    this.dataSharing.getUpdateNeeded().subscribe(status => {
      if (status) {
        setTimeout(() => {
          //this.openModal();
        }, 2000);
      }
    })
  }

  async ngOnInit() {
    this.loaderService.hideLoader()
    this.auth.getUserData();
    this.dataSharing.SetUserData();
    try {
      this.appInfo = await App.getInfo();
    } catch (error) {
      console.log(error);
    }

  }

 
  logoutAction() {
    if (confirm('Are you sure you want to log out?')) {
      this.authService.logout();
      this.menu.close();
      clearInterval(this.interval);
    }
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  closeMenu() {
    this.menu.close();
  }

  goto(i: any) {
    this.menu.close();
    this.router.navigate([i]);
  }

  // openModal() {
  //   this.modalService.open(AppUpdateComponent, { fullscreen: true, windowClass: 'app-update-modal' }).result.then(
  //     (result) => {
  //       console.log(result);
  //     },
  //     (reason) => {
  //       console.log(reason);
  //     }
  //   );
  // }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
