import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title: string = 'Associate Manager';
  public loading: boolean = true;
  public isLoggedIn$: Observable<boolean>;
  public userDetails$: Observable<any>;

  constructor(private router: Router, private authService: AuthService) {
    this.loading = true;
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.userDetails$ = this.authService.userDetails();

    console.log("User details:", this.userDetails$);
  }

  ngAfterViewInit() {
    this.router.events
        .subscribe((event) => {
          if (event instanceof NavigationStart) {
            this.loading = true;
          } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
            this.loading = false;
          }
        })
  }
}
