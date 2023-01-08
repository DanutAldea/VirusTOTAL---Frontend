import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLoggedIn = false;
  email = '';

  constructor(
    private router: Router
  ){}

  ngOnInit() {
    if (localStorage.getItem('AccessToken') != null){
      this.isLoggedIn = true;
      this.email = localStorage.getItem('email')!;
    }
  }

  logout() {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("email");
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }

  navigateToDeleteAccount() {
    console.log("ceva");
    this.router.navigate(['/delete_account']);
  }
}
