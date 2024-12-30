import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { DataSharingService } from '../../services/data-sharing.service';
import { LoaderService } from '../../services/loader.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-bothwise',
  templateUrl: './bothwise.page.html',
  styleUrls: ['./bothwise.page.scss'],
})
export class BothwisePage implements OnInit {

  constructor(private httpService: ApiService, private loaderService: LoaderService,
    private toastService: ToastService,
    public _route: Router,
      private router: Router,) { }

  ngOnInit() {
    this.loaderService.hideLoader();
  }
  selectedLocaiton: any = '0';
  sectorBlocklist: any;
  boothwisefilteredlist: any=[]
  GetIdData(data: any) {
    console.log(data);
    this.selectedLocaiton = data;
    if (this.selectedLocaiton === null) {
      this.sectorBlocklist = [];
    }
    else {

      this.loaderService.showLoader();
      this.httpService.post('/api/Voters/searchBoothwise', { "CityID": this.selectedLocaiton })
        .subscribe((x: any) => {
          this.boothwisefilteredlist = x[0];
          this.loaderService.hideLoader();
        }, (error: any) => {
          this.toastService.presentToast('Some error occured. Please try again.');
        });
      this.loaderService.hideLoader();

    }
  

  }

  filtertest(obj :any)
  {
  console.log(obj)
  this._route.navigate([ '/admin/searchvoter/' + this.selectedLocaiton]
    , { queryParams: { PartNo:   obj.Partno , returnUrl: '/admin/bothwise'} });
  

  }
}
