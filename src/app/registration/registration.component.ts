import { Component, OnInit } from '@angular/core';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  errInfo: any;
  is_error = false;
  passmatch = '';

  constructor(
  private registrationService: RegistrationService,
  private router: Router,
  private sharedService: SharedService

) { }

  ngOnInit() {
    localStorage.removeItem('Detail_cookie');
  }

  sendUserCredentials(username: string, email: string, password: string) {
    this.registrationService.RegisterData(username, email, password).subscribe(
      data => this.handleMeResponse(data),
      err => this.handleMeError(err)
    );
  }

  private handleMeResponse(response: any) {
    this.is_error = false;
    this.sharedService.showMsg('user registered successfully', 'success');
    this.router.navigate(['/login']);

    //  this.cookieService.set( 'login_cookie', this.token );
    //  this.cookieValue = this.cookieService.get('login_cookie');
    //  console.log(this.cookieValue);
    //  this.router.navigate(['/account']);
  }

  private handleMeError(err: any) {
    this.is_error = true;
     this.errInfo = err.error;
  }
}
