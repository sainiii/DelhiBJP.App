import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { DataSharingService } from '../../services/data-sharing.service';
import { LoaderService } from '../../services/loader.service';
import { ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-shakti-kendera',
  templateUrl: './shakti-kendera.page.html',
  styleUrls: ['./shakti-kendera.page.scss'],
})
export class ShaktiKenderaPage implements OnInit {


  constructor(private httpService: ApiService, private loaderService: LoaderService,
    private toastService: ToastService,   public _route: Router,
     ) { }

  ngOnInit() {
    this.loaderService.hideLoader();
  }
  selectedLocaiton: any = '0';
  sectorBlocklist: any;
  saktikandrfilteredlist: any = []
  GetIdData(data: any) {
    this.selectedLocaiton = data;
    if (this.selectedLocaiton === null) {
      this.sectorBlocklist = [];
    }
    else { 

      this.loaderService.showLoader();
      this.httpService.post('/api/Voters/searchsaktikandar', { "CityID": this.selectedLocaiton })
        .subscribe((x: any) => {
          this.saktikandrfilteredlist = x[0];
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
  this._route.navigate([ '/admin/searchvoter/' + obj.PollingboothId]
    , { queryParams: { PartNo:   0 , schoolName: obj.VPollingboothName ,   returnUrl: '/admin/shaktiKendera'} });
  

  }
}
