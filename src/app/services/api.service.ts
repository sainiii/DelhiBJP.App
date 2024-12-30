import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { ToastService } from './toast.service';
import { LoaderService } from './loader.service';
import { DataSharingService } from './data-sharing.service';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers = new HttpHeaders();
  options = { headers: this.headers, withCredintials: false };
  private headerOptions: any;
  Configdata: any;
  url = '';
  apiconfig: any;
  networkIssueLogged = false;
  private slowNetworkThreshold = 3000; // 3 seconds threshold for slow network

  constructor(private http: HttpClient,
    private storageService: StorageService,
    private toast: ToastService,
    private loaderService: LoaderService,
    private dataSharing: DataSharingService,
    private network: NetworkService) {
    this.getSchool();
  }

  async getSchool() {
    this.apiconfig = await this.storageService.get('apiconfig');
  }

  private setHeaders() {
    const token = localStorage.getItem('token');
    if (token != null) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token.toString(),
        'Token': token.toString()
      });
      return headers;
    }
    else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
      return headers;
    }
  }

  livepost(apiUrl: string, dataModel: any) {
    this.headerOptions = this.setHeaders();
    const url = environment.apiUrl + apiUrl;
    const startTime = new Date().getTime();

    return this.http.post(url, JSON.stringify(dataModel), { headers: this.headerOptions })
      .pipe(
        tap(res => {
          this.networkIssueLogged = false;
          const endTime = new Date().getTime();
          const duration = endTime - startTime;

          // Detect slow network based on latency
          if (duration > this.slowNetworkThreshold) {
            this.displaySlowNetworkWarning();
          }

          // Check connection type
          this.checkConnectionType();
        }), catchError(error => {
          return this.formatErrors(error);
        })
      );
  }

  geurldata() {
    this.headerOptions = this.setHeaders();
    const startTime = new Date().getTime();

    return this.http.get('https://api.practice2perfection.com/apk/appverions.txt', { headers: this.headerOptions })
      .pipe(
        tap(res => {
          this.networkIssueLogged = false;
          const endTime = new Date().getTime();
          const duration = endTime - startTime;

          // Detect slow network based on latency
          if (duration > this.slowNetworkThreshold) {
            this.displaySlowNetworkWarning();
          }

          // Check connection type
          this.checkConnectionType();
        }), catchError(error => {
          return this.formatErrors(error);
        })
      );
  }

  livegetList(apiUrl: string) {
    this.headerOptions = this.setHeaders();
    const url = environment.apiUrl + apiUrl;
    const startTime = new Date().getTime();

    return this.http.get(url, { headers: this.headerOptions })
      .pipe(
        tap(res => {
          this.networkIssueLogged = false;
          const endTime = new Date().getTime();
          const duration = endTime - startTime;

          // Detect slow network based on latency
          if (duration > this.slowNetworkThreshold) {
            this.displaySlowNetworkWarning();
          }

          // Check connection type
          this.checkConnectionType();
        }), catchError(error => {
          return this.formatErrors(error);
        })
      );
  }

  post(apiUrl: string, dataModel: any) {
    this.headerOptions = this.setHeaders();
    const url = environment.apiUrl + apiUrl;
    const startTime = new Date().getTime();

    if (this.network.connected) {
      return this.http.post(url, JSON.stringify(dataModel), { headers: this.headerOptions })
        .pipe(
          tap(() => {
            this.networkIssueLogged = false;
            const endTime = new Date().getTime();
            const duration = endTime - startTime;

            // Detect slow network based on latency
            if (duration > this.slowNetworkThreshold) {
              this.displaySlowNetworkWarning();
            }

            // Check connection type
            this.checkConnectionType();
          }), catchError(error => {
            return this.formatErrors(error);
          })
        );
    }
    else {
      return throwError(() => new Error("No internet. Try again later."));
    }
  }

  formData(apiUrl: string, formData: FormData) {
    this.headerOptions = this.setHeaders();
    const url = this.apiconfig.apiUrl + apiUrl;
    const startTime = new Date().getTime();
    if (this.network.connected) {
      return this.http.post<any>(url, formData, { reportProgress: true, observe: 'events' })
        .pipe(
          tap(res => {
            this.networkIssueLogged = false;
            const endTime = new Date().getTime();
            const duration = endTime - startTime;

            // Detect slow network based on latency
            if (duration > this.slowNetworkThreshold) {
              this.displaySlowNetworkWarning();
            }

            // Check connection type
            this.checkConnectionType();
          }), catchError(error => {
            return this.formatErrors(error);
          })
        );
    }
    else {
      return throwError(() => new Error("No internet. Try again later."));
    }
  }

  put(apiUrl: string, dataModel: any) {
    this.headerOptions = this.setHeaders();
    const url = this.apiconfig.apiUrl + apiUrl;
    const startTime = new Date().getTime();

    if (this.network.connected) {
      return this.http.put(url, JSON.stringify(dataModel), { headers: this.headerOptions })
        .pipe(
          tap(res => {
            this.networkIssueLogged = false;
            const endTime = new Date().getTime();
            const duration = endTime - startTime;

            // Detect slow network based on latency
            if (duration > this.slowNetworkThreshold) {
              this.displaySlowNetworkWarning();
            }

            // Check connection type
            this.checkConnectionType();
          }), catchError(error => {
            return this.formatErrors(error);
          })
        );
    }
    else {
      return throwError(() => new Error("No internet. Try again later."));
    }
  }

  getList(apiUrl: string) {
    this.headerOptions = this.setHeaders();
    const url = environment.apiUrl + apiUrl;
    const startTime = new Date().getTime();

    if (this.network.connected) {
      return this.http.get(url, { headers: this.headerOptions })
        .pipe(
          tap(res => {
            this.networkIssueLogged = false;
            const endTime = new Date().getTime();
            const duration = endTime - startTime;

            // Detect slow network based on latency
            if (duration > this.slowNetworkThreshold) {
              this.displaySlowNetworkWarning();
            }

            // Check connection type
            this.checkConnectionType();
          }), catchError(error => {
            return this.formatErrors(error);
          })
        );
    }
    else {
      return throwError(() => new Error("No internet. Try again later."));
    }
  }

  getExternal(apiUrl: string) {
    this.headerOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    const url = apiUrl;
    const startTime = new Date().getTime();

    return this.http.get(url)
      .pipe(
        tap(res => {
          this.networkIssueLogged = false;
          const endTime = new Date().getTime();
          const duration = endTime - startTime;

          // Detect slow network based on latency
          if (duration > this.slowNetworkThreshold) {
            this.displaySlowNetworkWarning();
          }

          // Check connection type
          this.checkConnectionType();
        }), catchError(error => {
          return this.formatErrors(error);
        })
      );
  }

  SendFile(formData2: any) {
    const url = this.apiconfig.apiUrl + "/api/feedbak/send";
    const startTime = new Date().getTime();
    return this.http.post<any>(url, formData2, {
    }).pipe(
      tap(res => {
        this.networkIssueLogged = false;
        const endTime = new Date().getTime();
        const duration = endTime - startTime;

        // Detect slow network based on latency
        if (duration > this.slowNetworkThreshold) {
          this.displaySlowNetworkWarning();
        }

        // Check connection type
        this.checkConnectionType();
      }), catchError(error => {
        return this.formatErrors(error);
      })
    );
  }

  deleteData(apiUrl: string, id: string) {
    this.headerOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const url = this.apiconfig.apiUrl + apiUrl;
    const startTime = new Date().getTime();
    return this.http.delete(url + id, { headers: this.headerOptions })
      .pipe(
        tap(res => {
          this.networkIssueLogged = false;
          const endTime = new Date().getTime();
          const duration = endTime - startTime;

          // Detect slow network based on latency
          if (duration > this.slowNetworkThreshold) {
            this.displaySlowNetworkWarning();
          }

          // Check connection type
          this.checkConnectionType();
        }), catchError(error => {
          return this.formatErrors(error);
        })
      );
  }

  // Check for slow network connection type
  private checkConnectionType(): void {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection) {
        if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
          this.displaySlowNetworkWarning();
        }
      }
    }
  }

  // Show slow network warning
  private displaySlowNetworkWarning(): void {
    // console.log('Network is slow. Displaying warning message.');
    // this.toast.presentToast('Slow network detected.', 'warning');
    // You can emit an event or log this message to alert the component
    // Alternatively, use a service to show this warning in the UI
  }

  private async formatErrors(error: any) {
    await this.loaderService.hideLoader();
    if (error.status == 401) {
      await this.toast.presentToast('Session Expired. Please login again.', 'danger');
      // logout
      localStorage.removeItem('token');
      sessionStorage.clear();
      let apiconfig = await this.storageService.get('apiconfig');
      await this.storageService.clear();
      await this.storageService.store('apiconfig', apiconfig);
      this.dataSharing.clear();
      // logout
      return throwError(() => new Error('Session Expired. Please login again.'));
    }
    else {
      if (!this.networkIssueLogged) {
        await this.toast.presentToast('Network Issue. Check your internet connection.', 'danger');
        this.networkIssueLogged = true;
      }
      return throwError(() => new Error(error));
    }
  }
}
