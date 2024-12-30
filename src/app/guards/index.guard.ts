import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataSharingService } from '../services/data-sharing.service';
import { StorageService } from '../services/storage.service';
import { AuthConstants } from '../services/constants/auth.constant';

@Injectable({
    providedIn: 'root'
})
export class IndexGuard implements CanActivate {
    constructor(public storageService: StorageService, public router: Router,
        private data: DataSharingService,
    ) { }
    canActivate(): Promise<boolean> {
        return new Promise(async resolve => {
            
                this.storageService.get(AuthConstants.AUTH).then(user => {
                    this.data.SetUserData();
                    if (user) {
                        this.router.navigate(['/admin/dashboard']);
                    }
                    else {
                        this.router.navigate(['/home']);
                        resolve(true);
                    }
                });
 
        });
    }
}
