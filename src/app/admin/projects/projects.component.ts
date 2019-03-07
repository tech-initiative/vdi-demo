import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  public all_accounts;
  public projects;

  constructor() { }

  ngOnInit() {

    let res = {
      status: 1,
      data: {
        all_accounts: [
          {
            id: 1,
            name: "Account 1"
          },
          {
            id: 2,
            name: "Account 2"
          },
          {
            id: 3,
            name: "Account 3"
          }
        ],
        projects:[
          {
            id: "1",
            name: "Jasper",
            is_active: 1,
            account: {
              id: 1,
              name: "Account 1"
            },
            project_manager: [
              {
                first_name: "Manager 2a",
                last_name: "Last 2a"
              },
              {
                first_name: "Manager 2b",
                last_name: "Last 2b"
              }
            ] 
          },
          {
            id: "2",
            name: "Project 2",
            is_active: 1,
            account: {
              id: 2,
              name: "Account 2"
            },
            project_manager: [
              {
                first_name: "Manager 2a",
                last_name: "Last 2a"
              },
              {
                first_name: "Manager 2b",
                last_name: "Last 2b"
              }
            ]
          },
          {
            id: "3",
            name: "Project 3",
            is_active: 1,
            account: {
              id: 2,
              name: "Account 2"
            },
            project_manager: [
              {
                first_name: "Manager 2a",
                last_name: "Last 2a"
              },
              {
                first_name: "Manager 2b",
                last_name: "Last 2b"
              }
            ]
          }
        ]
      }
    };

    this.projects = res.data.projects;

  }

}
