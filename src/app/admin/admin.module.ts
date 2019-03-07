import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminuserComponent } from './adminuser/adminuser.component';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AdminuserComponent, ProjectsComponent]
})
export class AdminModule { 
  constructor() {
    console.log('AdminModule loaded');
  }
}
