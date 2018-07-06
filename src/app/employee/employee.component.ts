import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  data: any;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
  }

  private getEmployeeData() {
    this.employeeService.getEmployeeDetails()
      .subscribe(res => this.responseHandle(res),
        err => this.getError(err)
      );
  }

  private responseHandle(res: any) {
    this.data = JSON.parse(res._body).results;
    console.log('responeHandle => ', this.data);
  }

  private getError(err: any) {
    console.log('errorResponseHandle => ', err);
  }

}
