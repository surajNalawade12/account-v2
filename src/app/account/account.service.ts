import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { ComponentFixture } from '@angular/core/testing';
import { Conditional } from '@angular/compiler';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class AccountService {

    acid = '';
    acNo = '';
    branch = '';
    acType = '';
    gen = '';

    constructor(
                private http: HttpClient,
                private router: Router,
                private sharedservice: SharedService
            ) {

    }

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Token ' + this.sharedservice.getToken()
        })
      };

    // url = 'http://127.0.0.1:8000/api/account/';
    url = 'https://account-test-project.herokuapp.com/api/account';

    // simple http module
    // headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Token ' + this.sharedservice.getToken() });
    // options = new RequestOptions({ headers: this.headers });

    getAccountDetails () {
        return this.http.get(this.url, this.httpOptions);
      }
    SearchAccountDeatils(name: string) {
        return this.http.get(this.url + '?search=' + name, this.httpOptions).map(
            (res: Response) => this.handleMeResponse(res)).catch(
                (err: Response) => this.handleMeError(err));
    }

    sendData(accNo: string, branch: string, accType: string) {
        return this.http.post(this.url, {
            accountNo: accNo,
            branch: branch,
            accountType: accType
        },  this.httpOptions).map(
            (res: Response) => this.handleMeResponse(res)).catch(
                (err: Response) => this.handleMeError(err));
    }


    deleteAccountRecord(id: string) {
        return this.http.delete(this.url + id + '/', this.httpOptions);
    }
    private handleMeResponse(res: Response) {
        return res;
    }

    private handleMeError(err: Response) {
        return Observable.throw(err);
    }

    updated(actid: string, accNo: string, branch: string, accType: string, gen: string) {
        this.acid = actid;
        this.acNo = accNo;
        this.branch = branch;
        this.acType = accType;
        this.gen = gen;
        this.router.navigate(['/add']);
    }
}
