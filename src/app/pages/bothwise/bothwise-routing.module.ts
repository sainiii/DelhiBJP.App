import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BothwisePage } from './bothwise.page';

const routes: Routes = [
  {
    path: '',
    component: BothwisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BothwisePageRoutingModule {}
