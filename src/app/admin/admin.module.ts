import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminuserComponent } from './adminuser/adminuser.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [AdminuserComponent]
})
export class AdminModule { 
  constructor() {
    console.log('AdminModule loaded');
  }
}
