import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class RegistrationService {

    constructor(private http: HttpClient) { }
    // url = 'http://127.0.0.1:8000/api/';
    url = 'https://account-test-project.herokuapp.com/api/';
    headers = new Headers({ 'Content-Type': 'application/json' });

    RegisterData(username: string, email: string, password: string) {
        return this.http.post(this.url + 'signup/', {
            username: username, eamil: email, password: password, is_staff: true
        });
    }
}
