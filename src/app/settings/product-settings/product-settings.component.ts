import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { ProductSettings } from './product-settings.model';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-product-settings',
  templateUrl: './product-settings.component.html',
  styleUrls: ['./product-settings.component.css']
})
export class ProductSettingsComponent implements OnInit {
  productSettingsForm: FormGroup;
  showFormControl: boolean;
  showColorForm: boolean;
  showMaterialControl: boolean;
  showOccasionControl: boolean;
  showSizeControl: boolean;
  settingsModelData: ProductSettings;
  settingsModel: ProductSettings;
  message;
  action;
  constructor(private fb: FormBuilder, private router: Router, private settingsService: SettingsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getProductSettings();
  }
  createForm() {
    this.productSettingsForm = this.fb.group({
      priceRangeMinimum: [],
      priceRangeMaximum: [],
      color: [],
      material: [],
      occasion: [''],
      size: ['']
    });
  }
  getProductSettings() {
    this.settingsService.getProductSettings().subscribe(data => {
      this.settingsModelData = data;
    }, err => {
      console.log(err);
    });
  }
  createPriceRange() {
    this.showFormControl = true;
  }
  createColor() {
    this.showColorForm = true;
  }
  createMaterial() {
    this.showMaterialControl = true;
  }
  cancelPriceRange() {
    this.showFormControl = false;
  }
  cancelColor() {
    this.showColorForm = false;
  }
  cancelMaterial() {
    this.showMaterialControl = false;
  }
  createOccasion() {
    this.showOccasionControl = true;
  }
  cancelOccasion() {
    this.showOccasionControl = false;
  }
  createSize() {
this.showSizeControl = true;
  }
  cancelSize() {
    this.showSizeControl = false;
  }
  savePriceRange() {
    this.message = 'Price Range Added';
    this.settingsModel = new ProductSettings();
    this.settingsModel.priceRange =
      this.productSettingsForm.controls.priceRangeMinimum.value + '-' + this.productSettingsForm.controls.priceRangeMaximum.value;
    this.settingsService.addPriceRange(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showFormControl = false;
    }, err => {
      console.log(err);
    });
    this.productSettingsForm.reset();
  }
  deletePriceRange(val) {
    this.message = 'Price Range Deleted';
    this.settingsModel = new ProductSettings();
    this.settingsModel.priceRange = val;
    this.settingsService.deletePriceRange(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showColorForm = false;
    }, err => {
      console.log(err);
    });
  }
  saveColor() {
    this.message = 'Color Added';
    this.settingsModel = new ProductSettings();
    this.settingsModel.color = this.productSettingsForm.controls.color.value;
    this.settingsService.addColor(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showColorForm = false;
    }, err => {
      console.log(err);
    });
    this.productSettingsForm.reset();
  }
  deleteColor(val) {
    this.message = 'Color Deleted';
    this.settingsModel = new ProductSettings();
    this.settingsModel.color = val;
    this.settingsService.deleteColor(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showColorForm = false;
    }, err => {
      console.log(err);
    });
  }
  saveMaterial() {
    this.message = 'Material Added';
    this.settingsModel = new ProductSettings();
    this.settingsModel.material = this.productSettingsForm.controls.material.value;
    this.settingsService.addMaterial(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showMaterialControl = false;
    }, err => {
      console.log(err);
    });
    this.productSettingsForm.reset();
  }
  deleteMaterial(val) {
    this.message = 'Material Deleted';
    this.settingsModel = new ProductSettings();
    this.settingsModel.color = val;
    this.settingsService.deleteMaterial(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showColorForm = false;
    }, err => {
      console.log(err);
    });
  }
  saveOccasion() {
    this.message = 'Occasion Added';
    this.settingsModel = new ProductSettings();
    this.settingsModel.occasion = this.productSettingsForm.controls.occasion.value;
    this.settingsService.addOccasion(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showOccasionControl = false;
    }, err => {
      console.log(err);
    });
    this.productSettingsForm.reset();
  }
  deleteOccasion(val) {
    this.message = 'Occasion Deleted';
    this.settingsModel = new ProductSettings();
    this.settingsModel.color = val;
    this.settingsService.deleteOccasion(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showColorForm = false;
    }, err => {
      console.log(err);
    });
  }
  saveSize() {
    this.message = 'Size Added';
    this.settingsModel = new ProductSettings();
    this.settingsModel.size = this.productSettingsForm.controls.size.value;
    this.settingsService.addSize(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showSizeControl = false;
    }, err => {
      console.log(err);
    });
    this.productSettingsForm.reset();
  }
  deleteSize(val) {
    this.message = 'Size Deleted';
    this.settingsModel = new ProductSettings();
    this.settingsModel.color = val;
    this.settingsService.deleteSize(this.settingsModel).subscribe(data => {
      this.settingsModelData = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.showColorForm = false;
    }, err => {
      console.log(err);
    });
  }
}
