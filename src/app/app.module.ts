import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { RegistrationComponent } from './registration/registration.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { MainComponent } from './main/main.component';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule } from "@angular/forms"; 



import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginOwnerComponent } from './login-owner/login-owner.component';
import { LoginRealtorComponent } from './login-realtor/login-realtor.component';
import { LoginCustomerComponent } from './login-customer/login-customer.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegistrationCustomerComponent } from './registration-customer/registration-customer.component';
import { RegistrationOwnerComponent } from './registration-owner/registration-owner.component';
import { RegistrationRealtorComponent } from './registration-realtor/registration-realtor.component';
import { CatalogRealtorsComponent } from './catalog-realtors/catalog-realtors.component';
import { RealtorComponent } from './realtor/realtor.component';
import { ProfileComponent } from './profile/profile.component';
import { CatalogRealtyComponent } from './catalog-realty/catalog-realty.component';
import { RealtyComponent } from './realty/realty.component';
import { CatalogServiceComponent } from './catalog-service/catalog-service.component';
import { ServiceComponent } from './service/service.component';
import { FilterService } from "./shared/pipe/filter-service.pipe";
import { FilterRealty } from "./shared/pipe/filter-realty.pipe";
import { RequestCallComponent } from './request-call/request-call.component';
import { ListCustomersComponent } from './list-customers/list-customers.component';
import { ListAgencyComponent } from './list-agency/list-agency.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddAgencyComponent } from './add-agency/add-agency.component';
import { SortPipe } from './shared/pipe/sort-pipe.pipe';
import { SortAbcPipe } from './shared/pipe/sort-abc.pipe';
import { SortAbcCustomersPipe } from './shared/pipe/sort-abc-customers.pipe';
import { RequestComponent } from './request/request.component';
import { ListRequestsComponent } from './list-requests/list-requests.component';
import { ListRealtorServiceComponent } from './list-realtor-service/list-realtor-service.component';
import { AddServiceComponent } from './add-service/add-service.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistrationComponent,
    AuthorizationComponent,
    MainComponent,
    LoginOwnerComponent,
    LoginRealtorComponent,
    LoginCustomerComponent,
    LoginAdminComponent,
    RegistrationCustomerComponent,
    RegistrationOwnerComponent,
    RegistrationRealtorComponent,
    CatalogRealtorsComponent,
    RealtorComponent,
    ProfileComponent,
    CatalogRealtyComponent,
    RealtyComponent,
    CatalogServiceComponent,
    ServiceComponent,
    FilterService,
    FilterRealty,
    SortPipe,
    SortAbcPipe,
    SortAbcCustomersPipe,
    RequestCallComponent,
    ListCustomersComponent,
    ListRequestsComponent,
    ListAgencyComponent,
    AddCustomerComponent,
    AddAgencyComponent,
    RequestComponent,
    ListRealtorServiceComponent,
    AddServiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    AngularFileUploaderModule,
    TextMaskModule,
    FormsModule,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
