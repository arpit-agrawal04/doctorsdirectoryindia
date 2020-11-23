import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { retry } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
  })
  export class DoctorListService {
    constructor(private apiservice: ApiService) { }
  getAvailableLoactions() {
  return this.apiservice.request('post', 'getAvailableLoactions', {});
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
  getDoctorList(data) {
    return this.apiservice.request('post', 'getDoctorList', data);
  }
  getDoctorBasicDetails(data) {
    return this.apiservice.request('post', 'getDoctorBasicDetails', data);
  }
  selectSlotForBooking(data) {
    return this.apiservice.request('post', 'selectSlotForBooking', data);
  }
  completeAppointment(data) {
    return this.apiservice.request('post', 'completeAppointment', data);
  }
  }
