import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { AuthorizationComponent } from './authorization/authorization.component';

import { MainComponent } from './main/main.component';
import { LoginOwnerComponent } from './login-owner/login-owner.component';
import { LoginRealtorComponent } from './login-realtor/login-realtor.component';
import { LoginCustomerComponent } from './login-customer/login-customer.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegistrationRealtorComponent } from './registration-realtor/registration-realtor.component';
import { RegistrationOwnerComponent } from './registration-owner/registration-owner.component';
import { RegistrationCustomerComponent } from './registration-customer/registration-customer.component';


const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "login", component: AuthorizationComponent },
  { path: "login-owner", component: LoginOwnerComponent },
  { path: "login-realtor", component: LoginRealtorComponent },
  { path: "login-customer", component: LoginCustomerComponent },
  { path: "login-admin", component: LoginAdminComponent },
  { path: "registration-realtor", component: RegistrationRealtorComponent },
  { path: "registration-owner", component: RegistrationOwnerComponent },
  { path: "registration-customer", component: RegistrationCustomerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
