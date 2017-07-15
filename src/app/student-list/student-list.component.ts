import { Component, OnInit } from '@angular/core';
import { CompanyService } from './../services/company.service'

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students = []; 
  studentDetail = {email:"", gpa:"", name:"", password:"", phone:"", program:"", semester:"", status:"", type:""};
  constructor(private _CompanyService: CompanyService) {
    this.students = _CompanyService.fetchStudents(); 
   }

  ngOnInit() {
  }

  logout(){
    this._CompanyService.companylogout();
  }

  showDetail(i){
    this.studentDetail = this.students[i]
  }

}
