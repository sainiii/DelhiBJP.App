import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { LoaderService } from '../../../services/loader.service';
import { ToastService } from '../../../services/toast.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Share } from '@capacitor/share';
import { DataSharingService } from '../../../services/data-sharing.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-voterlist',
  templateUrl: './voterlist.page.html',
  styleUrls: ['./voterlist.page.scss'],
})
export class VoterlistPage implements OnInit {

  Bid: number = 0;
  voterlist: voterlist[] = [];
  selectedAdmissionsfilteredlist: voterlist[] = [];
  admissionsfilteredlist: voterlist[] = [];
  searchtext: string = ''
  nametext: string = ''
  fathertext: string = ''
  houstext: string = ''
  uidtext: string = ''
  private unsubscribe = new Subject<void>();
  authUser: any;
  returnurl: string = '/admin/searchvoter'
  partno: number = 0;
  headertext: string = '';
  cityname: string = '';
  sectorblockdata: any = [];
  defaultHref = '';
  types: string ='Block'
  Polling_bothId: number=0;
  constructor(private httpService: ApiService, private loaderService: LoaderService,
    private toastService: ToastService,
    private alertController: AlertController,
    private dataSharing: DataSharingService,
    private solcial: SocialSharing,
    private router: Router,
    private route: ActivatedRoute,) { }


    goBack()
    {
      this.router.navigate([this.returnurl], { replaceUrl: true });
    }
  ngOnInit() {
    this.dataSharing.getUserData().pipe(takeUntil(this.unsubscribe)).subscribe(async (res: any) => {
      this.authUser = res;
      console.log(res);
      if (this.authUser && this.authUser.Id) {
      }
      this.dataSharing.SetApiData();
    });

    if (this.route.snapshot.params['Id']) {
      this.Bid = this.route.snapshot.params['Id'];

      this.route.queryParams.subscribe(p => {
        this.returnurl = p['returnUrl'] || '/admin/searchvoter';
        if (p['PartNo']) {

          if(p['schoolName'])
          {
            this.partno= -1;
            this.Polling_bothId= this.Bid;
            this.headertext =p['schoolName'] || '';
            this.types='School';
          }
          else
          {
          this.partno = p['PartNo'] || 0;
          if (this.partno != 0) {
            this.types='Bothwise';
            this.Polling_bothId= 0;
            this.citynamedata();
          }
        }
           
        }
        else {
          this.sectioninformation();
        }

      });
      this.getlist(this.Bid);
    }

  }

  citynamedata() {
    this.cityname = '';
    this.httpService.getList('/api/City/' + this.Bid)
      .subscribe((x: any) => {
        this.cityname = x.Data[0][0].CityName
        this.headertext = this.cityname + '  बूथ संख्या - ' + this.partno
      }, (error: any) => {

      });

  }

  sectioninformation() {
    this.cityname = '';
    this.httpService.getList('/api/SectorBlock/' + this.Bid)
      .subscribe((x: any) => {
        this.sectorblockdata = x.Data[0][0]
        console.log(this.sectorblockdata);
        this.headertext =   this.sectorblockdata.BName +'   '+ this.sectorblockdata.LName + ' ' +  this.sectorblockdata.CityName 
      }, (error: any) => {

      });

  }
  print() {




  }


  async sendmessages(object: any) {

    const alert = await this.alertController.create({
      header: 'Enter Mobile No',
      message: '',
      inputs: [
        {
          type: 'number',
          placeholder: 'Mobile No',
          min: 1,
          max: 10,
        },

      ],
      buttons: [
        {
          text: 'Send',
          role: 'confirm',
          handler: data => {

            this.httpService.post('/api/Voters/UpdateMobileNo/', { 'Id': object.Id, 'ContactNo': data[0] })
              .subscribe(async (x: any) => {

                if (x == 'Success') {
                  var phoneno = "+91" + data[0]
                  var textsend = "आदरणीय " + object.EName + "कृपया निम्न विवरण को जाँच लें \n\nPart NO - " + object.PartNo + '\nSLNo - ' + object.SlNo + "\nName - " + object.EName + "\nS/O - " + object.RName + "\nPolling Booth - " + object.PollingboothName + "\n निवेदन  - " + this.authUser.FirstName + ' ' + this.authUser.LastName + ', भा.ज.पा'
                  this.solcial.shareViaSMS(textsend, phoneno).then(() => {
                  }).catch(() => { });
                }
                else {

                }
              }, error => {
                console.log(error);

              });





          }
        }
      ]
    })

    await alert.present();
  }

  async sendwhatupmessages(object: any) {

    const alert = await this.alertController.create({
      header: 'Enter Mobile No',
      message: '',
      inputs: [
        {
          type: 'number',
          placeholder: 'Mobile No',
          min: 1,
          max: 10,
        },

      ],
      buttons: [
        {
          text: 'Send',
          role: 'confirm',
          handler: data => {

            this.httpService.post('/api/Voters/UpdateMobileNo/', { 'Id': object.Id, 'ContactNo': data[0] })
              .subscribe(async (x: any) => {

                if (x == 'Success') {
                  var phoneno = "+91" + data[0]
                  var textsend = "आदरणीय  *" + object.EName + "* कृपया निम्न विवरण को जाँच लें \n\nPart NO - *" + object.PartNo + '*\nSLNo - *' + object.SlNo + "*\nName - *" + object.EName + "*\nS/O - *" + object.RName + "*\nPolling Booth - *" + object.PollingboothName + "*\n निवेदन  - *" + this.authUser.FirstName + ' ' + this.authUser.LastName + ', भा.ज.पा *'
                  this.solcial.shareViaWhatsAppToPhone(phoneno, textsend, "null", "").then(() => {
                  }).catch(() => {
                    // Sharing via email is not possible
                  });
                }
                else {

                }
              }, error => {
                console.log(error);

              });





          }
        }
      ]
    })

    await alert.present();
  }

