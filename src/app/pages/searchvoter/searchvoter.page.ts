import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchvoter',
  templateUrl: './searchvoter.page.html',
  styleUrls: ['./searchvoter.page.scss'],
})
export class SearchvoterPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }
  selectedLocaiton: any = '0';
  sectorBlocklist: any;

  GetIdData(data: any) {

  
    this.selectedLocaiton = data;
    
    if (this.selectedLocaiton === null) {
      this.sectorBlocklist = [];
    }
    else {
      this.router.navigate(['/admin/searchvoter/'+this.selectedLocaiton ], { replaceUrl: true });

    }
  
  }
}
