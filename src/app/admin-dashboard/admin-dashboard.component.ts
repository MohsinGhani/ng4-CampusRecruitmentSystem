import { Component, OnInit } from '@angular/core';
import { AdminService } from './../services/admin.service'

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  students = [];
  companies = [];
  studentDetail = {email:"", gpa:"", name:"", password:"", phone:"", program:"", semester:"", status:"", type:""};
  companyDetail = {name:"",email:"",address:"",phone:"",status:"",type:""};
  index;
  isBlock = false;
  jobs = [];
  //set modes for hide and show companies and students data
  studentListMode = true;
  companyListMode = false;
  jobsMode = false;
  constructor(private _AdminService: AdminService) {
    _AdminService.isLogin();
  }

  ngOnInit() {
    this.students = this._AdminService.fetchStudents();
    this.companies = this._AdminService.fetchCompanies();
  }

  logout(){
    this._AdminService.logout();
  }

  showDetail(i){
    this.index = i;
    this.studentDetail = this.students[i]
    if( this.studentDetail.status == 'de-active'){
      this.isBlock = true;
    }
    else{
      this.isBlock = false;
    }
  }

  showCompanyDetail(i){
    this.index = i;
    this.companyDetail = this.companies[i]
    if( this.companyDetail.status == 'de-active'){
      this.isBlock = true;
    }
    else{
      this.isBlock = false;
    }
  }

  blockStudent(){
    this._AdminService.blockStudent(this.index,this.studentDetail);
  }

  unBlockStudent(){
    this._AdminService.unBlockStudent(this.index,this.studentDetail);
  }

  blockCompany(){
    this._AdminService.blockCompany(this.index,this.companyDetail);
  }

  unBlockCompany(){
    this._AdminService.unBlockCompany(this.index,this.companyDetail);
  }

  showCompanyList(){
    this.companyListMode = true;
    this.studentListMode = false;
    this.jobsMode = false;
  }

  showStudentList(){
    this.companyListMode = false;
    this.studentListMode = true;
    this.jobsMode = false;
  }

  getJobs(index){
    this.companyListMode = false;
    this.studentListMode = false;
    this.jobsMode = true;
    this.jobs = this._AdminService.fetchJobs(index);
  }

  hideJobs(){
    this.companyListMode = true;
    this.studentListMode = false;
    this.jobsMode = false;
  }

  deleteJob(index){
    this._AdminService.deleteJob(index);
    //delete item from myPostedJobs array
    this.jobs.splice(index, 1);
  }

}
