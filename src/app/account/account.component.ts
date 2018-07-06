import { Component, OnInit, TemplateRef } from '@angular/core';
import { AccountService } from './account.service';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
// import { Sharedservice} from '../'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
  data: any;
  acntId = '';
  delId = '';
  message = '';
  ngsrch = '';
  username = localStorage.getItem('username');

  constructor(
    private accountService: AccountService,
    private router: Router,
    private sharedservice: SharedService
  ) { }

  ngOnInit() {
    if (!this.sharedservice.isTokenExits()) {
      this.router.navigate(['/login']);
    }
      this.getAccountData();
  }

  // get request
  private getAccountData() {
    if (!this.sharedservice.isTokenExits()) {
      this.router.navigate(['/login']);
    }
    this.accountService.getAccountDetails()
      .subscribe(res => this.handleResponse(res),
        err => this.handleError(err)
      );
  }

  // search data
  private getSearchData(name: string) {
    console.log('under serch');
    this.accountService.SearchAccountDeatils(name)
      .subscribe(res => this.handleSearchResponse(res),
        err => this.handleSearchError(err)
      );
  }

  // store id for delete record
  public setDeleteId(id: string) {
    this.delId = id;
  }

  // delete data
  public deleteData() {
    this.accountService.deleteAccountRecord(this.delId).subscribe(
      data => this.handleDeleteResponse(data),
      err => this.handleError(err)
    );
  }

  // for update
  private upadte_data(id: string, accNo: string, branch: string, accType: string, gender: string) {
    this.accountService.updated(id, accNo, branch, accType, gender);
  }

  // handle delete response
  public handleDeleteResponse(res: any) {
    this.data = res;
    this.sharedservice.showMsg('successfully deleted!', 'success');
    this.getAccountData();
  }

  private handleResponse(res: any) {
    this.data = res.results;
  }

  public handleError(err: any) {
    console.log('error is', err);
  }
  public handleSearchResponse(res: any) {
    this.data = res.results;
  }

  private handleSearchError(err: any) {
    if (err.status === 401) {
      this.router.navigate(['/login']);
    }
  }

  Logout() {
    this.sharedservice.logout();
  }

  private clearSearch() {
    this.ngsrch = '';
    this.getAccountData();
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
