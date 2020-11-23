import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-monthly-history-reports',
  templateUrl: './monthly-history-reports.component.html',
  styleUrls: ['./monthly-history-reports.component.css']
})
export class MonthlyHistoryReportsComponent implements OnInit {
  filter: any = 'Appointment Summary Report';
  doctorId: string;
  appointment: any;

  constructor( private userService: UserService) { }

  ngOnInit() {
    this.doctorId = localStorage.getItem('doctor_id');
    this.getHistoryReportsForDoctor(this.doctorId);
  }
  getHistoryReportsForDoctor(doctorId) {
    this.userService.getHistoryReportsForDoctor({doctorId, filter: this.filter}).subscribe(areg => {
      if (areg.success) {
        this.appointment = areg.message;
      }

    });
  }
  selectFilter(event) {
    this.filter = event.target.value;
    this.getHistoryReportsForDoctor(this.doctorId);
  }
}
