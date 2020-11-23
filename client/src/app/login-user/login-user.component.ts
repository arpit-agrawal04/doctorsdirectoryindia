import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { getSyntheticPropertyName } from '@angular/compiler/src/render3/util';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  loginpage = true;
  loginForm = new FormGroup({

    password: new FormControl('', [Validators.required, Validators.minLength(6)]),

    email: new FormControl('', [Validators.required, Validators.email]),

});
signUpForm = new FormGroup({

  name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),

  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  doctorType: new FormControl([]),
  time_slot_duration : new FormControl('', Validators.required),
  day_start_time: new FormControl('', Validators.required),
  day_end_time: new FormControl('', Validators.required),
  city: new FormControl('', Validators.required),
  state: new FormControl('', Validators.required)

});
  plzFeelFieldCarefully: boolean;
  stateArray: any = [];
  cityArray: any = [];
  successfulyRegister: boolean;
  errorMessage: any;
  constructor(private router: Router, private userService: UserService) { }
 
  ngOnInit() {
    this.getstateDetails();
  }
  getstateDetails() {
    this.userService.getstateDetails().subscribe(arr => {
      if (arr.success) {
        this.stateArray = arr.message;
      }

    });
  }
  getCitiesList(event) {
  
    this.userService.getCitiesList({stateId:event.target.value}).subscribe(arr => {
      if (arr.success) {
        this.cityArray = arr.message;
      }

    });

  }
  signup() {
    this.loginpage = ! this.loginpage;
    this.signUpForm.value.doctorType = []
    this.plzFeelFieldCarefully = false;
  }
  Submit() {
    this.plzFeelFieldCarefully = false;
    this.successfulyRegister = false;
    this.errorMessage = null;
    if (this.loginpage === true) {
      this.loginForm.markAllAsTouched();
      if (this.loginForm.valid) {
        this.userService.loginUser(this.loginForm.value).subscribe(arr => {
          if (arr.success) {
              console.log(arr.message);
              localStorage.setItem('doctor_id', arr.message.userData.doctor_id);
              this.successfulyRegister = true;
              this.router.navigateByUrl('/doctorsDashboard');
          } else {
            this.errorMessage = arr.message;
          }
        })
      } else {
        this.plzFeelFieldCarefully = true;
      }

     } else {
      this.signUpForm.markAllAsTouched();
      console.log(this.signUpForm.value,this.signUpForm);
      if (this.signUpForm.valid && this.signUpForm.value.doctorType.length > 0 ) {
        this.stateArray
        .forEach(element => {
          if (element.id === this.signUpForm.value.state) {
            this.signUpForm.value.state = element.name;
          }
        });

        this.userService.signup(this.signUpForm.value).subscribe(arr => {
          if (arr.success) {
              this.successfulyRegister = true;
          } else {
            this.errorMessage = arr.message;
          }
        })

      } else {
        this.plzFeelFieldCarefully = true;
      }
    }
  }
  selectSpecialization(event) {
    if (this.signUpForm.value.doctorType.indexOf(event.target.value) > - 1) {
      this.signUpForm.value.doctorType.splice(this.signUpForm.value.doctorType.indexOf(event.target.value), 1);
    } else {
      this.signUpForm.value.doctorType.push(event.target.value);
    }
  }
}
