import { Injectable } from '@angular/core';
import { Response, RequestOptions } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/shared.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class UsersService {

    uid = '';
    constructor(
        private http: HttpClient,
        private sharedservice: SharedService,
        private router: Router
    ) { }
    // url = 'http://127.0.0.1:8000/api/user/';
    url = 'https://account-test-project.herokuapp.com/api/user/';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.sharedservice.getToken()
        })
    };

    getUserDetails() {
        return this.http.get(this.url, this.httpOptions);
    }

    updateData(username: string, fname: string, lname: string, email: string) {
        return this.http.put(this.url + '/', {
            username: username,
            first_name: fname,
            last_name: lname,
            email: email,
        }, this.httpOptions).map(
            (res: Response) => this.handleMeResponse(res)).catch(
                (err: Response) => this.handleMeError(err));
    }

    deleteRecord(id: string) {
        return this.http.delete(this.url + id + '/', this.httpOptions);
    }

    private handleMeResponse(res: Response) {
        return res;
    }

    private handleMeError(err: Response) {
        return Observable.throw(err);
    }

    SearchAccountDeatils(name: string) {
        return this.http.get(this.url + '?search=' + name, this.httpOptions).map(
            (res: Response) => this.handleMeResponse(res)).catch(
                (err: Response) => this.handleMeError(err));
    }

    updated(id: string) {
        this.uid = id;
        this.router.navigate(['/userdetails']);
    }
}
