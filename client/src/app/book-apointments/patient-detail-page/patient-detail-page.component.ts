import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorListService } from 'src/app/services/doctorList.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-detail-page',
  templateUrl: './patient-detail-page.component.html',
  styleUrls: ['./patient-detail-page.component.css']
})
export class PatientDetailPageComponent implements OnInit {
  PatientID: string;
  slotTime: any;
  aponitmentID: any;
  signUpForm = new FormGroup({

    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),

    email: new FormControl('', [Validators.required, Validators.email]),
  });
  errorMessage: any;
  successfulyRegister: boolean;
  plzFeelFieldCarefully: boolean;
  constructor(private router: Router, private doctorListService: DoctorListService) { }

  ngOnInit() {
   this.PatientID = this.router.url.split('patientDetails/')[1];
   if (this.PatientID) {
    // this.getDoctorBasicDetails(this.PatientID);
    this.slotTime = this.PatientID.split('/')[1];
    this.aponitmentID = this.PatientID.split('/')[0];
    } else {
      this.router.navigateByUrl('/');
    }
  }
  Submit() {
    this.plzFeelFieldCarefully = false;
    this.successfulyRegister = false;
    this.errorMessage = null;      this. signUpForm.markAllAsTouched();
    if (this. signUpForm.valid) {
      const data = this. signUpForm.value;
      data.aponitmentID = this.aponitmentID;
      this.doctorListService.completeAppointment(data).subscribe(arr => {
          if (arr.success) {
              this.successfulyRegister = true;
              setTimeout(() => {
                this.router.navigateByUrl('/');
              }, 1000);
          } else {
            this.errorMessage = arr.message;
            setTimeout(() => {
              this.router.navigateByUrl('/');
            }, 1000);
          }
        });
      } else {
        this.plzFeelFieldCarefully = true;
      }

     }

}
