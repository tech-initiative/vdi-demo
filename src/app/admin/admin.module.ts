import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminuserComponent } from './adminuser/adminuser.component';

import { ProjectsService } from './projects/projects.service';
import { ProjectsComponent } from './projects/projects.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    ProjectsService
  ],
  declarations: [
    AdminuserComponent, 
    ProjectsComponent
  ]
})
export class AdminModule { 
  constructor() {
    console.log('AdminModule loaded');
  }
}
