import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { UserDashboardComponent } from './login-user/user-dashboard/user-dashboard.component';
import { MonthlyHistoryReportsComponent } from './login-user/monthly-history-reports/monthly-history-reports.component';
import { BookApointmentsComponent } from './book-apointments/book-apointments.component';
import { PatientDetailPageComponent } from './book-apointments/patient-detail-page/patient-detail-page.component';
import { CheckBookingHistoryComponent } from './book-apointments/check-booking-history/check-booking-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, /* other http imports */ } from "@angular/common/http";
@NgModule({
  declarations: [
    AppComponent,
    DoctorsListComponent,
    LoginUserComponent,
    UserDashboardComponent,
    MonthlyHistoryReportsComponent,
    BookApointmentsComponent,
    PatientDetailPageComponent,
    CheckBookingHistoryComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
