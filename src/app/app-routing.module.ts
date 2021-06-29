import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { AuthorizationComponent } from './authorization/authorization.component';

import { MainComponent } from './main/main.component';
import { LoginOwnerComponent } from './login-owner/login-owner.component';
import { LoginRealtorComponent } from './login-realtor/login-realtor.component';
import { LoginCustomerComponent } from './login-customer/login-customer.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';


const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "login", component: AuthorizationComponent },
  { path: "login-owner", component: LoginOwnerComponent },
  { path: "login-realtor", component: LoginRealtorComponent },
  { path: "login-customer", component: LoginCustomerComponent },
  { path: "login-admin", component: LoginAdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
