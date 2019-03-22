import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderLeftmenuComponent } from './header-leftmenu/header-leftmenu.component';
import { AuthGuard } from './auth/auth.guard';
import { AfterLoginGuard } from './auth/after-login.guard';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    HeaderLeftmenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    AuthGuard,
    AfterLoginGuard,
    {provide: APP_BASE_HREF, useValue: '/'},
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
