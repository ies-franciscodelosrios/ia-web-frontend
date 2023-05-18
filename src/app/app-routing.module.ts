import { HasRoleGuard } from './helpers/has-role.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { QuestionarieComponent } from './components/questionarie/questionarie.component';
import { PollAssignmentsComponent } from './components/poll-assignments/poll-assignments.component';

const routes: Routes = [
  { 
    path: '',
    redirectTo:'login',
    pathMatch: 'full'
  },
  { 
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'q',
    component: QuestionarieComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {allowedRoles: ['SOCIO', 'EVALUADOR', 'ADMIN']},
  },
  { 
    path: 'pa',
    component: PollAssignmentsComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {allowedRoles: ['SOCIO', 'EVALUADOR', 'ADMIN']},
  },
  { 
    path: 'login/admin',
    component: LoginAdminComponent 
  },
  { 
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard, HasRoleGuard],
    data: {allowedRoles: ['SOCIO', 'EVALUADOR', 'ADMIN']},
  },
  { 
    path: 'profile',
    loadChildren: () => import('./components/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard, HasRoleGuard],
    data: {allowedRoles: ['SOCIO', 'EVALUADOR', 'ADMIN']} 
  },
  { 
    path: 'users',
    loadChildren: () => import('./components/useradmindashboard/useradmindashboard.module').then((m) => m.UseradmindashboardModule),
    canActivate: [AuthGuard, HasRoleGuard],
    data: {allowedRoles: ['ADMIN']},
  },
  { 
    path: 'admindashboard',
    loadChildren: () => import('./components/admindashboard/admindashboard.module').then((m) => m.AdmindashboardModule),
    canActivate: [AuthGuard, HasRoleGuard],
    data: {allowedRoles: ['ADMIN']} 
  },
  { 
    path: 'calendar',
    loadChildren: () => import('./components/calendar/calendar.module').then((m) => m.CalendarModule),
    canActivate: [AuthGuard, HasRoleGuard],
    data: {allowedRoles: ['SOCIO', 'EVALUADOR', 'ADMIN']} 
  },
  { 
    path: 'page-not-found',
    component: PageNotFoundComponent 
  },
  { 
    path: '**',
    redirectTo: '/page-not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {}
