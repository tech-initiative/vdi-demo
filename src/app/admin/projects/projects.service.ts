import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    );
  }

  /* Edit project to DB */
  editProject(project) { 

    project.status = 1;
    project.accountId = parseInt(project.accountId);
    
    console.log('Edit project service:', project); 

    return this.http.put(
      AppSettings.API_ENDPOINT+'projects/'+project.id, project
    ).pipe(
      tap(
        (resp: any) => {
          console.log('Success resp for edit project service:', resp);
        }
      ),
      catchError((e: any) => {
        console.log(e);
        return of(e);
      })
    );
  }

  /* Delete project from DB */
  deleteProject(id) { 

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        accountId: 999,
        isActive: true,
        status: 1
      }
    };

    return this.http.delete(
      AppSettings.API_ENDPOINT+'projects/'+id, 
      options
    ).pipe(
      tap(
        (resp: any) => {
          console.log('Success resp for delete project service:', resp);
        }
      ),
      catchError((e: any) => {
        console.log("Error: ", e);
        return of(e);
      })
    );
  }
}
