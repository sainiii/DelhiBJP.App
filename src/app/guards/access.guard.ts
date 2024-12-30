import { CanMatch, Route, UrlSegment } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Injectable, inject } from '@angular/core';
import { AuthConstants } from '../services/constants/auth.constant';
import { ToastService } from 'src/app/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanMatch {
  storageService = inject(StorageService);
  toastService = inject(ToastService);
  async canMatch(route: Route, segments: UrlSegment[]) {
    let school = await this.storageService.get('apiconfig');
    if (school) {
      let user = await this.storageService.get(AuthConstants.AUTH);
      if (user && user.RoleName == 'Student' && route.path == 'student') {
        return true;
      }
      else if (user && user.RoleName == 'Parent' && route.path == 'parent') {
        return true;
      }
      else if (user && user.RoleName == 'Teachers' && route.path == 'teacher') {
        return true;
      }
      else if (user && (user.RoleName == 'Admin' || user.RoleName == 'Principal') && route.path == 'admin') {
        return true;
      }
      else {
        this.toastService.presentToast('Access Denied!')
        return false;
      }
    }
    else {
      return false;
    }
  }
}