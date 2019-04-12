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

  all_accounts: any;
  projects: any;

  btnDisabled: boolean = false;
  invalidAttempt: boolean = false;
  addForm: FormGroup;
  editForm: FormGroup;
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

  /* Create edit project form initially */
  setEditForm() {
    this.editForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      accountId: ['', Validators.required],
      isActive: ['']
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

  /* I. Service call made for Projects listing */
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

  /* II. Service call made for Add Project */
  addProject() {
    let project = this.addForm.value;
    // project.isActive = project.isActive == "true" ? true : false;
    console.log("Add project data: ", project);

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
            // type: 'success',
            showConfirmButton: true     
          });
        });
  }

  /* When edit button is clicked, open respective row data in edit modal */
  openEditModal(template: TemplateRef<any>, project) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-sm' })
    );
    
    this.editForm.patchValue({
      id: project.projectId,
      name: project.name,
      accountId: project.accountId,
      isActive: project.isActive ? "1" : "0"
    });
  }

  /* When edit button is clicked, open respective row data in edit modal */
  openSnapModal(template: TemplateRef<any>, project) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg' })
    );
    
    console.log("Snapshot of project: ", project);
  }

  /* III. Service call made for Edit Project */
  editProject() {
    let project = this.editForm.value;
    project.isActive = project.isActive == "1" ? true : false;

    this.projectService
        .editProject(project)
        .subscribe(resp => {
          console.log(resp);
          this.projectsList();
          this.modalRef.hide();
          swal({
            title: "Success!",
            text: "Project edited successfully.",
            // type: 'success',
            showConfirmButton: true     
          });
        });

    console.log("Edit project data: ", project);
  }
  
  /* Delete confirm pop up */
  openDeleteConfirm(project) {
    swal({
      title: "Are you sure?",
      text: `All data associated with ${project.name} project will be lost.`,
      showCancelButton: true  
    }).then((sel_opt) => {
      if (sel_opt.hasOwnProperty('value') && sel_opt.value) {
        this.deleteProject(project.projectId);
        this.projects = this.projects.filter((v) => {
          return v.projectId != project.projectId;
        });
      } else {
        // console.log("Delete option cancelled!");
      }
    });
  }

  /* IV. Service call made for Delete Project */
  deleteProject(id) {
    return this.projectService.deleteProject(id).subscribe();
  }

}
