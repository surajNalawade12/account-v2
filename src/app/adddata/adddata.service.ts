import { Injectable } from '@angular/core';
import { Response, RequestOptions } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
// import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/shared.service';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class AddDataService {

    constructor(
                private http: HttpClient,
                private sharedservice: SharedService
             ) {}
    // url = 'http://127.0.0.1:8000/api/account/';
    url = 'https://account-test-project.herokuapp.com/api/account/';

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Token ' + this.sharedservice.getToken()
        })
      };


    sendData(accNo: string, branch: string, accType: string, gendr: string) {
        return this.http.post(this.url, {
            accountNo: accNo,
            branch: branch,
            accountType: accType,
            gender: gendr
        },  this.httpOptions);
        // .map(
        //     (res: Response) => this.handleMeResponse(res)).catch(
        //         (err: Response) => this.handleMeError(err));
    }


    updateData(actid: string, accNo: string, branch: string, accType: string, gender: string) {
        return this.http.put(this.url + actid + '/', {
            accountNo: accNo,
            branch: branch,
            accountType: accType,
            gender: gender
        },  this.httpOptions);
        // .map(
        //     (res: Response) => this.handleMeResponse(res)).catch(
        //         (err: Response) => this.handleMeError(err));
    }

    private handleMeResponse(res: Response) {
        return res;
   }

   private handleMeError(err: Response) {
      // return Observable.throw(err);
   }
}
