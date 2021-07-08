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
import { FormsModule } from '@angular/forms'; 



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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
