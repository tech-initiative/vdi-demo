import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderLeftmenuComponent } from './header-leftmenu/header-leftmenu.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderLeftmenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
