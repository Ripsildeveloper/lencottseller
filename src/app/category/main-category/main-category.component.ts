import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import { CategoryService } from '../category.service';
import { SuperCategory } from '../super-category/superCategory.model';
import { MainCategory } from './mainCategory.model';


export interface PeriodicElement {
  categoryName: string;
  description: string;

}
@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.css']
})
export class MainCategoryComponent implements OnInit {
  superCategoryModel: SuperCategory;
  selectedSuperCat = [];
  filterSuperCategoryModel = [];
  selectedmainCategoryModel: MainCategory[];
  duplicationError: boolean;
  mainCategoryModel: MainCategory;
  mainCategoryForm: FormGroup;
  headerCatSelectedData;
  mainCategoryData;
  headCatSelected;
  message;
  action;
  fileLength;
  fileToUpload;
  urls = new Array<string>();
  selecteValue: any = [];
  reader: FileReader = new FileReader();
  savedLength;
  savedCategory: SuperCategory;
  imageError: boolean;
  displayedColumns: string[] = [ 'categoryName', 'description',  'delete'];
  constructor(private fb: FormBuilder, private router: Router, private categoryService: CategoryService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getSuperCategory();
  }
  createForm() {
    this.mainCategoryForm = this.fb.group({
      id: [''],
      categoryName: ['', Validators.required],
      description: ['']
    });
  }
  getSuperCategory() {
    this.categoryService.getSuperCategory().subscribe(data => {
      console.log(data);
      this.superCategoryModel = data;
      this.filterSuperCategoryModel = data;
    });
  }
  setNewUser(id) {
    this.headerCatSelectedData = id;
    this.filterSuperCategoryModel.forEach(element => {
      if (element._id === id) {
        this.selectedmainCategoryModel = element.mainCategory;
      }
    });
  }
  categoryVerify(val) {
    this.selectedmainCategoryModel.forEach(element => {
      if (element.mainCategoryName === val) {
        element.mainCategoryNameError = true;
        this.duplicationError = true;
      } else {
        element.mainCategoryNameError = false;
        this.duplicationError = false;
      }
    });
    console.log(this.selectedmainCategoryModel);
  }
  handleFileInput(images: any) {
    this.fileToUpload = images;
    this.imageError = false;
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
  addMainCategory() {
    this.message = 'Main Category Added';
    this.mainCategoryModel = new MainCategory(
      this.mainCategoryForm.controls.categoryName.value,
      this.mainCategoryForm.controls.description.value,
    );
    this.mainCategoryModel._id = this.headerCatSelectedData;
    this.categoryService.addMainCategory(this.mainCategoryModel).subscribe(data => {
      console.log('saved data', data);
      this.savedLength = data.length - 1;
      this.savedCategory = data[this.savedLength];

     /*  this.uploadImages(this.savedCategory); */
    }, error => {
      console.log(error);
    });
    this.snackBar.open(this.message, this.action, {
      duration: 3000,
    });
    this.mainCategoryForm.reset();
  }
  /* uploadImages(cat) {
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    }
    this.categoryService.uploadMainCategoryImages(formData, this.headerCatSelectedData, cat._id, cat.mainCategoryName).subscribe(data => {
      this.urls = [];
    }, error => {
      console.log(error);
    });
  } */
  getCategory(id) {
    this.headCatSelected = id;
    this.categoryService.getMainCategory(id).subscribe(data => {
      console.log(data);
      this.mainCategoryData = new MatTableDataSource<PeriodicElement>(data.mainCategory);
    }, error => {
      console.log(error);
    });
  }
  deleteMainCategory(id , name) {
    console.log(id);
    console.log(name);
    this.message = 'Main Category deleted';
    this.categoryService.deleteMainCategory(this.headCatSelected, id, name).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.mainCategoryData = new MatTableDataSource<PeriodicElement>(data);
    }, error => {
      console.log(error);
    });
  }
}
