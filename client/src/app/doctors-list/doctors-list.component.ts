import { Component, OnInit } from '@angular/core';
import { DoctorListService } from '../services/doctorList.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {
  locationArray: any = [];
  avalablity: any;
  sepcialityid: any;
  location: any = 'All';
  doctorList: any;
  constructor(private doctorListService: DoctorListService) { }

  ngOnInit() {
    this.getAvailableLoactions();
    this.getDoctorList();
  }
  getAvailableLoactions() {
    this.doctorListService.getAvailableLoactions().subscribe(arg => {
      if ( arg.success ) {
        this.locationArray = arg.message;
      }
    });
  }
  selectFilter(Filterfor , event) {
    if (Filterfor === 'avalablity') {
      this.avalablity = event.target.value;
    } else if (Filterfor === 'sepcialityid') {
      this.sepcialityid = event.target.value;
    } else if (Filterfor === 'location') {
      this.location = event.target.value;
    }
  }
  getDoctorList() {
    this.doctorListService.getDoctorList({avalablity: this.avalablity, sepcialityid: this.sepcialityid,
      location: this.location}).subscribe(arg => {
      if ( arg.success ) {
        this.doctorList = arg.message;
      }
    });
  }
}
