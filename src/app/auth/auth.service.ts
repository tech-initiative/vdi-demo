import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AppSettings } from '../app.settings';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.userSessionExists());

  constructor(private http: HttpClient) { }

  /* Check user login credentials */
  public userLogin(userData) {
    return this.http.post(
        AppSettings.API_ENDPOINT+'login', userData
      ).pipe(
        tap(
          (resp: any) => {
            console.log('Login response:', resp);
            if (resp.status == 1) {
              localStorage.setItem(AppSettings.USER_LOCAL_STORAGE_KEY, resp.data.token);
            } else {
              // console.log('Failed');
            }
          }
        )
      )
  }

  /* Check if user token exists */
  public userSessionExists(): boolean {
    return !!localStorage.getItem(AppSettings.USER_LOCAL_STORAGE_KEY);
  }

  /* Return class variable loggedIn as observable */
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

}
