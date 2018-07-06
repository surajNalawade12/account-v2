import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  errInfo: any;
  is_error = false;
  data: any;
  msg = '';
  delId = '';
  username = localStorage.getItem('username');

  constructor(
    private sharedservice: SharedService,
    private router: Router,
    private userService: UsersService
  ) { }

  ngOnInit() {
    if (!this.sharedservice.isTokenExits()) {
      this.router.navigate(['/login']);
    }
    this.getUserDetails();
  }

  private getUserDetails() {
    this.userService.getUserDetails()
      .subscribe(res => this.handleResponse(res),
        err => this.handleError(err)
      );
  }

  public setDeleteId(id: string) {
    this.delId = id;
  }

  // for update
  private upadte_data(id: string) {
    this.userService.updated(id);
  }

  public handlePostResponse(res: any) {
    this.is_error = false;
    this.data = res.results;
    this.sharedservice.showMsg(this.msg, 'success');
    this.msg = '';
    this.router.navigate(['/account']);
  }

  private handleResponse(res: any) {
    this.data = res.results;
  }

  public handleError(err: any) {
    this.is_error = true;
    this.errInfo = err.error;
  }

  public deleteData() {
    this.userService.deleteRecord(this.delId).subscribe(
      data => this.handleDeleteResponse(data),
      err => this.handleError(err)
    );
  }

  // handle delete response
  public handleDeleteResponse(res: any) {
    this.data = res;
    this.sharedservice.showMsg('successfully deleted!', 'success');
    this.getUserDetails();
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

  // search data
  private getSearchData(name: string) {
    this.userService.SearchAccountDeatils(name)
      .subscribe(res => this.handleSearchResponse(res),
        err => this.handleSearchError(err)
      );
  }

  public handleSearchResponse(res: any) {
    this.data = res.results;
  }

  private handleSearchError(err: any) {
    if (err.status === 401) {
      this.router.navigate(['/login']);
    }
  }
}
