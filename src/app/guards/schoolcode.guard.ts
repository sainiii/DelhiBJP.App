import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { APPConstants } from '../services/constants/auth.constant';

@Injectable({
  providedIn: 'root'
})
export class SchoolcodeGuard implements  CanActivate{
  constructor(public storageService: StorageService, public router: Router) {}
  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
        this.storageService.get(APPConstants.AUTHAPP)
            .then(res => {
            if (res) {
                this.router.navigate(['schoolcode']);
                resolve(true);
          } else resolve(false);
        })
        .catch(err => {
          resolve(true);
        });
    });
  }
}
