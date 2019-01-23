import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
              // localStorage.setItem(AppSettings.USER_LOCAL_STORAGE_KEY, resp.data.token);
            } else {
              // console.log('Failed');
            }
          }
        )
      )
  }

}
