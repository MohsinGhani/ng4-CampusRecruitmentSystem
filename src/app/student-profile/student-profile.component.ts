import { Component, OnInit } from '@angular/core';
import { StudentService } from './../services/student.service'
import {  AngularFireAuth } from 'angularfire2/auth';
import {Location} from '@angular/common';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  currentStudent;
  updateMode = false;
  constructor(private _StudentService: StudentService,public _AngularFireAuth: AngularFireAuth,private _location: Location) {
    //if the user is not login then it will redirect to login form
    this._AngularFireAuth.authState.subscribe((auth) => {
        if (auth != null) {
          //this._Router.navigate(['/student-dashboard']);
        }
        else{
          this._location.back();
        }
    });
    this.currentStudent = _StudentService.getCurrentUser();
  }

  ngOnInit() {
  }

  logout(){
    this._StudentService.studentlogout();
  }

  updateProfile(){
    //console.log(this.currentStudent);
    this._StudentService.updateProfile(this.currentStudent);
    this.updateMode = false;
  }

}
