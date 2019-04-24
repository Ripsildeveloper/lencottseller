import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';

import {SuperCategory} from './superCategory.model';
import {CategoryService} from '../category.service';
import { copyStyles } from '@angular/animations/browser/src/util';
export interface PeriodicElement {
  categoryName: string;
  description: string;

}

@Component({
  selector: 'app-super-category',
  templateUrl: './super-category.component.html',
  styleUrls: ['./super-category.component.css']
})
export class SuperCategoryComponent implements OnInit {
  superCategoryForm: FormGroup;
  superCategoryModel: SuperCategory;
  categoryFilter;
  imageError: boolean;
  superCategoryFilter: SuperCategory[];
  superCategoryData;
  showCategoryName: boolean;
  checKCategoryName: boolean;
  displayedColumns: string[] = ['categoryName', 'description', 'delete'];
  fileLength;
  fileToUpload;
  urls = new Array<string>();
  selecteValue: any = [];
  reader: FileReader = new FileReader();
  savedLength;
  savedCategory: SuperCategory;
  constructor(private fb: FormBuilder, private router: Router, private categoryService: CategoryService ) { }

  ngOnInit() {
    this.createForm();
    this.getSuperCategory();
  }
  createForm() {
    this.superCategoryForm = this.fb.group({
      id: [''],
      categoryName: ['', Validators.required],
      description: [''],
      editCategory: ['']
    });
  }
  getSuperCategory() {
    this.categoryService.getSuperCategory().subscribe(data => {
      this.superCategoryModel = data;
      this.superCategoryFilter = data;
      this.superCategoryData = new MatTableDataSource<PeriodicElement>(data);
    });
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
  addSuperCategory() {
      this.superCategoryModel = new SuperCategory(
        this.superCategoryForm.controls.categoryName.value,
        this.superCategoryForm.controls.description.value,
      );
      this.categoryService.addSuperCategory(this.superCategoryModel).subscribe(data => {
        this.superCategoryFilter = data;
        this.superCategoryData = new MatTableDataSource<PeriodicElement>(data);
        /* this.savedLength = data.length - 1;
        this.savedCategory = data[this.savedLength];
        console.log(this.savedCategory._id); */
       /*  this.uploadImages(this.savedCategory._id); */
      });
      this.superCategoryForm.reset();
  }
 /*  uploadImages(id) {
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    }
    this.categoryService.uploadImages(formData, id).subscribe(data => {
      this.superCategoryFilter = data;
      this.superCategoryData = new MatTableDataSource<PeriodicElement>(data);
      this.urls = [];
    }, error => {
      console.log(error);
    });
  } */
  deleteSuperCategory(value) {
    this.categoryService.deleteSuperCategory(value).subscribe(deleteData => {
      this.superCategoryFilter = deleteData;
      this.superCategoryData = new MatTableDataSource<PeriodicElement>(deleteData);
    });
  }
  categoryVerify(val) {
   /*  this.superCategoryFilter.forEach(element => {
      if (element.categoryName === val ) {
        element.checkCategoryName = true;
        this.checKCategoryName = true;
      } else {
        element.checkCategoryName = false;
      }
    }); */
  }
  edit(cat) {
    this.superCategoryFilter.map(category => {
      cat.editing = false;
      console.log(category);
    });
    cat.editing = true;
  }
}
