import { Component, OnInit } from '@angular/core';
import { StudentService } from './../services/student.service'

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  jobs;
  companies = [];
  companyDetail = {name:"",email:"",address:"",phone:"",status:"",type:""};
  index;

  companyListMode = true;
  jobsMode = false;
  profileMode = false;
  constructor(private _StudentService: StudentService) {
    //if the user is not login then it will redirect to login form
    _StudentService.isLogin()
    //this.jobs = _StudentService.fetchJobs();
  }

  ngOnInit() {
    this.companies = this._StudentService.fetchCompanies();
  }

  logout(){
    this._StudentService.studentlogout();
  }

  showCompanyDetail(i){
    this.index = i;
    this.companyDetail = this.companies[i]
  }

  getJobs(index){
    this.companyListMode = false;
    this.jobsMode = true;
    this.profileMode = false;
    this.jobs = this._StudentService.fetchJobs(index);
    this.companyDetail = this.companies[index]
  }

  hideJobs(){
    this.companyListMode = true;
    this.jobsMode = false;
    this.profileMode = false;
  }

  showProfile(){
    this.companyListMode = false;
    this.jobsMode = false;
    this.profileMode = true;
  }

  showJobs(){
    this.companyListMode = true;
    this.jobsMode = false;
    this.profileMode = false;
  }

}
