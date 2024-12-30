import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoterregistratoinPage } from './voterregistratoin.page';

const routes: Routes = [
  {
    path: '',
    component: VoterregistratoinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoterregistratoinPageRoutingModule {}
