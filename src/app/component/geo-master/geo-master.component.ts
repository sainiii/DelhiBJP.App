import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { LoaderService } from 'src/app/services/loader.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-geo-master',
  templateUrl: './geo-master.component.html',
  styleUrls: ['./geo-master.component.scss'],
})
export class GeoMasterComponent  implements OnInit {


  statelist: any = [];
districtlist: any = [];
citylist: any = [];
locationlist: any = [];
selectedState: any = null;
selectedDistrict: any = null;
selectedCity: any = null;
selectedLocaiton: any = null;
selectedBID: any = null;
@Input() showvalue: number=0;
@Output() outStateId: number=0;
@Output() myGEOID: EventEmitter<string> = new EventEmitter();
  sectorBlocklist: any[]=[];

  constructor(private loaderService: LoaderService,
    private data: DataSharingService,
    private router: Router,
    private httpService: ApiService,
    private storageService: StorageService,
    private toastService: ToastService,) { }


    ngOnInit(): void {

   
      this.getStatelist('NA', 1);
 
       if (localStorage['selectedState']as string) {
         this.selectedState = JSON.parse(localStorage['selectedState']as string);
         this.getdistrictlist(this.selectedState);
  
       }
       if (localStorage['selectedDistrict']as string) {
         this.selectedDistrict = JSON.parse(localStorage['selectedDistrict']as string);
         this.getcitylist(this.selectedDistrict);
  
       }
  
       if (localStorage['selectedCity']as string) {
         this.selectedCity = JSON.parse(localStorage['selectedCity']as string);
         this.getlocationlist(this.selectedCity);
  
       }
       if (localStorage['selectedLocaiton']as string) {
         this.selectedLocaiton = JSON.parse(localStorage['selectedLocaiton']as string);
         this.getlocationid(this.selectedLocaiton);
      }
      this.loaderService.hideLoader();
  
    }
  
    sendValues() {
      
    }  
  getStatelist(findtext: string, SId: number) {

   
      this.httpService.post( '/api/State/StateListSearchbyName', { "FindName": findtext, "CID": SId })
        .subscribe((x: any) => {
       
          this.statelist = x.Data[0]
          if (this.showvalue === 2) {
            this.myGEOID.emit(this.selectedState);
          }
           
        }, (error: any) => {
          console.log(error);
       
          this.toastService.presentToast('Some error occured. Please try again.');
        });
    }
  
    getdistrictlist(SId:number) {
      if (SId === 0) {
        this.citylist = [];
        return
      }
    
      this.httpService.post( '/api/District/DistrictList', { "FindName": 'NA', "StateId": SId })
        .subscribe((x: any) => {
         
          this.districtlist = x.Data[0]
  
          localStorage.setItem('selectedState', this.selectedState)
          
          if (this.showvalue === 2) {
  
            this.myGEOID.emit(this.selectedState);
          }
        }, (error: any) => {
          console.log(error);
        
          this.toastService.presentToast('Some error occured. Please try again.');
        });
    }
    getcitylist(id: any) {
      if (id === "null") {
        this.citylist = [];
        this.locationlist = [];
        this.myGEOID.emit("null");
        return
      }
  
    this.httpService.post('/api/City/CityList', { "FindName": 'NA', "DID": id })
      .subscribe((x: any) => {
      
          this.citylist = x.Data[0]
          localStorage.setItem('selectedDistrict', this.selectedDistrict)
          if (this.showvalue === 3) {
            this.myGEOID.emit(this.selectedDistrict);
          }
  
          
        }, (error :any) => {
          console.log(error);
 
          this.toastService.presentToast('Some error occured. Please try again.');
        });
    }
    getlocationlist(id: any) {
      this.locationlist = [];
      
      this.httpService.post('/api/Location/LocationListSearchbyName', { "FindName": 'NA', "CityID": id })
        .subscribe((x: any) => {

         
          this.locationlist = x.Data[0]
          
          localStorage.setItem('selectedCity', this.selectedCity)
          if (this.showvalue === 4) {
            this.myGEOID.emit(this.selectedCity);
          }
      
         
        }, (error : any) => {
          console.log(error);
 
          this.toastService.presentToast('Some error occured. Please try again.');
        });
  
    }
    getlocationid(id:any) {
       
  
      this.sectorBlocklist = [];
 
      this.httpService.post('/api/SectorBlock/SectorBlockListSearchbyName', { "FindName": 'NA', "LocationID": id })
        .subscribe((x: any) => {
         
          this.sectorBlocklist = x.Data[0]
        
          localStorage.setItem('selectedLocaiton', id)
          if (this.showvalue === 5) {
            this.myGEOID.emit(this.selectedLocaiton);
          }
  
  
        }, (error :any) => {
          console.log(error);
          
          this.toastService.presentToast('Some error occured. Please try again.');
        });
      //localStorage.setItem('selectedLocaiton', id)
      //if (this.showvalue === 5) {
      //  this.myGEOID.emit(id);
      //}
       
    }
  
    getsectorBlocklistid(id: any) {
      if (this.showvalue === 6) {
        this.myGEOID.emit(id);
      }
    }

}
