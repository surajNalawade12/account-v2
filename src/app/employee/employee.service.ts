import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class EmployeeService {

    constructor(private http: Http) {}
    url = 'http://127.0.0.1:8000/api/employee/';
    headers = new Headers({ 'Content-Type': 'application/json'});
    options = new RequestOptions({ headers: this.headers });

    getEmployeeDetails() {
        return this.http.get(this.url, this.options);
    }
}
