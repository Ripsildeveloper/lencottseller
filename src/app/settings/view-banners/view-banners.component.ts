import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import {Banner} from '../banners/banner.model';
import {SettingsService} from '../settings.service';

export interface PeriodicElement {
  bannerName: string;
  bannerPosition: string;
  delete: string;
}

@Component({
  selector: 'app-view-banners',
  templateUrl: './view-banners.component.html',
  styleUrls: ['./view-banners.component.css']
})
export class ViewBannersComponent implements OnInit {
  viewBannerForm: FormGroup;
  bannerModel: Banner;
  displayedColumns: string[] = ['bannerName', 'bannerPosition',  'delete'];
  bannerData;
  message;
  action;

  constructor(private fb: FormBuilder, private router: Router, private settingService: SettingsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getBannerDetails();
  }
createForm() {
  this.viewBannerForm = this.fb.group({

  });
}
  getBannerDetails() {
    this.settingService.getBanners().subscribe(data => {
      this.bannerModel = data;
      this.bannerData = new MatTableDataSource<PeriodicElement>(data);
    }, err => {
      console.log(err);
    });
  }
deleteBanners(elem) {
  this.message = 'Banner deleted';
this.settingService.deleteBanner(elem).subscribe(data => {
  this.snackBar.open(this.message, this.action , {
    duration: 2000,
  });
  this.bannerData = new MatTableDataSource<PeriodicElement>(data);
}, err => {
  console.log(err);
});
}
}
