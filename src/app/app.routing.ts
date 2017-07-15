import { Routes, RouterModule,Router } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { AdminLoginComponent } from './admin-login/admin-login.component'
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'
import { StudentLoginComponent } from './student-login/student-login.component'
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component'
import { CompanyLoginComponent } from './company-login/company-login.component'
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component'
import { AboutProjectComponent } from './about-project/about-project.component'
import { AboutMeComponent } from './about-me/about-me.component'
import { CommentsComponent } from './comments/comments.component'

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'admin', component: AdminLoginComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    { path: 'student-login', component: StudentLoginComponent },
    { path: 'student-dashboard', component: StudentDashboardComponent },
    { path: 'company-login', component: CompanyLoginComponent },
    { path: 'company-dashboard', component: CompanyDashboardComponent },
    { path: 'about-project', component: AboutProjectComponent },
    { path: 'about-me', component: AboutMeComponent },
    { path: 'comments', component: CommentsComponent },
    {path:'**', component: HomeComponent}
];

export const routing = RouterModule.forRoot(appRoutes);