import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { ProductService } from '../product.service';
import { Product } from './product.model';
import { MOQ } from '../../moq/create-moq/moq.model';
import { SuperCategory } from '../../category/super-category/superCategory.model';
import { MainCategory } from '../../category/main-category/mainCategory.model';
import { SubCategory } from '../../category/sub-category/sub-category.model';
import { priceValue } from '../../shared/validation/price-validation';

import { Size } from './size.model';
import { MatTabChangeEvent, MatTab } from '@angular/material';
import { ProductSettings } from 'src/app/settings/product-settings/product-settings.model';


export interface PeriodicElement {
  /*  primeImage: string; */
  moqName: string;
  moqDescription: string;
  moqQuantity: string;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {
  @ViewChild('myDiv') myDivElementRef: ElementRef;
  selectedIndex = 0;
  matTab: MatTab;
  productForm: FormGroup;
  productModel: Product;
  productDetail: Product[];
  sizeDetailData: ProductSettings[];
  moqModel: MOQ;
  mainCategoryModel = new Array();
  subCategoryModel = new Array();
  superCategoryModel: SuperCategory[];
  filteredSuperCategory = new Array();
  filteredMainCategory = new Array();
  message;
  action;
  productId;
  moqId;
  searchText;
  showSkuError: boolean;
  skuFilter;
  categories;
  superCategoryName;
  mainCategoryName;
  showMainCategory: boolean;
  showMainCategoryError: boolean;
  showCategory: boolean;
  showSelectedMOQ: boolean;
  category;
  mainCategory;
  mainCategoryData: string;
  moqName;
  imageError: boolean;

  fileLength;
  selectRegion: number;
  fileToUpload;
  urls = new Array<string>();
  localArray: any = [];
  selected: string;
  regionSelectedSize;
  arryValue: any = [];
  confirmSize: any = [];
  sizeFilter = [];
  countryError;
  priceError: boolean;
  selecteValue: any = [];
  reader: FileReader = new FileReader();
  displayedColumns: string[] = ['moqName', 'moqDescription', 'moqQuantity'];
  moqData;
  material;
  color;
  sizeDetail;
  occasion;
  subCategoryError: boolean;
  showSubCategory: boolean;
  subCategoryName: any;
  subCategory;
  supCategoryDetails: SuperCategory;
  mainCategoryDetails: MainCategory;
  subCategoryDetails: SubCategory;
  productSettingsModel: ProductSettings;
  supCategoryId;
  mainCategoryId;
  subCategoryId;
  mainCategorySelected = false;
  subCategorySelected = false;
  sizeError = false;
  moqs = ['MOQ', 'NO MOQ'];
  moqTrue: number;
  sizeProduct: any = [];
  skuCodeVerifyTrue = false;
  sum = 0;
  mfgQtyError;
  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getSize();
    this.createForm();
    this.showSuperCategory();
    this.showMOQ();
    this.getProducts();
    this.getProductSettings();

    /* this.addProducts(); */
  }
  createForm() {
    this.productForm = this.fb.group({
      id: [''],
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      price: ['', priceValue],
      mrp: ['', priceValue],
      sp: ['', priceValue],
      size: ['', Validators.required],
      color: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      styleCode: ['', Validators.required],
      skuCode: ['', Validators.required],
      skuCodeValue: ['', Validators.required],
      region: ['', Validators.required],
      bulletPoints: ['', Validators.required],
      material: ['', Validators.required],
      occassion: ['', Validators.required],
      mfdQty: ['', priceValue],
      sizeQty: ['', priceValue],
      sizeName: ['', priceValue],
      moqProduct: ['', priceValue]
      /*  sizeVariant: this.fb.array([
       ]) */
    });
  }
  selecteMoq(e) {
    /* this.moqTrue = !this.moqTrue; */
    if (e.source.checked && e.value === 'MOQ') {
      /* console.log(e); */
      this.moqTrue = e.value;
      this.productForm.get('moqProduct').enable();
      this.productForm.controls.moqProduct.reset();
    } else {
      this.moqTrue = e.value;
      this.productForm.get('moqProduct').disable();
      this.productForm.controls.moqProduct.setValue(1);
    }
  }
  getProductSettings() {
    this.productService.getProductSettings().subscribe(data => {
      this.productSettingsModel = data;
      this.material = data[0].material;
      this.color = data[0].color;
      this.sizeDetail = data[0].size;
      this.occasion = data[0].occasion;

    }, err => {
      console.log(err);
    });
  }
  selectedIndexChange(val: number) {
    this.selectedIndex = val;
  }
  selectNextTab(tab) {
    if (tab !== 3) {
      this.selectedIndex = tab + 1;
    } else {
      this.selectedIndex = 3;
    }
  }
  selectPreviousTab(tab) {
    if (tab !== 0) {
      this.selectedIndex = tab - 1;
    } else {
      this.selectedIndex = 0;
    }
  }
  /* get sizeForms() {
    return this.productForm.get('sizeVariant') as FormArray;
  } */
  /* selectAllRegion() {
    for (let i = 0; i <= this.sizeDetailData.length - 1; i++) {
      const data = this.fb.group({
        sizeName: [this.sizeDetailData[i]],
        skuCode: [''],
      });
      this.sizeForms.push(data);
    }
  } */
  moqValidation() {
    let total = 0;
    for (let i = 0; i < this.confirmSize.length; i++) {
      total += this.confirmSize[i].sizeQty * this.productForm.controls.moqProduct.value;
    }
    return total;
  }

