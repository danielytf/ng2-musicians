import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MusiciansComponent }      from './musicians/musicians.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { MusicianDetailComponent }  from './musician-detail/musician-detail.component';

const routes: Routes = [
  { path: 'musicians', component: MusiciansComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: MusicianDetailComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {}