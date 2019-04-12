import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectsService } from '../projects/projects.service';
import { UsersService } from '../users/users.service';

import swal from 'sweetalert2';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  addForm: FormGroup;

  all_projects: any;
  all_accounts: any;

  constructor(
    private projectService: ProjectsService, 
    private usersService: UsersService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) { 
    this.createAddForm();
  }

  sampleData = [
    {id: 1, name: 'Account 1'},
    {id: 2, name: 'Account 2'},
    {id: 3, name: 'Account 3'}
  ];

  seats = [
    {id: 1, name: '3D1 1'},
    {id: 2, name: '3D1 2'},
    {id: 3, name: '3D1 3'},
    {id: 4, name: '3D1 4'},
    {id: 5, name: '3D1 5'}
  ];

  locations = [
    {id: 1, name: 'Kolkata'},
    {id: 2, name: 'Pune'},
    {id: 3, name: 'Chennai'},
    {id: 4, name: 'Bangalore'},
  ];

  users = [
    {
      id:1,
      firstName:"Res1",
      lastName:"Last1",
      email:"res1@tcs.com",
      password:"12345",
      tcsEmployeeId:"163431",
      clientId:"RR214541",
      locationId:"1",
      location: {
        id: 1,
        name: "Kolkata"
      },
      onboardingDate:null,
      registrationDate:null,
      last_login_time:null,
      status:null,
      isAccountManager: 1,
      isProjectManager: 0,
      accountIds: [1, 2, 3],
      projectIds: [],
      isAdmin:true,
      isActive:false
   },
   {
      id:2,
      firstName:"Res2",
      lastName:"Last2",
      email:"res2@tcs.com",
      password:"12345",
      tcsEmployeeId:"163432",
      clientId:"RR214542",
      locationId:"2",
      location: {
        id: 2,
        name: "Pune"
      },
      onboardingDate:null,
      registrationDate:null,
      last_login_time:null,
      status:null,
      isAccountManager: 0,
      isProjectManager: 1,
      accountIds: [],
      projectIds: [5, 6, 7],
      isAdmin:true,
      isActive:true
    },
    {
      id:3,
      firstName:"Res3",
      lastName:"Last3",
      email:"res3@tcs.com",
      password:"12345",
      tcsEmployeeId:"163433",
      clientId:"RR214543",
      locationId:"2",
      location: {
        id: 2,
        name: "Pune"
      },
      onboardingDate:null,
      registrationDate:null,
      last_login_time:null,
      status:null,
      isAccountManager: 1,
      isProjectManager: 1,
      accountIds: [1, 2, 3],
      projectIds: [5, 6, 7],
      isAdmin:true,
      isActive:true
    }
  ];

  ngOnInit() {
    this.getAllProjects();
    this.getAllAccounts();

    console.log(this.all_accounts);
    console.log(this.all_projects);
  }

  /* I. Service call made for projects drop down list */
  getAllProjects() {
    let conditions = [];
    this.projectService
        .getProjects(conditions)
        .subscribe(resp => {
          this.all_projects = resp;
        });    
  }

  /* II. Service call made for accounts drop down list */
  getAllAccounts() {
    this.projectService
        .getAccountsDropdown()
        .subscribe(resp => {
          this.all_accounts = resp;
        });
  }

  /* Create add project form */
  createAddForm() {
    this.addForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      tcsEmployeeId: ['', [Validators.required]],
      clientId: [''],
      seatId: [''],
      locationId: [''],
      isAccountManager: [false, [Validators.required]],
      isProjectManager: [false, [Validators.required]],
      isAdmin: [false, [Validators.required]],
      accountIds: [''],
      projectIds: ['']
    });
  }

  addUser() {
    console.log(this.addForm);

    let userData = this.addForm.value;    

    let userPost = {
      employee: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        tcsEmployeeId: userData.tcsEmployeeId,
        clientId: userData.clientId,
        seatId: userData.seatId,
        locationId: userData.locationId,
        isAdmin: userData.isAdmin,
        active: true        
      },
      isAccountManager: userData.isAccountManager,
      isProjectManager: userData.isProjectManager,      
      accountIdList: userData.accountIds,
      projectIdList: userData.projectIds
    }

    console.log(userPost);

    this.usersService
        .addUser(userPost)
        .subscribe(resp => {
          console.log(resp);
        });
  }

  /* Log message for debugging purpose */
  log() {
    console.log(this.addForm.controls);
  }

  /* Check if input field is invalid */
  isInvalid(field): boolean {

    let state = this.addForm.controls[field].invalid && 
    (this.addForm.controls[field].dirty || this.addForm.controls[field].touched);

    return state;
  } 
}
