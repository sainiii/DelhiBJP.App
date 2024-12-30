import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
 
import { takeUntil } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { ApiService } from '../../services/api.service';
import { AuthConstants } from '../../services/constants/auth.constant';
 

@Component({
  selector: 'app-dashbard',
  templateUrl: './dashbard.page.html',
  styleUrls: ['./dashbard.page.scss'],
})
export class DashbardPage implements OnDestroy, ViewWillEnter {

  authUser: any;
  postData = {
    user_id: '',
    token: ''
  };

  notifications = 0;
  interval: any;
  apiconfig: any;
  selectedStudent: any;
  imageurl = '';
  profilePic = '';
  user: any;

  constructor(private router: Router,
    private dataSharing: DataSharingService,
    private loaderService: LoaderService,
    private httpService: ApiService,
    private storageService: StorageService
  ) {


  }

  async ionViewWillEnter() {

    this.dataSharing.getUserData().pipe(takeUntil(this.dataSharing.unsubscribe)).subscribe(async (res: any) => {
      clearInterval(this.interval);
      this.interval = 0;
      this.authUser = res;
      this.apiconfig = await this.storageService.get('apiconfig');

      console.log(this.apiconfig);
      this.user = await this.storageService.get(AuthConstants.AUTH);
      console.log(this.user);


      if (this.authUser && Object.prototype.toString.call(this.authUser) !== '[object Array]' && this.authUser.Id) {
        this.getNotifications();
        this.interval = setInterval(() => {
          this.getNotifications();
        }, 5000);
      }
    });
  }

  getNotifications() {
    this.httpService.post('/api/Notification/GetByStudent', { "StudentId": this.authUser.Id }).subscribe(async (x: any) => {
      if (x && x.Message == 'Success') {
        this.notifications = x.Data[0].length || 0;
        this.dataSharing.setNotificationsCount(this.notifications);
        await this.loaderService.hideLoader();
      }
      else {
        this.notifications = 0;
        this.dataSharing.setNotificationsCount(0);
        await this.loaderService.hideLoader();
      }
    }, async (error: any) => {
      await this.loaderService.hideLoader();
    });
  }

  clearAllInterval() {
    while (this.interval.length) {
      clearInterval(this.interval.pop());
    }
  }

  goto(route: any) {
    window.clearInterval(this.interval);
    clearInterval(this.interval);
    this.router.navigate([route]);
  }

  navigateToUrl() {
    sessionStorage.setItem('quizChildId', this.selectedStudent.Id);
    this.router.navigate(['/parent/quiz/today']);
  }

  subjectPerformance(subject: any) {
    this.router.navigate(['/parent/subject-performance', subject.Id, subject.SubjectId]);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.interval = 0;
  }

  ionViewWillLeave() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = 0;
    }
  }
}
