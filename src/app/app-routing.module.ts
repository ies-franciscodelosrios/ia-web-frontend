import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AuthGuard } from './helpers/auth.guard';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { UseradmindashboardComponent } from './components/useradmindashboard/useradmindashboard.component';

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'login/admin', component: LoginAdminComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'admin/home', component: HomeAdminComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] } ,
  { path: 'admindashboard/user', component: UseradmindashboardComponent, canActivate: [AuthGuard] } ,
  { path: 'admindashboard', component: AdmindashboardComponent, canActivate: [AuthGuard] } ,
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] } ,
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**',  redirectTo: '/page-not-found', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {}
