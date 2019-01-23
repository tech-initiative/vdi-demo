import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../app.settings';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-header-leftmenu',
  templateUrl: './header-leftmenu.component.html',
  styleUrls: ['./header-leftmenu.component.css']
})
export class HeaderLeftmenuComponent implements OnInit {

  public site_heading = AppSettings.SITE_HEADINNG;

  constructor(public appComponent: AppComponent) { }

  ngOnInit() {
    console.log('Is logged in : ', this.appComponent.isLoggedIn$);
  }

}
