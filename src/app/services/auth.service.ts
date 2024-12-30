import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { AuthConstants } from './constants/auth.constant';
import { DataSharingService } from './data-sharing.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData$ = new BehaviorSubject<any>([]);
  globalData$ = new BehaviorSubject<any>([]);

  constructor(
    private httpService: ApiService,
    private storageService: StorageService,
    private router: Router,
    private dataSharing: DataSharingService
  ) { }

  getUserData() {
    this.storageService.get(AuthConstants.AUTH).then(res => {
      this.userData$.next(res);
    });
  }

  login(postData: any): Observable<any> {
    return this.httpService.post('/api/user/LoginWebUser', postData);
  }

  signup(postData: any): Observable<any> {
    return this.httpService.post('signup', postData);
  }

  async logout() {
    // this.storageService.Removekey('userData');
    localStorage.removeItem('token');
    sessionStorage.clear();
    let apiconfig = await this.storageService.get('apiconfig');
    await this.storageService.clear();
    await this.storageService.store('apiconfig', apiconfig);
    this.dataSharing.clear();
    this.router.navigate(['/'], { replaceUrl: true });
  }
}
