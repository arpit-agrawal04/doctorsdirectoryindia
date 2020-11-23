import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  pageOn: string;
  islogined: any = false;
  constructor(private router: Router, private apiservice: ApiService) {
    this.apiservice.getLoginUpdate().subscribe(arg => {
      this.islogined = arg;
      this.pageOn = this.router.url;
    });
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.pageOn = this.router.url;
    }, 200);

  }
  clicked() {
    this.pageOn = this.router.url;
    console.log(this.pageOn, 'pageOn');
  }
  logout(){
    this.islogined = false;
    localStorage.removeItem('token_in');
    this.router.navigateByUrl('/doctorsLogin');
  }
}
