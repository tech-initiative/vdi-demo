import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }  from './login/login.component';
import { AfterLoginGuard } from './after-login.guard';

const subRoutes: Routes = [
	{ 
	    path: '',
        component: LoginComponent,
        canActivate: [AfterLoginGuard]
	}	
];

@NgModule({
  imports: [ RouterModule.forChild(subRoutes) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule { 

    constructor() {
        console.log('AuthRoutingModule loaded');
    }
} 