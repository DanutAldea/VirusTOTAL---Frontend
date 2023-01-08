import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { apiUrl } from 'src/main';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { urlModel } from 'src/models/urlModel';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.css']
})
export class UrlComponent implements OnInit{
  isLoggedIn:boolean = false;
  searchByURL:boolean = true;
  searchByUser:boolean = false;
  addURL:boolean = false;
  deleteURL:boolean = false;
  displaySearch:boolean = true;
  displayResults:boolean = false;
  urlResult:boolean = false;
  urlGood:boolean = false;
  urlBad:boolean = false;
  userResult:boolean = false;
  urlArray:urlModel[] = [];

  addressForm = this.formBuilder.group({
    urlAddress:''
  });

  userForm = this.formBuilder.group({
    userEmail:''
  })

  addUrlForm = this.formBuilder.group({
    addedUrlAddress:''
  })

  deleteUrlForm = this.formBuilder.group({
    deletedUrlAddress:''
  })

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('AccessToken') == null) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }
    this.searchByURL = true;
    this.searchByUser = false;
    this.addURL = false;
    this.deleteURL = false;
    this.displaySearch = true;
    this.displayResults = false;
    this.urlResult = false;
    this.urlBad = false;
    this.urlGood = false;
    this.userResult = false;
    this.urlArray = [];
  }

  searchByAddressButton() {
    this.displaySearch = true;
    this.displayResults = false;
    this.searchByURL = true;
    this.searchByUser = false;
    this.addURL = false;
    this.deleteURL = false;
  }

  searchByUserButton() {
    this.displaySearch = true;
    this.displayResults = false;
    this.searchByURL = false;
    this.searchByUser = true;
    this.addURL = false;
    this.deleteURL = false;
  }

  addAddressButton() {
    this.displaySearch = true;
    this.displayResults = false;
    this.searchByURL = false;
    this.searchByUser = false;
    this.addURL = true;
    this.deleteURL = false;
  }

  deleteUrlButton() {
    this.displaySearch = true;
    this.displayResults = false;
    this.searchByURL = false;
    this.searchByUser = false;
    this.addURL = false;
    this.deleteURL = true;
  }

  onAddressSubmit() {
    this.http.get<any>(apiUrl + '/url_info', {
      params: new HttpParams().append("urlAddress", this.addressForm.value.urlAddress!)
    }).subscribe(
      (data) => {
        this.displayResults = true;
        this.displaySearch = false;
        this.urlBad = true;
        this.urlGood = false;
      },
      (error) => {
        this.displayResults = true;
        this.displaySearch = false;
        this.urlBad = false;
        this.urlGood = true;
      }
    )
  }

  onUserSubmit() {
    this.http.get<urlModel[]>(apiUrl + '/user_urls', {
      params: new HttpParams().append("userEmail", this.userForm.value.userEmail!)
    }).subscribe(
      (data) => {
        this.displaySearch = false;
        this.displayResults = true;
        this.urlResult = false;
        this.urlBad = false;
        this.urlGood = false;
        this.userResult = true;
        // console.log(data);
        this.urlArray = data;
        console.log(this.urlArray);
      }
    )
  }

  onAddUrlSubmit() {    
    this.http.post<any>(apiUrl + '/add_url', {
      userEmail:localStorage.getItem('email'),
      urlAddress:this.addUrlForm.value.addedUrlAddress
    },{
      headers: new HttpHeaders().set('AccessToken', localStorage.getItem('AccessToken')!)
    }).subscribe(
      (data) => {
        this.toastr.success('URL added', '', {positionClass: 'toast-top-center'});
        this.addUrlForm.reset();
        // console.log(data);
        // this.router.navigate(['/home']);
      },
      (error) => {
        console.log(error);
        // this.router.navigate(['/home']);
      }
    )
  }

  onDeleteUrlSubmit() {
    this.http.post<any>(apiUrl + '/delete_url', {
      userEmail:localStorage.getItem('email'),
      urlAddress:this.deleteUrlForm.value.deletedUrlAddress
    },{
      headers: new HttpHeaders().set('AccessToken', localStorage.getItem('AccessToken')!)
    }).subscribe(
      (data) => {
        this.toastr.success('URL deleted', '', {positionClass: 'toast-top-center'});
        this.addUrlForm.reset();
        // console.log(data);
        // this.router.navigate(['/home']);
      },
      (error) => {
        console.log(error);
        // this.router.navigate(['/home']);
      }
    )
  }

}
