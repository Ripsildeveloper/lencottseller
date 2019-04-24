import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import { LogoImageData } from './logoImageData.model';
import { Header } from './header.model';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  headerForm: FormGroup;
  headerModel: Header;
  imageNameFilter;
  showImageNameError = false;
  message;
  action;
  fileLength;
  fileToUpload;
  urls = new Array<string>();

  reader: FileReader = new FileReader();
  logoImageData: LogoImageData = new LogoImageData();
  constructor(private fb: FormBuilder, private router: Router, private settingService: SettingsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getHeader();
  }
  createForm() {
    this.headerForm = this.fb.group({
      id: [''],
      position: [''],
    });
  }
  handleFileInput(images: any) {
    this.fileToUpload = images;
    this.logoImageData.logoImage = this.fileToUpload[0];
    this.urls = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    }
  }
  addTemplate() {
    this.message = 'Logo  added';
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    }
    this.settingService.addLogo(formData).subscribe(data => {
      this.headerModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
    }, error => {
      console.log(error);
    });
  }
  getHeader() {
    this.settingService.getHeaderDetails().subscribe(data => {
      this.headerModel = data;
    }, error => {
      console.log(error);
    });
  }
}
