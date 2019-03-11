import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../app.settings';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header-leftmenu',
  templateUrl: './header-leftmenu.component.html',
  styleUrls: ['./header-leftmenu.component.css']
})
export class HeaderLeftmenuComponent implements OnInit {

  public site_heading = AppSettings.SITE_HEADINNG;

  constructor(
    public appComponent: AppComponent, 
    private authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit() {
    console.log('Is logged in : ', this.appComponent.isLoggedIn$);
  }

  logout() {
    this.authService.userLogout();
    this.router.navigate(['/login']);
    swal({
      title: "Logout successful!",
      text: "Enter credentials below to sign back in.",
      type: 'success',
      showConfirmButton: true 
    });
  }

}
