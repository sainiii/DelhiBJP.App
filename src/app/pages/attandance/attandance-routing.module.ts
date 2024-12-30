import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttandancePage } from './attandance.page';

const routes: Routes = [
  {
    path: '',
    component: AttandancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttandancePageRoutingModule {}
