import { Component, OnInit } from '@angular/core';
import { CompanyService } from './../services/company.service'
import {FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent implements OnInit {
  myForms : FormGroup;
  myPostedJobs = [];
  editJobData = {title:"",description:""};
  jobsMode = true;
  addJobsModes = false;
  studentListMode = false;
  profileMode = false;
  index;
  students = []; 
  studentDetail = {email:"", gpa:"", name:"", password:"", phone:"", program:"", semester:"", status:"", type:""};

  constructor(private _CompanyService: CompanyService,private _FormBuilder: FormBuilder) {
    //if the user is not login then it will redirect to login form
    _CompanyService.isLogin();
    // reactive form
    this.myForms = _FormBuilder.group({
      "title": ["", Validators.compose([Validators.required])],
      "description": ["", Validators.compose([Validators.required])],
    })
    this.getJobs();
  }

  ngOnInit() {
    //console.log('current User Id ' + localStorage.getItem('currentUserEmail'));
    this._CompanyService.getCompanyData();
    this.students = this._CompanyService.fetchStudents(); 
  }

  logout(){
    this._CompanyService.companylogout();
  }

  addPost(){
    //console.log(this.myForms.value);
    this._CompanyService.addJob(this.myForms.value);
    this.myForms.reset();
    this.jobsMode = true;
    this.addJobsModes = false;
    this.studentListMode = false;
    this.profileMode = false;
  }

  getJobs(){
    this.myPostedJobs =this._CompanyService.fetchJobs();
  }

  showDetail(i){
    this.studentDetail = this.students[i];
  }

  showJobsForm(){
    this.jobsMode = false;
    this.addJobsModes = true;
    this.studentListMode = false;
    this.profileMode = false;
  }

  showJobs(){
    this.jobsMode = true;
    this.addJobsModes = false;
    this.studentListMode = false;
    this.profileMode = false;
  }

  showStudentList(){
    this.jobsMode = false;
    this.addJobsModes = false;
    this.studentListMode = true;
    this.profileMode = false;
  }

  showProfile(){
    this.jobsMode = false;
    this.addJobsModes = false;
    this.studentListMode = false;
    this.profileMode = true;
  }

  deleteJob(index){
    this._CompanyService.deleteJob(index)
    //delete item from myPostedJobs array
    this.myPostedJobs.splice(index, 1);
  }

  showModal(index){
    this.index = index;
    this.editJobData = this.myPostedJobs[index];
  }

  editJob(){
    this._CompanyService.editJob(this.index,this.editJobData)
  }

}
