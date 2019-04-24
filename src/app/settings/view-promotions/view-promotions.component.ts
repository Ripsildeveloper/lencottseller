import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import {Promotion} from '../promotions/promotion.model';
import {SettingsService} from '../settings.service';

export interface PeriodicElement {
  promotionTitle: string;
  promotionPosition: string;
  delete: string;
}

@Component({
  selector: 'app-view-promotions',
  templateUrl: './view-promotions.component.html',
  styleUrls: ['./view-promotions.component.css']
})
export class ViewPromotionsComponent implements OnInit {
  viewPromotionForm: FormGroup;
  promotinModel: Promotion;
  displayedColumns: string[] = ['promotionTitle', 'promotionPosition', 'products', 'view', 'delete'];
  promotionData;
  message;
  action;

  constructor(private fb: FormBuilder, private router: Router, private settingService: SettingsService, private snackBar: MatSnackBar) { }


  ngOnInit() {
    this.createForm();
    this.getPromotionDetails();
  }
  createForm() {
    this.viewPromotionForm = this.fb.group({
    });
  }
  getPromotionDetails() {
    this.settingService.getPromotions().subscribe(data => {
      this.promotinModel = data;
      console.log('promotions', data);
      this.promotionData = new MatTableDataSource<PeriodicElement>(data);
    }, err => {
      console.log(err);
    });
  }
  deletePromotions(elem) {
    this.message = 'promotion deleted';
   this.settingService.deletePromotions(elem).subscribe(data => {
    this.promotionData = new MatTableDataSource<PeriodicElement>(data);
    this.snackBar.open(this.message, this.action, {
      duration: 2000,
    });
   }, err => {
     console.log(err);
   });
  }
  viewPromotions(data) {
    console.log('single promotions', data);
   this.router.navigate(['/settings/promotions', data._id]);
  }
}
