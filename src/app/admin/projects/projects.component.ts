import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectsService } from './projects.service';
import swal from 'sweetalert2';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  public all_accounts: any;
  public projects: any;

  public btnDisabled: boolean = false;
  public invalidAttempt: boolean = false;
  public addForm: FormGroup;
  public editForm: FormGroup;
  modalRef: BsModalRef;

  constructor(
    private projectService: ProjectsService, 
    private fb: FormBuilder,
    private modalService: BsModalService
  ) {}

  ngOnInit() {

    this.projectsList();
    this.createAddForm();
    this.setEditForm();
  }

  /* Create add project form */
  createAddForm() {
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      accountId: ['', [Validators.required]],
      isActive: [true]
    });
  }

  /* Create add project form */
  createEditForm() {
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      accountId: ['', [Validators.required]],
      isActive: [true]
    });
  }

  log() {
    console.log(this.addForm.controls);
  }

  /* Check if input field is invalid */
  isInvalid(field): boolean {

    let state = this.addForm.controls[field].invalid && 
    (this.addForm.controls[field].dirty || this.addForm.controls[field].touched);

    return state;
  }

  /* Projects listing */
  projectsList() {

    let conditions = [];

    this.projectService
        .getProjects(conditions)
        .subscribe(resp => {
          this.projects = resp;
        });

    this.projectService
        .getAccountsDropdown()
        .subscribe(resp => {
          this.all_accounts = resp;
          // console.log("Account service:", resp);
        });
  }

  addProject() {
    let project = this.addForm.value;
    project.isActive = project.isActive == "true" ? true : false;
    console.log(project);

    this.projectService
        .addProject(this.addForm.value)
        .subscribe(resp => {
          console.log(resp);
          this.addForm.reset({
            name: '',
            accountId: '',
            isActive: true
          });
          this.projectsList();

          swal({
            title: "Success!",
            text: "Project added successfully.",
            type: 'success',
            showConfirmButton: true     
          });
        });
  }

  openEditModal(template: TemplateRef<any>, project) {
    this.modalRef = this.modalService.show(template);
    this.editForm.patchValue({
      name: project.name,
      account_id: project.account.id,
      is_active: project.is_active
    });
  }

  setEditForm() {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      account_id: ['', Validators.required],
      is_active: ['']
    });
  }

}
