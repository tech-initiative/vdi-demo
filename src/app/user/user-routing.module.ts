import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FrontUserComponent }  from './front-user/front-user.component';
import { AuthGuard } from '../auth/auth.guard';

const subRoutes: Routes = [
	{ 
	    path: 'dashboard',
      component: FrontUserComponent,
      canActivate: [AuthGuard]
	}	
];

@NgModule({
  imports: [ RouterModule.forChild(subRoutes) ],
  exports: [ RouterModule ]
})
export class UserRoutingModule { 

  constructor() {
    console.log('UserModule loaded');
  }
}
