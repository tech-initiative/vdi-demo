import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }  from './login/login.component';

const subRoutes: Routes = [
	{ 
	    path: '',
        component: LoginComponent
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