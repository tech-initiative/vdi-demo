import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../app.settings';

@Component({
  selector: 'app-header-leftmenu',
  templateUrl: './header-leftmenu.component.html',
  styleUrls: ['./header-leftmenu.component.css']
})
export class HeaderLeftmenuComponent implements OnInit {

  public site_heading = AppSettings.SITE_HEADINNG;

  constructor() { }

  ngOnInit() {
  }

}
