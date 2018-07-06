import { Component, OnInit } from '@angular/core';
import { AddDataService } from './adddata.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { AccountService } from '../account/account.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-adddata',
  templateUrl: './adddata.component.html',
  styleUrls: ['./adddata.component.css']
})
export class AdddataComponent implements OnInit {

  errInfo: any;
  is_error = false;
  data: any;
  ngacno = '';
  ngbn = '';
  ngat = '';
  acntId = '';
  gend = '';
  ngmale = '';
  ngfemale = '';
  msg = '';
  srch = '';
  username = localStorage.getItem('username');

  constructor(
              private addDataService: AddDataService,
              private router: Router,
              private accountService: AccountService,
              private sharedservice: SharedService
            ) { }

  ngOnInit() {
    this.saveDefault();
    this.getID();
    if ( !this.sharedservice.isTokenExits()) {
      this.router.navigate(['/login']);
    }
  }

  // when save data clear the textbox
  private saveDefault() {
    this.ngacno = this.ngat = this.ngbn = this.gend = this.ngmale = this.ngfemale = null;
  }

  // search data
  private getSearchData(name: string) {
    this.accountService.SearchAccountDeatils(name)
      .subscribe(res => this.handleSearchResponse(res),
        err => this.handleError(err)
      );
  }

  // save the data
  private saveData(accNo: string, branch: string, accType: string) {
    if (this.acntId === '') {
      this.msg = 'successfully saved!';
      this.addDataService.sendData(accNo, branch, accType, this.gend)
        .subscribe(res => this.handlePostResponse(res),
          err => this.handleError(err)
        );
    } else if (this.acntId !== '') {
      this.msg = 'successfully updated!';
      this.addDataService.updateData(this.acntId, accNo, branch, accType, this.gend)
        .subscribe(res => this.handlePostResponse(res),
          err => this.handleError(err)
        );
    }
  }

  public handlePostResponse(res: any) {
    this.is_error = false;
    this.data = res.results;
    this.saveDefault();
    this.acntId = '';
    this.sharedservice.showMsg(this.msg, 'success');
    this.msg = '';
    this.router.navigate(['/account']);
  }

  public handleError(err: any) {
    this.is_error = true;
    this.errInfo =  err.error;
    console.log('error is', err);
  }

  public handleSearchResponse(res: any) {
    this.data = res.results;
  }
  public getID() {
    this.ngacno = this.accountService.acNo;
    this.ngbn = this.accountService.branch;
    this.ngat = this.accountService.acType;
    this.acntId = this.accountService.acid;
    this.gend = this.accountService.gen;
    if (this.gend === 'M') {
      this.ngmale = this.gend;
    } else {
      this.ngfemale = this.gend;
    }
  }

  Logout() {
    this.sharedservice.logout();
  }

  private clearSearch() {
    this.srch = '';
  }

  private navigateAccount() {
    this.router.navigate(['/account']);
  }

  private navigateAdd() {
    this.router.navigate(['/add']);
  }

  private setradio(gender: string) {
    this.gend = gender;
  }

  private navigateUserDetails() {
    this.router.navigate(['/userdetails']);
  }

  private navigateallUsers() {
    this.router.navigate(['/users']);
  }
}
