import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { apiUrl } from 'src/main';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit{
  invalidAttempt:boolean = false;
  deleteAccountForm = this.formBuilder.group({
    email: '',
  });

  headers:HttpHeaders = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.invalidAttempt = false;
  }

  onSubmit() {
    // if (localStorage.getItem('AccessToke') != null) {
      this.headers = new HttpHeaders().set('AccessToken', localStorage.getItem('AccessToken')!);
      console.log(this.headers);
    // }

    this.http.post<any>(apiUrl + "/delete_user", {
      userEmail: this.deleteAccountForm.value.email
    }, { headers:this.headers}).subscribe(
      (data) => {
        localStorage.removeItem('AccessToken');
        this.router.navigate(['/home']);
      }, 
      (error) => {
        this.invalidAttempt = true;
        this.deleteAccountForm.reset();
      }
    );
  }
}
