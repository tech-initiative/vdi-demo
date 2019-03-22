import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AppSettings } from '../../app.settings';
import { catchError, map, tap } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  /* Get accounts list to show in drop down */
  getAccountsDropdown() {

    return this.http.get(
      AppSettings.API_ENDPOINT+'accounts'
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
    )
  }

  /* Fetch projects listing */
  getProjects(conditions) {

    return this.http.get(
      AppSettings.API_ENDPOINT+'projects'
    ).pipe(
      tap(
        (resp: any) => {
          console.log('Service data returned: ', resp);
        }
      ),
      catchError((e: any) => {
        console.log(e);
        return of(e);
      })
    );
  }

  /* Add project to DB */
  addProject(project) { 

    project.status = 1;
    project.accountId = parseInt(project.accountId);
    
    console.log('Add project service:', project); 

    return this.http.post(
      AppSettings.API_ENDPOINT+'projects', project
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
    )

    // return of({status: 1, msg: 'Success'});
  }
}
