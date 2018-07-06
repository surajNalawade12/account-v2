import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class LoginService {

    constructor( private http: HttpClient) { }

    // url = 'http://127.0.0.1:8000/';
    url = 'https://account-test-project.herokuapp.com/';

    headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });

    loginData(user: string, pass: string) {
        return this.http.post(this.url + 'rest-auth/login/', { username: user, password: pass });
    }
}
