import { Component, OnInit } from '@angular/core';
import { StudentService } from './../services/student.service'

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {
  student = {email:'',password:'',type:'student',status:'active'};
  constructor( private _StudentService: StudentService) {
    //if the user is login then it will redirect to dashboard
    _StudentService.isLogin()

    //get all students data
    _StudentService.getStudents();
  }

  ngOnInit() {}

  SignIn() {
      this._StudentService.studentLogin(this.student.email,this.student.password)
  }

  SignUp(){
      this._StudentService.studentSignUp(this.student);
  }
}
