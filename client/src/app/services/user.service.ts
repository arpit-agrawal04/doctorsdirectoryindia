import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { retry } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    constructor(private apiservice: ApiService) { }
  getstateDetails() {
  return this.apiservice.request('post', 'getstateDetails', {});
  }
  getCitiesList(data) {
    return this.apiservice.request('post', 'getCitiesList', data);
  }
  signup(data) {
      return this.apiservice.request('post', 'signup', data);
  }
  loginUser(data) {
    return this.apiservice.request('post', 'loginUser', data);
  }
  getOpenAppointmentForDoctor(data) {
    return this.apiservice.request('post', 'getOpenAppointmentForDoctor', data);
  }
  ChangeApointmentStatus(data) {
    return this.apiservice.request('post', 'ChangeApointmentStatus', data);
  }
  getHistoryReportsForDoctor(data) {
    return this.apiservice.request('post', 'getHistoryReportsForDoctor', data);
  }
  }
