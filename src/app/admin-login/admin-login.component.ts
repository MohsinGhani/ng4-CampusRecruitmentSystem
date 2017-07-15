import { Component, OnInit } from '@angular/core';
import { AdminService } from './../services/admin.service'

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  user = {id:'',password:'',type:'admin'};
  constructor(private _AdminService: AdminService) {
    _AdminService.isloginAuth();
  }

  ngOnInit() {
  }

  login(){
    this._AdminService.adminLogin(this.user);
  }

}
