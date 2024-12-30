import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoterlistPage } from './voterlist.page';

const routes: Routes = [
  {
    path: '',
    component: VoterlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoterlistPageRoutingModule {}
