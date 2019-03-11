import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AppSettings } from '../app.settings';
import { catchError, map, tap } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.userSessionExists());

  private userInfo = new BehaviorSubject<any>(this.userDetailsFromLS());

  constructor(private http: HttpClient) { }

  /** 
   * API Call to check user login credentials 
   */
  public userLogin(userData) {

    return this.http.post(
        AppSettings.API_ENDPOINT+'login', userData
      ).pipe(
        tap(
          (resp: any) => {
            console.log('Service Login response:', resp);
            if (resp.status == 0) {
              console.log('Login failed');
            } else {
              localStorage.setItem(AppSettings.USER_LOCAL_STORAGE_KEY, JSON.stringify(resp));
              this.userInfo.next(resp);
              this.loggedIn.next(true);
            } 
          }
        ),
        catchError((e: any) => {
          swal({
              title: "Error!",
              text: "Invalid Credentials. Please try again.",
              type: 'error',
              showConfirmButton: true     
          });
          return of(e);
        })       
      ); 
  }

  /** 
   * Check if user token exists 
   */
  private userSessionExists(): boolean {
    if (localStorage.getItem(AppSettings.USER_LOCAL_STORAGE_KEY)) {
      return true;
    }
    return false;
  }

  /** 
   * Get user details from local storage 
   */
  private userDetailsFromLS() {
    let usr = {};
    if (localStorage.getItem(AppSettings.USER_LOCAL_STORAGE_KEY)) {
      usr = JSON.parse(localStorage.getItem(AppSettings.USER_LOCAL_STORAGE_KEY));
    }
    return usr;
  }

  /** 
   * Return class variable loggedIn as observable 
   */
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  /** 
   * Return class variable userInfo as observable 
   */
  get userDetailsObs() {
    return this.userInfo.asObservable();
  }

  /** 
   * User logout function 
   */
  public userLogout() {
    localStorage.removeItem(AppSettings.USER_LOCAL_STORAGE_KEY);
    this.loggedIn.next(false);
    this.userInfo.next({});
  }
}
