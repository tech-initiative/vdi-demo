import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AppSettings } from '../../app.settings';
import { catchError, map, tap } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  /* Add user to DB */
  addUser(user) { 

    return this.http.post(
      AppSettings.API_ENDPOINT+'users/save', user
    ).pipe(
      tap(
        (resp: any) => {
          console.log(resp);
        }
      ),
      catchError((e: any) => {
        console.log(e);
        return of(e);
      })
    );
  }
}
