import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashbard/dashbard.module').then(m => m.DashbardPageModule)
      },
      {
        path: 'searchvoter',
        loadChildren: () => import('../searchvoter/searchvoter.module').then(m => m.SearchvoterPageModule)
      }
      
      ,
      {
        path: 'attendance',
        loadChildren: () => import('../attandance/attandance.module').then(m => m.AttandancePageModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('../notifications/notifications.module').then(m => m.NotificationsPageModule)
      },
      {
        path: 'electionresult',
        loadChildren: () => import('../electionresult/electionresult.module').then(m => m.ElectionresultPageModule)
      },
      {
        path: 'bothwise',
        loadChildren: () => import('../bothwise/bothwise.module').then(m => m.BothwisePageModule)
      },
      {
        path: 'voterregistratoin',
        loadChildren: () => import('../voterregistratoin/voterregistratoin.module').then(m => m.VoterregistratoinPageModule)
      },
      {
        path: 'shaktiKendera',
        loadChildren: () => import('../shakti-kendera/shakti-kendera.module').then(m => m.ShaktiKenderaPageModule)
      }
    ]

  }
  ,
  {
    path: 'searchvoter/:Id',
    loadChildren: () => import('../searchvoter/voterlist/voterlist.module').then(m => m.VoterlistPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule { }
