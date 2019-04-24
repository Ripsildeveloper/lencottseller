import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import { SettingsService } from '../settings.service';
import {Footer} from './footer.model';
import {LogoImageData} from './footerImageData.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  footerForm: FormGroup;
  footerModel: Footer;

  fileLength: number;
  fileToUpload: any[];
  urls = new Array<string>();

  reader: FileReader = new FileReader();
  logoImageData: LogoImageData = new LogoImageData();
  constructor(private fb: FormBuilder, private router: Router, private settingService: SettingsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {

    this.footerForm = this.fb.group({
      address: [''],
      instagramLink: [''],
      facebookLink: [''],
      pintrestLink: [''],
      googlePlusLink: [''],
      twitterLink: [''],
      map: [''],
      contactNo: [''],
      alternativeContactNo: [''],
      logoImageName: [''],
      mailId: [''],
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

  addFooter() {
this.footerModel = new Footer();
this.footerModel.address = this.footerForm.controls.address.value;
this.footerModel.instagramLink = this.footerForm.controls.instagramLink.value;
this.footerModel.facebookLink = this.footerForm.controls.facebookLink.value;
this.footerModel.pintrestLink = this.footerForm.controls.pintrestLink.value;
this.footerModel.googlePlusLink = this.footerForm.controls.googlePlusLink.value;
this.footerModel.twitterLink = this.footerForm.controls.twitterLink.value;
this.footerModel.map = this.footerForm.controls.map.value;
this.footerModel.contactNo = this.footerForm.controls.contactNo.value;
this.footerModel.alternativeContactNo = this.footerForm.controls.alternativeContactNo.value;
this.footerModel.mailId = this.footerForm.controls.mailId.value;
this.settingService.addFooterdetails(this.footerModel).subscribe(data => {
  this.addLogo(data[0]._id);
}, err => {
  console.log(err);
});
  }

  addLogo(id) {
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    }
    this.settingService.uploadLogo(formData, id).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }
}
