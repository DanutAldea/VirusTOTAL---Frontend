import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { apiUrl } from 'src/main';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm = this.formBuilder.group({
    email: '',
    username: '',
    password: '',
    name: '',
    description: ''
  });

  invalidAttempt:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    this.invalidAttempt = false;
  }

  onSubmit() {
    // console.log(this.registerForm.value);

    this.http.post<any>(apiUrl + "/signup", {
      userEmail: this.registerForm.value.email,
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      name: this.registerForm.value.name,
      desc: this.registerForm.value.description
    }).subscribe(
      (data) => {
        // console.log(data);
        this.http.post<any>(apiUrl + "/login", { userEmail: this.registerForm.value.email, password: this.registerForm.value.password }).subscribe(
          (data) => {
            localStorage.setItem('email', this.registerForm.value.email!);
            localStorage.setItem('AccessToken', data.AccessToken);
            // console.log(localStorage.getItem("AccessToken"));
            this.router.navigate(["../home"]);
          }
        )
      }, 
      (error) => {
        // console.log(error);
        this.invalidAttempt = true;
        this.registerForm.reset();
      }
    );
  }
}