  async shareonsms(object: any) {
    if (object.ContactNo == '') {
      this.sendmessages(object);
    }
    else {
      var phoneno = "+91" + object.ContactNo
      var textsend = "आदरणीय " + object.EName + "कृपया निम्न विवरण को जाँच लें \n\nPart NO - " + object.PartNo + '\nSLNo - ' + object.SlNo + "\nName - " + object.EName + "\nS/O - " + object.RName + "\nPolling Booth - " + object.PollingboothName + "\n निवेदन  - " + this.authUser.FirstName + ' ' + this.authUser.LastName + ', भा.ज.पा'
      this.solcial.shareViaSMS(textsend, phoneno).then(() => {
      }).catch(() => { });
    }
  }
  async shareonwhatup(object: any) {
    if (object.ContactNo == '') {
      this.sendwhatupmessages(object);

    }

    else {
      var phoneno = "+91" + object.ContactNo
      var textsend = "आदरणीय  *" + object.EName + "* कृपया निम्न विवरण को जाँच लें \n\nPart NO - *" + object.PartNo + '*\nSLNo - *' + object.SlNo + "*\nName - *" + object.EName + "*\nS/O - *" + object.RName + "*\nPolling Booth - *" + object.PollingboothName + "*\n निवेदन  - *" + this.authUser.FirstName + ' ' + this.authUser.LastName + ', भा.ज.पा *'
      this.solcial.shareViaWhatsAppToPhone(phoneno, textsend, "null", "").then(() => {

      }).catch(() => {
        // Sharing via email is not possible
      });
    }
  }
  onKeyUpEvent(event: any) {
    this.filter();
  }

  filter() {
    this.admissionsfilteredlist = [];

    if (this.searchtext !== '') {
      this.admissionsfilteredlist = this.voterlist
        .filter((admission: voterlist) =>
          admission.EName.toLocaleLowerCase().includes(this.searchtext.toLocaleLowerCase())
        );
    }

    if (this.uidtext !== '') {
      this.admissionsfilteredlist = this.voterlist
        .filter((admission: voterlist) =>
          admission.IDCardNo.toLocaleLowerCase().includes(this.uidtext.toLocaleLowerCase())
        );
    }

    if (this.houstext !== '') {
      this.admissionsfilteredlist = this.voterlist
        .filter((admission: voterlist) =>
          admission.HouseNo.toLocaleLowerCase().includes(this.houstext.toLocaleLowerCase())
        );
    }

    if (this.fathertext !== '') {
      this.admissionsfilteredlist = this.voterlist
        .filter((admission: voterlist) =>
          admission.RName.toLocaleLowerCase().includes(this.fathertext.toLocaleLowerCase())
        );
    }

    if (this.searchtext === '' && this.fathertext === '' && this.houstext === '' && this.uidtext === '') {

      for (let i = 0; i < 50; i++) {
        this.admissionsfilteredlist.push(this.voterlist[i]);
      }
    }


  }

  resetdata() {
    this.searchtext = this.fathertext = this.houstext = this.uidtext = '';
    this.admissionsfilteredlist = [];
    for (let i = 0; i < 50; i++) {
      this.admissionsfilteredlist.push(this.voterlist[i]);
    }

  }
  getlist(SId: number) {

    this.loaderService.showLoader();
    this.httpService.post('/api/Voters/searchvoter', { "BID": SId, "PartNo": this.partno, "Type" : this.types, "Polling_bothId" : this.Polling_bothId })
      .subscribe((x: any) => {
        this.voterlist = x[0];
        for (let i = 0; i < 50; i++) {
          this.admissionsfilteredlist.push(this.voterlist[i]);
        }
        this.loaderService.hideLoader();

      }, (error: any) => {
        this.toastService.presentToast('Some error occured. Please try again.');
      });
  }

  onIonInfinite(ev: any) {
    //this.generateItems();
    //setTimeout(() => {
    //  (ev as InfiniteScrollCustomEvent).target.complete();
    //}, 500);
  }


  filtertest() {
    this.filter()
  }
  private generateItems() {


    this.voterlist.length
    if (this.searchtext == '') {

      for (let i = 0; i < 500; i++) {
        this.admissionsfilteredlist.push(this.voterlist[i]);
      }
    }
    else {
      for (let i = 0; i < 50; i++) {
        if (this.admissionsfilteredlist.length > this.voterlist.length) {
          this.admissionsfilteredlist.push(this.selectedAdmissionsfilteredlist[i]);
        }
      }
    }
  }



}

export interface voterlist {

  Id: number
  IDCardNo: string
  SlNo: number
  PartNo: number;
  EName: string
  RName: string
  Age: number
  sex: string
  HouseNo: string
  Aadhaar: string
  ContactNo: string

}
