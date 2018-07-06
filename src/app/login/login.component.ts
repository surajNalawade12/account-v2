import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
// import { CookieService } from 'ngx-cookie-service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errInfo: any;
  is_error = false;
  token: any;
  hide = true;
  // cookieValue = 'UNKNOWN';

  constructor(
              private loginService: LoginService,
              private router: Router,
              private sharedService: SharedService
    // private cookieService: CookieService,
    ) { }

  ngOnInit() {
     this.sharedService.logout();
  }

  sendUserCredentials(username: string, password: string) {
    localStorage.setItem('username', username);
    this.loginService.loginData(username, password).subscribe(
      data => this.handleMeResponse(data),
      err => this.handleMeError(err)
    );
  }

  private handleMeResponse(response: any) {
    localStorage.setItem('Detail_cookie', response.key);
    this.is_error = false;
    //  this.cookieService.set( 'login_cookie', this.token );
    //  this.cookieValue = this.cookieService.get('login_cookie');
    //  console.log(this.cookieValue);
     this.router.navigate(['/account']);
  }

  private handleMeError(err: any) {
    console.log('errr', err);
    this.is_error = true;
     this.errInfo = err.error;
    }
}
