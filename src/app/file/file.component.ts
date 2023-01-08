import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { apiUrl } from 'src/main';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { urlModel } from 'src/models/urlModel';
import * as CryptoJS from 'crypto-js';
import { fileModel } from 'src/models/fileModel';


@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit{
  isLoggedIn:boolean = false;
  searchByDigest:boolean = true;
  searchByUser:boolean = false;
  addFile:boolean = false;
  deleteFile:boolean = false;
  displaySearch:boolean = true;
  displayResults:boolean = false;
  digestResult:boolean = false;
  fileGood:boolean = false;
  fileBad:boolean = false;
  userResult:boolean = false;
  fileArray:fileModel[] = [];
  fileName:string = '';
  fileByteArray:number[] = [];
  digestToDelete: string = '';
  insertFile:boolean = true;
  insertDigest:boolean = false;
  digestToSearch: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('AccessToken') == null) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }
    this.searchByDigest = true;
    this.searchByUser = false;
    this.addFile = false;
    this.deleteFile = false;
    this.displaySearch = true;
    this.displayResults = false;
    this.digestResult = false;
    this.fileGood = false;
    this.fileBad = false;
    this.userResult = false;
    this.fileArray = [];
    this.fileName = '';
    this.fileByteArray = [];
    this.digestToDelete = '';
    this.insertFile = true;
    this.insertDigest = false;
    this.digestToSearch = '';
  }

  searchByDigestButton() {
    this.displaySearch = true;
    this.displayResults = false;
    this.searchByDigest = true;
    this.searchByUser = false;
    this.addFile = false;
    this.deleteFile = false;
  }

  searchByUserButton() {
    this.displaySearch = true;
    this.displayResults = false;
    this.searchByDigest = false;
    this.searchByUser = true;
    this.addFile = false;
    this.deleteFile = false;
  }

  addFileButton() {
    this.displaySearch = true;
    this.displayResults = false;
    this.searchByDigest = false;
    this.searchByUser = false;
    this.addFile = true;
    this.deleteFile = false;
  }

  deleteFileButton() {
    this.displaySearch = true;
    this.displayResults = false;
    this.searchByDigest = false;
    this.searchByUser = false;
    this.addFile = false;
    this.deleteFile = true;
  }

  insertDigestButton() {
    this.insertDigest = true;
    this.insertFile = false;
  }

  insertFileButton() {
    this.insertDigest = false;
    this.insertFile = true;
  }

  fileForm = this.formBuilder.group({
    fileDigest:''
  });

  userForm = this.formBuilder.group({
    userEmail:''
  })

  addFileForm = this.formBuilder.group({
    addedFile:null
  })

  deleteFileForm = this.formBuilder.group({
    fileDigest:''
  })

  onAddFileChange(event: any) {
    if (event.target.files[0] != null && event.target.files[0] != undefined) {
      var file = event.target.files[0];
      this.fileName = file.name;
      console.log(this.fileName);

      var fileReader: FileReader = new FileReader();
      this.fileByteArray = [];
      var self = this;
      fileReader.onloadend = function(x) {
        console.log(fileReader.result);
        var result = fileReader.result?.toString();
        // console.log(result);
        var array = Array.from(result!);
        // console.log(array);

        array?.forEach( c => self.fileByteArray.push(c.charCodeAt(0)));
        console.log(self.fileByteArray);
      }
      fileReader.readAsBinaryString(file);
    }
    // console.log("hi");
  }

  onAddFileSubmit() {
    console.log(CryptoJS.SHA512("abc").toString().toUpperCase());
    this.http.post<any>(apiUrl + '/add_file', {
      userEmail: localStorage.getItem('email'),
      fileName: this.fileName,
      binData: this.fileByteArray
    }, {
      headers: new HttpHeaders().append('AccessToken', localStorage.getItem('AccessToken')!)
    }).subscribe(
      (data) => {
        console.log(data);

        if ((data as string).startsWith('File ' + this.fileName + ' was added'))
          this.toastr.success("File was added", '', {positionClass: 'toast-top-center'});
        else
          this.toastr.info("File already in database", '', {positionClass: 'toast-top-center'});
      }
    )
  }

  onDeleteFileChange(event: any) {
    if (event.target.files[0] != null && event.target.files[0] != undefined) {
      var file = event.target.files[0];
      this.fileName = file.name;
      console.log(this.fileName);

      var fileReader: FileReader = new FileReader();
      this.fileByteArray = [];
      var self = this;
      fileReader.onloadend = function(x) {
        // console.log(fileReader.result);
        var result = fileReader.result?.toString();
        self.digestToDelete = CryptoJS.SHA512(result as string).toString().toUpperCase();
        console.log(self.digestToDelete);
      }
      fileReader.readAsBinaryString(file);
    }
  }

  onSearchFileChange(event : any) {
    if (event.target.files[0] != null && event.target.files[0] != undefined) {
      var file = event.target.files[0];
      this.fileName = file.name;
      console.log(this.fileName);

      var fileReader: FileReader = new FileReader();
      this.fileByteArray = [];
      var self = this;
      fileReader.onloadend = function(x) {
        // console.log(fileReader.result);
        var result = fileReader.result?.toString();
        self.digestToSearch = CryptoJS.SHA512(result as string).toString().toUpperCase();
        console.log(self.digestToSearch);
      }
      fileReader.readAsBinaryString(file);
    }
  }

  onDeleteFileSubmit() {
    // console.log("start remove");

    if (this.insertDigest == true) {
      this.digestToDelete = this.deleteFileForm.value.fileDigest!;
    }

    this.http.post<any>(apiUrl + '/delete_file', {
      userEmail: localStorage.getItem('email'),
      fileSHA512Digest: this.digestToDelete
    }, {
      headers: new HttpHeaders().append('AccessToken', localStorage.getItem('AccessToken')!)
    }).subscribe(
      (data) => {
        console.log(data);
      }
    )
  }

  onDeleteDigestSubmit() {

  }

  onFileSubmit() {
    if (this.insertDigest == true) {
      this.digestToSearch = this.fileForm.value.fileDigest!;
    }

    // this.http.post<any>(apiUrl + '/delete_file', {
    //   userEmail: localStorage.getItem('email'),
    //   fileSHA512Digest: this.digestToDelete
    // }, {
    //   headers: new HttpHeaders().append('AccessToken', localStorage.getItem('AccessToken')!)
    // }).subscribe(
    //   (data) => {
    //     console.log(data);
    //   }
    // )
    this.http.get<any>(apiUrl + '/file_info', {
      params: new HttpParams().append('fileSHA512Digest', this.digestToSearch)
    }).subscribe(
      (data) => {
        console.log(data);
        this.displayResults = true;
        this.displaySearch = false;
        this.userResult = false;
        this.fileBad = true;
        this.fileGood = false;
      },
      (error) => {
        console.log("dazant exist");
        this.displayResults = true;
        this.displaySearch = false;
        this.userResult = false;
        this.fileBad = false;
        this.fileGood = true;
      }
    )
  }

  onUserSubmit() {
    this.http.get<fileModel[]>(apiUrl + '/user_files', {
      params: new HttpParams().append("userEmail", this.userForm.value.userEmail!)
    }).subscribe(
      (data) => {
        this.displaySearch = false;
        this.displayResults = true;
        this.userResult = true;
        this.fileBad = false;
        this.fileGood = false;
        // console.log(data);
        this.fileArray = data;
        console.log(this.fileArray);
      }
    )
  }
}
