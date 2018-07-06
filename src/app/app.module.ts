import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { AccountService } from './account/account.service';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeService } from './employee/employee.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!
import { CookieService } from 'ngx-cookie';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import { AdddataComponent } from './adddata/adddata.component';
import { AddDataService } from './adddata/adddata.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationService } from './registration/registration.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './login/token.interceptor';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { UserDetailsService } from './userdetails/userdetails.service';
import { UsersComponent } from './users/users.component';
import { UsersService } from './users/users.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    EmployeeComponent,
    LoginComponent,
    AdddataComponent,
    RegistrationComponent,
    UserdetailsComponent,
    UsersComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatTooltipModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot ([
      { path: '', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
      { path: 'account', component: AccountComponent },
      { path: 'employee', component: EmployeeComponent },
      { path: 'add', component: AdddataComponent },
      { path: 'userdetails', component: UserdetailsComponent },
      { path: 'users', component: UsersComponent}

    ])
  ],
  providers: [AccountService,
              EmployeeService,
              LoginService,
              CookieService,
              AddDataService,
              RegistrationService,
              UsersService,
              UserDetailsService,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: TokenInterceptor,
                multi: true
              }
            ],
  bootstrap: [AppComponent]
})
export class AppModule {}
