import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShaktiKenderaPage } from './shakti-kendera.page';

const routes: Routes = [
  {
    path: '',
    component: ShaktiKenderaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShaktiKenderaPageRoutingModule {}
