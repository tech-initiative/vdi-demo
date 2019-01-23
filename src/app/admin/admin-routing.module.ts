import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminuserComponent }  from './adminuser/adminuser.component';

const subRoutes: Routes = [
	{ 
	    path: 'dashboard',
      component: AdminuserComponent
	}	
];

@NgModule({
  imports: [ RouterModule.forChild(subRoutes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule { 

    constructor() {
        console.log('AdminRoutingModule loaded');
    }
} 