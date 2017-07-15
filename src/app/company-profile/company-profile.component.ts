import { Component, OnInit } from '@angular/core';
import { CompanyService } from './../services/company.service'
import {  AngularFireAuth } from 'angularfire2/auth';
import {Location} from '@angular/common';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  currentCompany;
  updateMode = false;
  constructor(private _CompanyService:CompanyService, private _AngularFireAuth: AngularFireAuth,private _location: Location,) {
    //if the user is not login then it will redirect to login form
    this._AngularFireAuth.authState.subscribe((auth) => {
        if (auth != null) {
          //this._Router.navigate(['/student-dashboard']);
        }
        else{
          this._location.back();
        }
    });
    this.currentCompany = _CompanyService.getCurrentUser();
  }

  ngOnInit() {
  }

  updateProfile(){
    this._CompanyService.updateProfile(this.currentCompany);
    this.updateMode = false;
  }

}
