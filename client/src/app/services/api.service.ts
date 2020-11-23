import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

/*
    interface for token
 */
interface TokenResponse {
  token?: string;
  success: boolean;
  message?: any;
  msg?: string;

}



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private subject = new Subject<any>();
  apiURL: string = environment.apiEndPoint;
  private token: string;
  constructor(private http: HttpClient,
              private router: Router) { }


  public getUserDetails(): any {
    const token = localStorage.getItem('token_in');
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  /*
      call for check the user session
   */
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      this.subject.next(true);
      return user.exp > Date.now() / 1000;
    } else {
      this.subject.next(false);
      localStorage.removeItem('token_in');
      return false;
    }
  }
  private saveToken(token: string): void {
    if (token != null) {
      localStorage.setItem('token_in', token);
      this.token = token;
      this.subject.next(true);
    } else {
      this.subject.next(false);
      localStorage.removeItem('token_in');
    }
  }
  private getToken(): string {

    if (!this.token) {
      this.token = localStorage.getItem('token_in');
    }
    return this.token;
  }
  public request(method: 'post' | 'get', type, user?): Observable<any> {


    let base;

    if (method === 'post') {
      // tslint:disable-next-line: max-line-length
      if (type === 'signup' || type === 'loginUser' || type === 'emailverify' || type === 'resendotp' || type === 'getActiveContestsForMain' || type === 'forgotpassword' || type === 'resetpassword' || type === 'signUpWithPlatform' || type === 'linkedinAuth' || type === 'googleAuth' || type === 'createNewAccountIfDelted' || type === 'getuserData') {
        base = this.http.post<any>(`${this.apiURL}auth/` + type, user);
      } else {
        base = this.http.post<any>(`${this.apiURL}users/` + type, user, {
          headers: { 'x-access-token': `Bearer ${this.getToken()}` }
        });

        // base = this.http.post<any>(`${this.apiURL}users/` + type, user);
      }
    } else {
      base = this.http.get<any>(`${this.apiURL}users/` + type, {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      });
    }
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data !== null && data.message && data.message.token) {
          this.saveToken(data.message.token);
          return data;
        } else if (data.success === false && data.msg === 'Invalid token') {
          this.saveToken(data.token);
          this.router.navigateByUrl('/');
          localStorage.clear();

        } else {
          return data;
        }

      })
    );
    return request;
  }
  getLoginUpdate(): Observable<any> {
    return this.subject.asObservable();
}
}
