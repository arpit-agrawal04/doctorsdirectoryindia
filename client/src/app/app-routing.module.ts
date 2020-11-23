import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookApointmentsComponent } from './book-apointments/book-apointments.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { CheckBookingHistoryComponent } from './book-apointments/check-booking-history/check-booking-history.component';
import { PatientDetailPageComponent } from './book-apointments/patient-detail-page/patient-detail-page.component';
import { UserDashboardComponent } from './login-user/user-dashboard/user-dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { MonthlyHistoryReportsComponent } from './login-user/monthly-history-reports/monthly-history-reports.component';
const routes: Routes = [
  { path: '', component: DoctorsListComponent },
  { path: 'doctorsLogin', component: LoginUserComponent },
  { path: 'doctorsDashboard',  canActivate: [AuthGuardService], component: UserDashboardComponent },
  { path: 'userReports',  canActivate: [AuthGuardService], component: MonthlyHistoryReportsComponent },
  { path: 'appointmentStatus', component: CheckBookingHistoryComponent },
  { path: 'bookingPage/:id', component: BookApointmentsComponent },
  { path: 'patientDetails/:id/:date', component: PatientDetailPageComponent },
  { path: '**', component: DoctorsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
