import { Component, OnInit } from '@angular/core';
import { CompanyService } from './../services/company.service'

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css']
})
export class CompanyLoginComponent implements OnInit {
  company = {email:'',password:'',type:'company',status:'active'};
  constructor(private _CompanyService: CompanyService) {
    //if the user is login then it will redirect to dashboard
    !_CompanyService.isLogin()

    //get all companys data
    _CompanyService.getCompanyData();
  }

  ngOnInit() {
  }

  SignIn() {
      this._CompanyService.companyLogin(this.company.email,this.company.password)
  }

  SignUp(){
      this._CompanyService.companySignUp(this.company);
  }

}
