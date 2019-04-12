import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminuserComponent }  from './adminuser/adminuser.component';
import { ProjectsComponent }  from './projects/projects.component';
import { UsersComponent }  from './users/users.component';
import { AuthGuard } from '../auth/auth.guard';

const subRoutes: Routes = [
	{ 
	    path: 'dashboard',
        component: AdminuserComponent,
        canActivate: [AuthGuard]
	},
    { 
	    path: 'projects',
        component: ProjectsComponent,
        canActivate: [AuthGuard]
    },
    { 
	    path: 'users',
        component: UsersComponent,
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