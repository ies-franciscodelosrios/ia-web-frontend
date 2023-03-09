import { HasRoleGuard } from './helpers/has-role.guard';
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
import { NgbdTablePagination } from './components/ngbd-table-pagination/ngbd-table-pagination.component';

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'login/admin', component: LoginAdminComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard, HasRoleGuard], data: {allowedRoles: ['SOCIO', 'EVALUADOR', 'ADMIN']} },
  { path: 'admin/home', component: HomeAdminComponent, canActivate: [AuthGuard, HasRoleGuard], data: {allowedRoles: ['ADMIN']} },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard, HasRoleGuard], data: {allowedRoles: ['SOCIO', 'EVALUADOR', 'ADMIN']} } ,
  { path: 'admindashboard/user', component: UseradmindashboardComponent, canActivate: [AuthGuard, HasRoleGuard], data: {allowedRoles: ['ADMIN']} } ,
  { path: 'admindashboard', component: AdmindashboardComponent, canActivate: [AuthGuard, HasRoleGuard], data: {allowedRoles: ['ADMIN']} } ,
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard, HasRoleGuard], data: {allowedRoles: ['SOCIO', 'EVALUADOR', 'ADMIN']} } ,
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'table', component: NgbdTablePagination },
  { path: '**',  redirectTo: '/page-not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {}
