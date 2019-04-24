import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import { Ads } from './ads.model';
import { SettingsService } from '../settings.service';
import {AdsImageData} from './adsImageData.model';
import {priceValue} from '../../shared/validation/price-validation';
@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  adsForm: FormGroup;
  adsModel: Ads[];
  imageNameFilter;
  showImageNameError = false;
  message;
  action;


  fileLength;
  fileToUpload;
  urls = new Array<string>();

  reader: FileReader = new FileReader();
  adsImageData: AdsImageData = new AdsImageData();
  constructor(private fb: FormBuilder, private router: Router, private settingService: SettingsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getAdsDetails();
  }
  createForm() {
    this.adsForm = this.fb.group({
      id: [''],
      position: ['', priceValue ],
    });
  }
  getAdsDetails() {
    this.settingService.getAds().subscribe(data => {
      this.adsModel = data;
    }, err => {
      console.log(err);
    });
  }
  handleFileInput(images: any) {
    this.fileToUpload = images;
    this.adsImageData.adsImage = this.fileToUpload[0];
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
    this.checkImageName();
  }
  checkImageName() {
    this.imageNameFilter = this.adsModel.filter(val => val.adsImageName.indexOf(this.adsImageData.adsImage.name) !== -1);
    if (this.imageNameFilter.length !== 0) {
this.showImageNameError = true;
    } else if (this.imageNameFilter.length === 0) {
      this.showImageNameError = false;
    }
  }
  addAds() {
    this.message = 'Hot Products added';
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    }
    this.settingService.uploadAds(formData, this.adsForm.controls.position.value).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.router.navigate(['settings/viewhotproducts']);
    }, error => {
      console.log(error);
    });
  }
}
