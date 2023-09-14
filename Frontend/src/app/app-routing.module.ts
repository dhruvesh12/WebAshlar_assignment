import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { LoginComponent } from './Component/login/login.component';
import { RegisterUserComponent } from './Component/register-user/register-user.component';
import { authGuardGuard } from './Service/auth-guard.guard';

const routes: Routes = [
{
  path:'login',
  component:LoginComponent,
  canActivate:[authGuardGuard]
},
{
  path:'register',
  component:RegisterUserComponent
},
{
  path:'',
  component:DashboardComponent,
  canActivate:[authGuardGuard]
  
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
