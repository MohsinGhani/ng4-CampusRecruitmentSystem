import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { CompanyLoginComponent } from './company-login/company-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { HomeComponent } from './home/home.component';

import { routing } from './app.routing'
import { StudentService } from './services/student.service'
import { CompanyService } from './services/company.service'
import { AdminService } from './services/admin.service'

//angular firebae needed
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule  } from 'angularfire2/auth';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentListComponent } from './student-list/student-list.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { AboutProjectComponent } from './about-project/about-project.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { CommentsComponent } from './comments/comments.component';
import { NavComponent } from './nav/nav.component';

//firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyBf1rEwX0Vj5J8V_OAXHoz6cz2WrCCgcXo",
    authDomain: "campusrecruitmentsystem-da62e.firebaseapp.com",
    databaseURL: "https://campusrecruitmentsystem-da62e.firebaseio.com",
    projectId: "campusrecruitmentsystem-da62e",
    storageBucket: "campusrecruitmentsystem-da62e.appspot.com",
    messagingSenderId: "469216933282"
}

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    StudentLoginComponent,
    CompanyLoginComponent,
    AdminDashboardComponent,
    StudentDashboardComponent,
    CompanyDashboardComponent,
    HomeComponent,
    StudentProfileComponent,
    StudentListComponent,
    CompanyProfileComponent,
    AboutProjectComponent,
    AboutMeComponent,
    CommentsComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [StudentService,CompanyService,AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
