import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  token: string;
  constructor(
              private router: Router,
              private toastr: ToastrService,
  ) {
    this.token = '';
  }

  isTokenExits() {
    this.token = localStorage.getItem('Detail_cookie');
    if (this.token !== null) {
        return true;
    } else {
        return false;
    }
  }

  getToken() {
    try {
    return localStorage.getItem('Detail_cookie');
  } catch {
      console.log('token not exits!');
    }
  }

  logout() {
    localStorage.removeItem('Detail_cookie');
    this.router.navigate(['/login']);
  }

  showMsg(msg: string, header: string) {
    this.toastr.success(msg, header);
  }
}
