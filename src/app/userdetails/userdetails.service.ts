import { Injectable } from '@angular/core';
import { Response, RequestOptions } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/shared.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class UserDetailsService {

    constructor(
        private http: HttpClient,
        private sharedservice: SharedService
    ) { }
    // url = 'http://127.0.0.1:8000/api/user/';
    url = 'https://account-test-project.herokuapp.com/api/user/';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.sharedservice.getToken()
        })
    };

    getUserDetails(uid: string) {
        return this.http.get(this.url + uid + '/', this.httpOptions);
    }

    updateData(uid: string, username: string, fname: string, lname: string, email: string, pass: string) {
        return this.http.put(this.url + uid + '/' , {
            password: pass,
            username: username,
            first_name: fname,
            last_name: lname,
            email: email,
        }, this.httpOptions).map(
            (res: Response) => this.handleMeResponse(res)).catch(
                (err: Response) => this.handleMeError(err));
    }

    private handleMeResponse(res: Response) {
        return res;
    }

    private handleMeError(err: Response) {
        return Observable.throw(err);
    }
}
