import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import {Ads} from '../ads/ads.model';
import {SettingsService} from '../settings.service';

export interface PeriodicElement {
  adsImageName: string;
  adsPosition: string;
  delete: string;
}

@Component({
  selector: 'app-view-ads',
  templateUrl: './view-ads.component.html',
  styleUrls: ['./view-ads.component.css']
})
export class ViewAdsComponent implements OnInit {
  viewAdsForm: FormGroup;
  adsModel: Ads;
  displayedColumns: string[] = ['adsImageName', 'adsPosition',  'delete'];
  adsData;
  message;
  action;

  constructor(private fb: FormBuilder, private router: Router, private settingService: SettingsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getAdsDetails();
  }
  createForm() {
    this.viewAdsForm = this.fb.group({
    });
  }
  getAdsDetails() {
    this.settingService.getAds().subscribe(data => {
      this.adsModel = data;
      this.adsData = new MatTableDataSource<PeriodicElement>(data);
    }, err => {
      console.log(err);
    });
  }
  deleteAds(elem) {
    this.message = 'ADs deleted';
  this.settingService.deleteAds(elem).subscribe(data => {
    this.snackBar.open(this.message, this.action , {
      duration: 2000,
    });
    this.adsData = new MatTableDataSource<PeriodicElement>(data);
  }, err => {
    console.log(err);
  });
  }
}
