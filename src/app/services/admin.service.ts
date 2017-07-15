import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import {  AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import * as firebase from 'firebase/app';

@Injectable()
export class AdminService {
  studentsKeys = [];
  studentsData = [];
  companiesData = [];
  companiesKeys = [];
  companyKey; //get current company key for perform some operation
  constructor(public _AngularFireAuth: AngularFireAuth, public _AngularFireDatabase: AngularFireDatabase, public _Router: Router,private _Location:Location) { }

  adminLogin(login): any{
       if (login.id == "admin@gmail.com" && login.password == "admin123" && login.type == "admin"){
            //login authentication with firebase
            firebase.auth().signInWithEmailAndPassword(login.id, login.password).then((successfull) => {
                localStorage.setItem('currentUserEmail', login.id);
                localStorage.setItem('currentUserData',JSON.stringify(login) );
                this._Router.navigate(['/admin-dashboard']);
            }).catch(function(error) {
              // Handle Errors here.
              var errorMessage = error.message;
            });
       }
       else{
          alert("Your are not Admin!");
       }
  }

  logout(){
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }).then((successfull) => {
        this._Router.navigate(['/admin']);
    }).catch(function(error) {
        // An error happened.
    });
    localStorage.setItem('currentUserEmail', null);
    localStorage.setItem('currentUserKey', null);
    localStorage.setItem('currentUserData', null );
  }

  isLogin(){
    let currentUser:any;
    currentUser = JSON.parse(localStorage.getItem("currentUserData")) || [];
    if(currentUser.type == "admin") {
    this._AngularFireAuth.authState.subscribe((auth) => {
        if (auth != null) {
          this._Router.navigate(['/admin-dashboard']);
        }
        else{
          //this._Router.navigate(['/admin-login']);
          this._Location.back();
        }
      });
    }
    else{
      this._Location.back();
    }
  }
  
  isloginAuth(){
    let currentUser:any;
    currentUser = JSON.parse(localStorage.getItem("currentUserData")) || [];;
    if(currentUser.type == null) {
    this._AngularFireAuth.authState.subscribe((auth) => {
        if (auth != null) {
          this._Router.navigate(['/admin-dashboard']);
        }
        else{
          this._Router.navigate(['/admin']);
        }
      });
    }
    else{
      this._Location.back();
    }
  }

  fetchStudents(){
      firebase.database().ref('/students/').on('child_added', (snapshot) => {
        this.studentsData.push(snapshot.val());
      });
      firebase.database().ref('/students/').on('child_added', (snapshot) => {
        this.studentsKeys.push(snapshot.key);
      });
      return this.studentsData;
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

  blockStudent(index,data){
    let studentKey = this.studentsKeys[index];
    data.status = "de-active"
    firebase.database().ref('students').child(studentKey).set(data);
  }

  unBlockStudent(index,data){
    let studentKey = this.studentsKeys[index];
    data.status = "active"
    firebase.database().ref('students').child(studentKey).set(data);
  }

  blockCompany(index,data){
    let companyKey = this.companiesKeys[index];
    data.status = "de-active"
    firebase.database().ref('company').child(companyKey).set(data);
  }

  unBlockCompany(index,data){
    let companyKey = this.companiesKeys[index];
    data.status = "active"
    firebase.database().ref('company').child(companyKey).set(data);
  }

  fetchJobs(index){
    this.companyKey = this.companiesKeys[index];
    let companyJobs = [];
    firebase.database().ref('/jobs/' + this.companyKey + '/').on('child_added', (snapshot) => {
        companyJobs.push(snapshot.val());
    });
    return companyJobs;
  }

  deleteJob(index){
    let companykeys = [];
    //get all company keys
    firebase.database().ref('/jobs/' + this.companyKey).on('child_added', (snapshot) => {
        companykeys.push(snapshot.key);
    });
    
    //delete job
    firebase.database().ref('/jobs/' + this.companyKey + '/').child(companykeys[index]).remove();
  }
}
