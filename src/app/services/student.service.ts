import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import {  AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router'
import { Location } from '@angular/common'

import * as firebase from 'firebase/app';

@Injectable()
export class StudentService {
  studentsData = [];
  studentKeys = [];
  companiesData = [];
  companiesKeys = [];
  jobs = [];
  currentUserEmail;
  currentUserData;
  currentUserKey;

  constructor(public _AngularFireAuth: AngularFireAuth, public _AngularFireDatabase: AngularFireDatabase, public _Router: Router,private _Location:Location) { }

  studentSignUp(myForms:any){
    firebase.auth().createUserWithEmailAndPassword(myForms.email, myForms.password).then((currentUser) => {
      //successfully login, create user profile
      myForms.name = "";
      myForms.semester = "";
      myForms.gpa = "";
      myForms.program = "";
      myForms.phone = "";
      firebase.database().ref('students').child(currentUser.uid).set(myForms);
    }).then((successfull) => {
            localStorage.setItem('currentUserEmail', myForms.email);
            this.storeCurrentUser();
            this._Router.navigate(['/student-dashboard']);
        }).catch(function(error) {
        // Handle Errors here.
        var errorMessage = error.message;
    });
  }

  studentLogin(email: string,password:string): any{
    this.studentsData.forEach((member, index)=>{
       if (email === member.email && member.status === 'active' ){
            //login authentication with firebase
            firebase.auth().signInWithEmailAndPassword(email, password).then((successfull) => {
                localStorage.setItem('currentUserEmail', email);
                this.storeCurrentUser();
                this._Router.navigate(['/student-dashboard']);
            }).catch(function(error) {
              // Handle Errors here.
              var errorMessage = error.message;
            });
       }
       else{
         if(member.status == 'de-active'){
          alert("Your Are blocked!");
         }
       }
    })   
  }

  studentlogout(){
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }).then((successfull) => {
        this._Router.navigate(['/student-login']);
    }).catch(function(error) {
        // An error happened.
    });
    localStorage.setItem('currentUserEmail', null);
    localStorage.setItem('currentUserKey', null);
    localStorage.setItem('currentUserData', null );
  }

  isLogin(){
    let currentUser = JSON.parse(localStorage.getItem("currentUserData")) || [];
    if(currentUser.type == "student" || currentUser.type == undefined){  
      this._AngularFireAuth.authState.subscribe((auth) => {
          if (auth != null) {
            this._Router.navigate(['/student-dashboard']);
          }
          else{
            this._Router.navigate(['/student-login']);
          }
      });
    }
    else{
      this._Location.back();
    }  
  }

  getStudents() {
      firebase.database().ref('/students/').on('child_added', (snapshot) => {
        this.studentsData.push(snapshot.val());
      });

      firebase.database().ref('/students/').on('child_added', (snapshot) => {
        this.studentKeys.push(snapshot.key);
      });
  }

  storeCurrentUser(){
    let i;
    this.currentUserEmail = localStorage.getItem('currentUserEmail');

    this.studentsData.forEach((member, index)=>{
       if(this.currentUserEmail == member.email){
         i = index;
       }
    })
    localStorage.setItem('currentUserData',JSON.stringify(this.studentsData[i]) );
    localStorage.setItem('currentUserKey', this.studentKeys[i]);
  }

  getCurrentUser(){
    let currentStudent:any;
    this.currentUserKey = localStorage.getItem('currentUserKey');
    currentStudent = JSON.parse(localStorage.getItem("currentUserData")) || [];
    return currentStudent;
  }

  updateProfile(studentData:Object){
    this.currentUserKey = localStorage.getItem('currentUserKey');
    firebase.database().ref('students').child(this.currentUserKey).set(studentData);
    localStorage.setItem('currentUserData',JSON.stringify(studentData) );
  }

  fetchCompanies(){
      firebase.database().ref('/company/').on('child_added', (snapshot) => {
        this.companiesData.push(snapshot.val());
      });
      firebase.database().ref('/company/').on('child_added', (snapshot) => {
        this.companiesKeys.push(snapshot.key);
      });
      return this.companiesData;
  }

  fetchJobs(index){
    let companyKey = this.companiesKeys[index];
    let companyJobs = [];
    firebase.database().ref('/jobs/' + companyKey + '/').on('child_added', (snapshot) => {
        companyJobs.push(snapshot.val());
    });
    return companyJobs;
  }  
}
