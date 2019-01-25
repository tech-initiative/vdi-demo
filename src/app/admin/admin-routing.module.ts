import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminuserComponent }  from './adminuser/adminuser.component';
import { AuthGuard } from '../auth/auth.guard';

const subRoutes: Routes = [
	{ 
	    path: 'dashboard',
        component: AdminuserComponent,
        canActivate: [AuthGuard]
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