  selectedSize(size, qty, skuCode) {
    this.mfgQtyError = false;
    const sizeData = {
      sizeName: size,
      sizeQty: qty,
      skuCode: skuCode,
    };
    const newTotal: number = qty * this.productForm.controls.moqProduct.value;
    const value: number = +this.moqValidation() + newTotal;
    if (value <= this.productForm.controls.mfdQty.value) {
      this.selectedSizeDetails(sizeData);
    } else {
      this.mfgQtyError = true;
    }
    /* console.log('form data', this.confirmSize); */
  }
  selectedSizeDetails(sizeData) {
    this.sizeFilter =
      this.confirmSize.filter(data => data.sizeName.indexOf(sizeData.sizeName) !== -1);
    if (this.sizeFilter.length !== 0) {
      this.sizeError = true;
    } else {
      this.sizeError = false;
      this.confirmSize.push(sizeData);
    }
  }
  selectedSuperCategory(val) {
    this.category = val._id;
    this.superCategoryName = val.categoryName;
    this.filteredSuperCategory = this.superCategoryModel.filter(data => data._id === val._id);
    this.mainCategoryModel = this.filteredSuperCategory[0].mainCategory;
    if (this.mainCategoryModel.length !== 0) {
      this.showMainCategory = true;
      this.showMainCategoryError = false;
      this.showCategory = false;
    } else {
      this.showMainCategory = false;
      this.showMainCategoryError = true;
      this.showCategory = false;
    }
  }
  categorySelected(e) {
    this.mainCategorySelected = true;
    this.supCategoryDetails = e.value;
    this.supCategoryId = this.supCategoryDetails._id;
  }
  categoryMainCategory(e) {
    this.subCategorySelected = true;
    this.mainCategoryDetails = e.value;
    this.mainCategoryId = this.mainCategoryDetails._id;
  }
  categorySubCategory(e) {
    this.subCategoryDetails = e.value;
    this.subCategoryId = this.subCategoryDetails._id;
  }
  selectedSubCategory(subCategoryVal) {
    console.log(subCategoryVal);
    this.subCategory = subCategoryVal.subCategoryName;
    this.categories = subCategoryVal._id;
    this.showCategory = true;
    this.subCategoryError = false;
    this.subCategoryName = subCategoryVal.subCategoryName;
  }
  deleteSize(data) {
    this.sizeError = false;
    const index = this.confirmSize.indexOf(data);
    if (index > -1) {
      this.confirmSize.splice(index, 1);
    }
  }

