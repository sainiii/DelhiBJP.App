import { Component, Input, OnInit } from '@angular/core';
import { NavController, ViewWillEnter } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { takeUntil } from 'rxjs';
import { AuthConstants } from 'src/app/services/constants/auth.constant';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  authUser: any;
  constructor(
    private navController: NavController,
    private dataSharing: DataSharingService,private storageService: StorageService,
    private router: Router
  ) { }

  @Input() headerTitle = '';
  @Input() backLink = '';
  @Input() badgeNumber: number = 0;

  defaultHref = '';

   async ngOnInit() {

    this.authUser = await this.storageService.get(AuthConstants.AUTH);
 
      if (this.authUser) {
        if (this.authUser.userType == 'Student') {
          this.defaultHref = '/student/home';
        }
        if (this.authUser.userType == 'Parent') {
          this.defaultHref = '/parent/home';
        }
        if (this.authUser.userType == 'Teachers') {
          this.defaultHref = '/teacher/home';
        }
      }
     
  }

  goBack() {
    if (!this.backLink) {
      this.navController.back();
    }
    else {
      this.router.navigate([this.backLink], { replaceUrl: true });
    }
  }
}