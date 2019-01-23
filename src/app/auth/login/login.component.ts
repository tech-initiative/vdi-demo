import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public btnDisabled: boolean = false;
  public invalidAttempt: boolean = false;
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) { 
    this.createForm();
  }

  ngOnInit() {
  }

  /* Create Login form - initialize form builder object */
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      is_admin: [false]
    });
  }

  /* Check if input field is invalid */
  public isInvalid(field): boolean {
    return this.loginForm.controls[field].invalid && 
          (this.loginForm.controls[field].dirty || this.loginForm.controls[field].touched);
  }

  /* Submit login form details to service and process response from API call */
  submitLoginForm() {
    console.log(this.loginForm.value);
    this.authService
        .userLogin(this.loginForm.value)
        .subscribe(resp => {
          if (resp.status == 0) {
            this.invalidAttempt = true;
          } else if (resp.status == 1) {
            this.invalidAttempt = false;
            /** 
             * If is_admin is true, redirect to admin dashboard. 
             * Otherwise, redirect to user dashboard */
            if (this.loginForm.value.is_admin) {
              this.router.navigate(['/admin/dashboard'])
            } else {
              this.router.navigate(['/user/dashboard'])
            }            
          }
        });

  }
}
