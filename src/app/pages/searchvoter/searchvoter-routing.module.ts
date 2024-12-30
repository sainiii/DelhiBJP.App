import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchvoterPage } from './searchvoter.page';

const routes: Routes = [
  {
    path: '',
    component: SearchvoterPage
  },  {
    path: 'voterlist',
    loadChildren: () => import('./voterlist/voterlist.module').then( m => m.VoterlistPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchvoterPageRoutingModule {}
