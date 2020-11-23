import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorListService } from '../services/doctorList.service';

@Component({
  selector: 'app-book-apointments',
  templateUrl: './book-apointments.component.html',
  styleUrls: ['./book-apointments.component.css']
})
export class BookApointmentsComponent implements OnInit {
  DoctorID: string;
  doctor: any;
  noOfSlotsPerday: number;
  slotArray: any;
  next7DateArray: any;

  constructor(private router: Router, private doctorListService: DoctorListService) { }

  ngOnInit() {
   this.DoctorID = this.router.url.split('bookingPage/')[1];
   if (this.DoctorID) {
    this.getDoctorBasicDetails(this.DoctorID);
    } else {
      this.router.navigateByUrl('/');
    }
  }

  // tslint:disable-next-line: variable-name
  getDoctorBasicDetails(doctor_id) {
    this.doctorListService.getDoctorBasicDetails({doctor_id}).subscribe(arg => {
      if (arg.success) {
        this.doctor = arg.message;
        this.slotArray = arg.slotArray;
        this.next7DateArray = arg.next7DateArray;
        setTimeout(() => {
          this.doctor.appointment.forEach(element => {

            if (element.appointment_status === null) {
              document.getElementById(element.appointment_date).
              setAttribute('style', 'background-color: #db940e;color: white;cursor: not-allowed;');
            } else {
              document.getElementById(element.appointment_date).
              setAttribute('style', 'background-color: #db0e0e;color: white;cursor: not-allowed;');
            }


          });
        }, 200);

      }
    });
  }
  selectSlot(date) {
    this.doctorListService.selectSlotForBooking({date, doctor_id: this.DoctorID}).subscribe(arg => {
      if (arg.success) {
        this.router.navigateByUrl('/patientDetails/' + arg.message + '/' + date);
       } else {
        this.getDoctorBasicDetails(this.DoctorID);
      }
    });
  }
}
