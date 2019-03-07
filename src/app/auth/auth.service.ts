import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AppSettings } from '../app.settings';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.userSessionExists());

  // private userRole = new BehaviorSubject();

  constructor(private http: HttpClient) { }

  /* Check user login credentials */
  public userLogin(userData) {

    let userData1 = {
      "firstName" : "Indrasis",
      "lastName" : "Datta",
      "emailId" : "indrasis.datta@tcs.com"      
    };

    /* Send dummy response for development purpose */

    localStorage.setItem(AppSettings.USER_LOCAL_STORAGE_KEY, '1614190');
    this.loggedIn.next(true);

    // static code
    let userResp = {
      tcs_employee_id: "162323", 
      first_name: "Admin", 
      last_name: "User", 
      is_admin: userData.is_admin,
      roles: []
    };

    return of({status: 1, msg: 'Success', 'token': '1614190', 'userResp': userResp});

    /* Origial API call */

    /* return this.http.post(
        // AppSettings.API_ENDPOINT+'login', userData
        AppSettings.API_ENDPOINT+'employees', userData1
      ).pipe(
        tap(
          (resp: any) => {
            console.log('Service Login response:', resp);

            localStorage.setItem(AppSettings.USER_LOCAL_STORAGE_KEY, '1614190');
            this.loggedIn.next(true);

            // alert("E2E connection successful!");

            if (resp.status == 1) {
              localStorage.setItem(AppSettings.USER_LOCAL_STORAGE_KEY, resp.data.token);
              this.loggedIn.next(true);
            } else {
              // console.log('Failed');
            }
          }
        )       
      ); */
  }

  /* Check if user token exists */
  public userSessionExists(): boolean {
    return !!localStorage.getItem(AppSettings.USER_LOCAL_STORAGE_KEY);
  }

  /* If user is logged in, fetch user details from token */
  public userDetails() {
    let user_token = localStorage.getItem(AppSettings.USER_LOCAL_STORAGE_KEY);

    /* Send user_token - API call to back end and request for user details */

    // write http dynamic code here

    // static code
    let userResp = {
      tcs_employee_id: "162323", 
      first_name: "Test", 
      last_name: "User", 
      is_admin: 1,
      roles: []
    };

    return of(userResp); 
  }

  /* Return class variable loggedIn as observable */
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  /* User logout function */
  public userLogout() {
    localStorage.removeItem(AppSettings.USER_LOCAL_STORAGE_KEY);
    this.loggedIn.next(false);
  }
}
