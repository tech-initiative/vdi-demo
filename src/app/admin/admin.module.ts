import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { ProjectsService } from './projects/projects.service';
import { UsersService } from './users/users.service';

import { AdminuserComponent } from './adminuser/adminuser.component';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NgSelectModule
  ],
  providers: [
    ProjectsService,
    UsersService
  ],
  declarations: [
    AdminuserComponent, 
    ProjectsComponent, 
    UsersComponent
  ]
})
export class AdminModule { 
  constructor() {
    console.log('AdminModule loaded');
  }
}
