import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';
import { UserDetailsService } from './userdetails.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  errInfo: any;
  is_error = false;
  data: any;
  msg = '';
  usernm = localStorage.getItem('username');
  nguname = '';
  ngfname = '';
  nglname = '';
  ngemail = '';
  pass = '';
  uid = '';

  constructor(
    private sharedservice: SharedService,
    private router: Router,
    private udService: UserDetailsService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    if (!this.sharedservice.isTokenExits()) {
      this.router.navigate(['/login']);
    }
    this.getID();
  }

  public getID() {
    this.uid = this.usersService.uid;
    if (this.uid === '') {
      this.router.navigate(['/users']);
      return;
    }
      this.udService.getUserDetails(this.uid)
        .subscribe(res => this.handleResponse(res),
          err => this.handleError(err)
        );
  }

  // save the data
  private saveData(username: string, fname: string, lname: string, email: string) {
    this.msg = 'successfully updated!';
    this.udService.updateData(this.uid, username, fname, lname, email, this.pass)
      .subscribe(res => this.handlePostResponse(res),
        err => this.handleError(err)
      );
  }

  public handlePostResponse(res: any) {
    this.is_error = false;
    this.data = res.results;
    this.sharedservice.showMsg(this.msg, 'success');
    this.msg = '';
    this.router.navigate(['/users']);
  }

  public handleResponse(res: any) {
    this.pass = res.password;
    this.nguname = res.username;
    this.ngfname = res.first_name;
    this.nglname = res.last_name;
    this.ngemail = res.email;
  }

  public handleError(err: any) {
    this.is_error = true;
    this.errInfo = err.error;
    console.log('err', err);
  }

  Logout() {
    this.sharedservice.logout();
  }

  private navigateAccount() {
    this.router.navigate(['/account']);
  }

  private navigateAdd() {
    this.router.navigate(['/add']);
  }

  private navigateallUsers() {
    this.router.navigate(['/users']);
  }
}
