import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import { Banner } from './banner.model';
import { SettingsService } from '../settings.service';
import { BannerImageData } from './bannerImageData.model';
import { priceValue } from '../../shared/validation/price-validation';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {
  bannerForm: FormGroup;
  bannerModel: Banner[];
  imageNameFilter: Banner[];
  showImageNameError = false;
  message: string;
  action: string;


  fileLength: number;
  fileToUpload: any[];
  urls = new Array<string>();

  reader: FileReader = new FileReader();
  bannerImageData: BannerImageData = new BannerImageData();
  constructor(private fb: FormBuilder, private router: Router, private settingService: SettingsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getBannersDetails();
  }
  createForm() {
    this.bannerForm = this.fb.group({
      id: [''],
      bannerDescription: [''],
      position: ['', priceValue],
    });
  }
  getBannersDetails() {
    this.settingService.getBanners().subscribe(data => {
      this.bannerModel = data;
    }, err => {
      console.log(err);
    });
  }
  handleFileInput(images: any) {
    this.fileToUpload = images;
    this.bannerImageData.bannerImage = this.fileToUpload[0];
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
    this.imageNameFilter = this.bannerModel.filter(val => val.bannerImage.indexOf(this.bannerImageData.bannerImage.name) !== -1);
    if (this.imageNameFilter.length !== 0) {
      this.showImageNameError = true;
    } else if (this.imageNameFilter.length === 0) {
      this.showImageNameError = false;
    }
  }
  addBanners() {
    this.message = 'Banners added';
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    }
    this.settingService.uploadBanners(formData, this.bannerForm.controls.position.value).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.router.navigate(['settings/viewbanners']);
    }, error => {
      console.log(error);
    });
  }
}
