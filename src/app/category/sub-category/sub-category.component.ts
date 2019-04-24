import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBar} from '@angular/material';

import { CategoryService } from '../category.service';
import { SuperCategory } from '../super-category/superCategory.model';
import { MainCategory } from '../../category/main-category/mainCategory.model';
import {SubCategory} from './sub-category.model';

export interface PeriodicElement {
  categoryName: string;
  description: string;

}

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  superCategoryModel: SuperCategory;
  mainCategoryModel: MainCategory;
  subCategoryModel: SubCategory;
  subCategoryData;
  subCategoryForm: FormGroup;
  headerCatSelectedData;
  selectedMainCategory;
  getMainCategoryId;
  mainCategoryData;
  headCatSelected;
  message;
  action;
  displayedColumns: string[] = ['categoryName', 'description', 'delete'];
  constructor(private fb: FormBuilder, private router: Router, private categoryService: CategoryService, private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.createForm();
    this.getSuperCategory();
  }
  createForm() {
    this.subCategoryForm = this.fb.group({
      id: [''],
      categoryName: ['', Validators.required],
      description: ['']
    });
  }
  getSuperCategory() {
    this.categoryService.getSuperCategory().subscribe(data => {
      this.superCategoryModel = data;
    });
  }
  setNewUser(id) {
    this.headerCatSelectedData = id;
    this.categoryService.getMainCategory(id).subscribe(data => {
      this.mainCategoryModel = data.mainCategory;
    }, error => {
      console.log(error);
    });
  }
  selectMainCategory(id) {
  this.selectedMainCategory = id;
  }
  addSubCategory() {
    this.message = 'Sub Category added successfully';
    this.subCategoryModel = new SubCategory();
    this.subCategoryModel.subCategoryName = this.subCategoryForm.controls.categoryName.value;
    this.subCategoryModel.subCategoryDescription = this.subCategoryForm.controls.description.value;
    this.categoryService.addSubCategory(this.subCategoryModel, this.headerCatSelectedData, this.selectedMainCategory).subscribe(data => {
      console.log(data);
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    });
  }
  getCategory(id) {
    this.headCatSelected = id;
    this.categoryService.getMainCategory(id).subscribe(data => {
      this.mainCategoryModel = data.mainCategory;
    }, error => {
      console.log(error);
    });
  }
  getSubCategory(id) {
this.getMainCategoryId = id;
this.categoryService.getSubCategory(this.headCatSelected, this.getMainCategoryId).subscribe(data => {
  this.subCategoryData = new MatTableDataSource<PeriodicElement>(data.subCategory);
}, err => {
  console.log(err);
});
  }
  deleteSubCategory(element) {
this.categoryService.deleteSubCategory(this.headCatSelected, this.getMainCategoryId, element).subscribe(data => {
  this.subCategoryData = new MatTableDataSource<PeriodicElement>(data.subCategory);
}, err => {
  console.log(err);
});
 }
}