  addSize(e, sizeData) {
    this.sizeError = false;
    /*    this.productForm.controls.sizeName.reset();*/
    /*  this.productForm.controls.sizePrice.reset();
     this.productForm.controls.sizeQty.reset(); */
    if (e.checked === true) {
      this.regionSelectedSize = sizeData;
      this.productForm.controls.sizeName.setValue(sizeData);
      this.productForm.controls.sizeQty.reset();
      this.productForm.controls.skuCode.reset();
    } else {
      this.productForm.controls.sizeQty.reset();
      this.productForm.controls.skuCode.reset();
      this.regionSelectedSize = '';
    }
  }
  handleFileInput(images: any) {
    this.imageError = false;
    this.fileToUpload = images;
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
  showMOQ() {
    this.productService.showMoq().subscribe(data => {
      this.moqModel = data;
      this.moqData = new MatTableDataSource<PeriodicElement>(data);
    }, err => {
      console.log(err);
    });
  }
  /* this.selectAllRegion(); */
  getSize() {
    this.productService.getProductSettings().subscribe(data => {
      this.sizeDetailData = data[0].size;
    }, err => {
      console.log(err);
    });
  }
  showSuperCategory() {
    this.productService.showAllSuperCategory().subscribe(data => {
      this.superCategoryModel = data;
    }, err => {
      console.log(err);
    });
  }
  getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.productDetail = data;
      console.log(this.productDetail);
    }, err => {
      console.log(err);
    });
  }

  selectedCategory(categoryVal) {
    this.mainCategory = categoryVal._id;
    this.mainCategoryData = categoryVal.mainCategoryName;
    this.categories = categoryVal._id;
    this.showCategory = true;
  }
  selectedMainCategory(categoryVal) {
    this.mainCategory = categoryVal.mainCategoryName;
    this.showCategory = false;
    this.filteredMainCategory = this.mainCategoryModel.filter(data => data._id === categoryVal._id);
    this.subCategoryModel = this.filteredMainCategory[0].subCategory;
    if (this.subCategoryModel.length !== 0) {
      this.showSubCategory = true;
      this.subCategoryError = false;
    } else {
      this.showSubCategory = false;
      this.subCategoryError = true;
    }
  }
  deleteCategory(data) {
    const index = this.categories.indexOf(data);
    if (index > -1) {
      this.categories.splice(index, 1);
    }
  }
  skuCodeVerify(skuCode) {
    const confirmFilter = this.confirmSize.filter(data => data.skuCode === skuCode);
    console.log(confirmFilter);
    const filterData = this.productDetail.filter(data => data.size.some(newData =>
      newData.skuCode === skuCode));
    if (confirmFilter.length !== 0) {
      this.skuCodeVerifyTrue = true;
    } else if (filterData.length !== 0) {
      this.skuCodeVerifyTrue = true;
    } else {
      this.skuCodeVerifyTrue = false;
    }
    /* this.productDetail.forEach(element => {
      if (element.skuCode === elem) {
        element.skuCodeVerify = true;
      } else {
        element.skuCodeVerify = false;
      }
    }); */
  }
  selectedMOQ(event, data) {
    this.moqId = data._id;
    this.moqName = data.moqName;
    this.showSelectedMOQ = true;
  }
  validateProducts() {
    if (this.productForm.controls.productName.value === ''
      || this.fileToUpload === undefined || this.productForm.controls.styleCode.value === '') {
      this.selectedIndex = 0;
      if (this.fileToUpload === undefined) {
        this.imageError = true;
      } else {
        this.imageError = false;
      }
    } else {
      this.addProducts();
    }
  }
  addProducts() {
    this.message = 'Product added successfully';
    this.productModel = new Product();
    this.productModel.productName = this.productForm.controls.productName.value;
    this.productModel.productDescription = this.productForm.controls.productDescription.value;
    this.productModel.price = this.productForm.controls.price.value;
    this.productModel.color = this.productForm.controls.color.value;
    this.productModel.mfdQty = this.productForm.controls.mfdQty.value;
    this.productModel.styleCode = this.productForm.controls.styleCode.value.toUpperCase();
    this.productModel.skuCode = this.productForm.controls.skuCode.value.toUpperCase();
    this.productModel.superCategoryId = this.supCategoryId;
    this.productModel.mainCategoryId = this.mainCategoryId;
    this.productModel.subCategoryId = this.subCategoryId;
    this.productModel.bulletPoints = this.productForm.controls.bulletPoints.value;
    this.productModel.height = this.productForm.controls.height.value;
    this.productModel.weight = this.productForm.controls.weight.value;
    this.productModel.occassion = this.productForm.controls.occassion.value;
    this.productModel.moq = this.productForm.controls.moqProduct.value;
    this.productModel.spPrice = this.productForm.controls.sp.value;
    this.productModel.mrpPrice = this.productForm.controls.mrp.value;
    // detials
    this.productModel.material = this.productForm.controls.material.value;
    this.productModel.size = this.confirmSize;
    this.productService.addProduct(this.productModel).subscribe(data => {
      this.productId = data._id;
      this.uploadImages(this.productModel.styleCode);
    }, error => {
      console.log(error);
    });
  }
  subProduct(path, productModel) {
    this.productService.addRegionService(path,
      productModel).subscribe(data => {
        console.log(data);
        this.snackBar.open(this.message, this.action, {
          duration: 3000,
        });
      });
  }

  uploadImages(skucode) {
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    }
    this.productService.uploadImages(formData, skucode).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
  }
  redirect() {
    this.router.navigate(['product/viewproducts']);
  }
}
