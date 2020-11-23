import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  doctorId: string;
  date = new Date().toISOString().split('T')[0];
  next7DateArray: any[];
  appointment: any;
  constructor( private userService: UserService) { }

  ngOnInit() {
   this.doctorId = localStorage.getItem('doctor_id');
   this.next7DateArray = [];
   const date2 = new Date();
   this.next7DateArray.push(new Date().toISOString().split('T')[0]);
   for (let j = 0 ; j < 6; j++) {
       this.next7DateArray.push(new Date(date2.setDate(date2.getDate() + 1)).toISOString().split('T')[0]);
   }
   this.getOpenAppointmentForDoctor(this.doctorId);
  }
  getOpenAppointmentForDoctor(doctorId) {
    this.userService.getOpenAppointmentForDoctor({doctorId, date: this.date}).subscribe(areg => {
      if (areg.success) {
        this.appointment = areg.message;
      }

    });
  }
  selectFilter(event) {
    this.date = event.target.value;
    this.getOpenAppointmentForDoctor(this.doctorId);

  }
  ChangeApointmentStatus(id, ev) {
    this.userService.ChangeApointmentStatus({appointment_id: id, status: ev.target.value}).subscribe(areg => {
      if (areg.success) {
        this.getOpenAppointmentForDoctor(this.doctorId);
      }
    });
  }
}
