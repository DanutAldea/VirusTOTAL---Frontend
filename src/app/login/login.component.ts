import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { apiUrl } from 'src/main';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  logInForm = this.formBuilder.group({
    email: '',
    password: ''
  });
  incorrectAttempt:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.incorrectAttempt = false;
  }

  onSubmit(): void {
    // Process checkout data here
    // console.warn('Nigga Cheese', this.logInForm.value);

    // this.http.post<any>(apiUrl + "/login", { userEmail: this.logInForm.value.email, password: this.logInForm.value.password }).subscribe(data => {
    //   console.log(data.AccessToken);
    // })
    this.http.post<any>(apiUrl + "/login", { userEmail: this.logInForm.value.email, password: this.logInForm.value.password }).subscribe(
      (data) => {
        localStorage.setItem('email', this.logInForm.value.email!);
        localStorage.setItem('AccessToken', data.AccessToken);
        // console.log(localStorage.getItem("AccessToken"));
        this.router.navigate(["../home"]);
      }, 
      (error) => {
        // console.log(error);
        this.incorrectAttempt = true;
      }
    )
  }
}
