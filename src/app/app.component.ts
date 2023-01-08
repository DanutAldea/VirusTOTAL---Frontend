import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'virus_total';
  isLoggedIn = false;

  ngOnInit() {
    console.log("helooooo");
    if (localStorage.getItem("AccessToken") != null)
      this.isLoggedIn = true;
  }
}
