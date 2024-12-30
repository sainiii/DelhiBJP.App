import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashbardPage } from './dashbard.page';

const routes: Routes = [
  {
    path: '',
    component: DashbardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashbardPageRoutingModule {}
