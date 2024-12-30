import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElectionresultPage } from './electionresult.page';

const routes: Routes = [
  {
    path: '',
    component: ElectionresultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectionresultPageRoutingModule {}
