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
import { ProfileComponent } from './profile/profile.component';
import { CatalogRealtorsComponent } from './catalog-realtors/catalog-realtors.component';
import { CatalogRealtyComponent } from './catalog-realty/catalog-realty.component';
import { CatalogServiceComponent } from './catalog-service/catalog-service.component';

import { ListCustomersComponent } from './list-customers/list-customers.component';
import { ListAgencyComponent } from './list-agency/list-agency.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddAgencyComponent } from './add-agency/add-agency.component';
import { ListRequestsComponent } from './list-requests/list-requests.component';
import { ListRealtorServiceComponent } from './list-realtor-service/list-realtor-service.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { AddRealtyComponent } from './add-realty/add-realty.component';
import { ListRealtyComponent } from './list-realty/list-realty.component';


const routes: Routes = [
  { path: "", component: MainComponent },

  { path: "login", component: AuthorizationComponent },
  { path: "login-owner", component: LoginOwnerComponent },
  { path: "login-realtor", component: LoginRealtorComponent },
  { path: "login-customer", component: LoginCustomerComponent },
  { path: "login-admin", component: LoginAdminComponent },

  { path: "registration", component: RegistrationComponent },
  { path: "registration-realtor", component: RegistrationRealtorComponent },
  { path: "registration-owner", component: RegistrationOwnerComponent },
  { path: "registration-customer", component: RegistrationCustomerComponent },

  { path: "profile", component: ProfileComponent },

  { path: "catalog-realtors", component: CatalogRealtorsComponent },
  { path: "catalog-realty", component: CatalogRealtyComponent },
  { path: "catalog-service", component: CatalogServiceComponent },

  { path: "list-customers", component: ListCustomersComponent },
  { path: "list-agency", component: ListAgencyComponent },
  { path: "list-requests", component: ListRequestsComponent },
  { path: "list-requests/id_call", component: ListRequestsComponent },
  { path: "list-realtor-service", component: ListRealtorServiceComponent },
  { path: "list-realty", component: ListRealtyComponent },

  { path: "add-customer", component: AddCustomerComponent },
  { path: "add-agency", component: AddAgencyComponent },
  { path: "add-service", component: AddServiceComponent },
  { path: "add-realty", component: AddRealtyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
