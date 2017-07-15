import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import {  AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router'
import { Location } from '@angular/common'

import * as firebase from 'firebase/app';

@Injectable()
export class CompanyService {

  companyData = [];
  companyKeys = [];
  currentUserJobs = [];
  currentUserEmail;
  currentUserData;
  currentUserKey;
  constructor(public _AngularFireAuth: AngularFireAuth, public _AngularFireDatabase: AngularFireDatabase, public _Router: Router, private _Location: Location) { }

  companySignUp(myForms:any){
    firebase.auth().createUserWithEmailAndPassword(myForms.email, myForms.password).then((currentUser) => {
      //successfully login, create user profile
      myForms.name = "";
      myForms.address = "";
      myForms.phone = "";
      firebase.database().ref('company').child(currentUser.uid).set(myForms);
    }).then((successfull) => {
            localStorage.setItem('currentUserEmail', myForms.email);
            this.storeCurrentUser();
            this._Router.navigate(['/company-dashboard']);
        }).catch(function(error) {
        // Handle Errors here.
        var errorMessage = error.message;
    });
    this.companyLogin(myForms.email, myForms.password);
  }

  companyLogin(email: string,password:string): any{
    this.companyData.forEach((member, index)=>{
       if (email === member.email && member.status === 'active' ){
            //login authentication with firebase
            firebase.auth().signInWithEmailAndPassword(email, password).then((successfull) => {
                localStorage.setItem('currentUserEmail', email);
                this.storeCurrentUser();
                this._Router.navigate(['/company-dashboard']);
            }).catch(function(error) {
              // Handle Errors here.
              var errorMessage = error.message;
            });
       }
       else{
          //alert(email + ' it is not a student Email');
       }
    })  
  }

  companylogout(){
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }).then((successfull) => {
        this._Router.navigate(['/company-login']);
    }).catch(function(error) {
        // An error happened.
    });
    localStorage.setItem('currentUserEmail', null);
    localStorage.setItem('currentUserKey', null);
    localStorage.setItem('currentUserData', null );
    this.currentUserJobs = [];
  }

  isLogin(){
    let currentUser = JSON.parse(localStorage.getItem("currentUserData")) || [];
    if(currentUser.type == "company" || currentUser.type == undefined){  
      this._AngularFireAuth.authState.subscribe((auth) => {
          if (auth != null) {
            this._Router.navigate(['/company-dashboard']);
          }
          else{
            this._Router.navigate(['/company-login']);
          }
      });
    }
    else{
      this._Location.back();
    }  
  }

  getCompanyData() {
      firebase.database().ref('/company/').on('child_added', (snapshot) => {
        this.companyData.push(snapshot.val());
      });

      firebase.database().ref('/company/').on('child_added', (snapshot) => {
        this.companyKeys.push(snapshot.key);
      });
  }

  storeCurrentUser(){
    let i;
    this.currentUserEmail = localStorage.getItem('currentUserEmail');

    this.companyData.forEach((member, index)=>{
       if(this.currentUserEmail == member.email){
         i = index;
       }
    })
    localStorage.setItem('currentUserData',JSON.stringify(this.companyData[i]) );
    localStorage.setItem('currentUserKey', this.companyKeys[i]);
  }

  addJob(job:any){
    this.currentUserKey = localStorage.getItem('currentUserKey');
    this.currentUserEmail = localStorage.getItem('currentUserEmail');
    job.email = this.currentUserEmail;
    firebase.database().ref('jobs').child(this.currentUserKey).push(job);
  }

  fetchJobs(){
    this.currentUserKey = localStorage.getItem('currentUserKey');
      firebase.database().ref('/jobs/' + this.currentUserKey + '/').on('child_added', (snapshot) => {
        this.currentUserJobs.push(snapshot.val());
      });
      return this.currentUserJobs;
  }

  fetchStudents(){
    let studentsData = [];
    //let studentKeys = [];
      firebase.database().ref('/students/').on('child_added', (snapshot) => {
        studentsData.push(snapshot.val());
      });

      return studentsData;
  }

  getCurrentUser(){
    let currentCompany:any;
    this.currentUserKey = localStorage.getItem('currentUserKey');
    currentCompany = JSON.parse(localStorage.getItem("currentUserData")) || [];
    return currentCompany;
  }

  updateProfile(data:Object){
    this.currentUserKey = localStorage.getItem('currentUserKey');
    firebase.database().ref('company').child(this.currentUserKey).set(data);
    localStorage.setItem('currentUserData',JSON.stringify(data) );
  }

  deleteJob(index){
    let keys = [];
    let currentJobKey;
      this.currentUserKey = localStorage.getItem('currentUserKey');
      //fetch current user jobs keys
      firebase.database().ref('/jobs/' + this.currentUserKey + '/').on('child_added', (snapshot) => {
        keys.push(snapshot.key);
      });
    currentJobKey = keys[index]
    firebase.database().ref('jobs/' + this.currentUserKey).child(currentJobKey).remove();
  }

  editJob(index,data){
    this.currentUserKey = localStorage.getItem('currentUserKey');
    let keys = [];
    let currentJobKey;
      this.currentUserKey = localStorage.getItem('currentUserKey');
      //fetch current user jobs keys
      firebase.database().ref('/jobs/' + this.currentUserKey + '/').on('child_added', (snapshot) => {
        keys.push(snapshot.key);
      });
    currentJobKey = keys[index]
    firebase.database().ref('jobs/' + this.currentUserKey).child(currentJobKey).set(data);
  }

}
