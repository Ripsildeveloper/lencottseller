import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource , MatSort} from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { MatStepper } from '@angular/material';
import {Promotion} from './promotion.model';
import {Product} from '../../product/add-product/product.model';
import {priceValue} from '../../shared/validation/price-validation';

import {SettingsService} from '../settings.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  promotionForm: FormGroup;
  promotionModel: Promotion;
  productModel: Product;
  selection = new SelectionModel<Product>(true, []);
  imageNameFilter;
  showImageNameError = false;
  message;
  action;
  subProductModel: Product;
  productNameFilter = new FormControl('');
  productSkuCodeFilter = new FormControl('');
  productData;
  allProducts;
  clickedProducts;


  fileLength;
  fileToUpload;
  urls = new Array<string>();
  displayedColumns: string[] = ['select', 'primeImage', 'productName', 'styleCode', 'skuCode', ];
  constructor(private fb: FormBuilder, private router: Router, private settingService: SettingsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getAllProducts();
  }
  createForm() {
    this.promotionForm = this.fb.group({
      id: [''],
      promotionTitle: [''],
      position: ['', priceValue],
      selectedProducts: ['']
    });
  }

  getAllProducts() {
    this.settingService.getProducts().subscribe(data => {
      this.productData = new MatTableDataSource<Product>(data);
      this.productData.sort = this.sort;
      this.productData.paginator = this.paginator;
      this.productData.filterPredicate = this.createProductFilter();
    }, err => {
      console.log(err);
    });
  }
  masterToggle() {
    const page: { startIndex: number, endIndex: number } = this.findStartEndIndices();

    const sortedData = this.productData._orderData(this.productData.data);
    if (this.isAllSelected()) {
      sortedData.slice(page.startIndex, page.endIndex).forEach(row => {
        this.selection.deselect(row);
      });
      console.log(this.selection.selected);
    } else {
      sortedData.slice(page.startIndex, page.endIndex).forEach(row => {
        this.selection.select(row);
      });
      /*  this.map1 = this.selection.selected.map(x => x.mobileNumber);
       console.log(this.map1); */
    }
    this.newTest();
  }
  rowToggle(row) {
    this.selection.toggle(row);
    row.selected = !row.selected;
    this.newTest();
  }
  newTest() {
    this.allProducts = '';
    this.clickedProducts = this.selection.selected.map(x => x.productId);
    this.promotionForm.controls.selectedProducts.setValue(this.clickedProducts);
  }
  createProductFilter(): (data: any, filter: string) => boolean {
    const filterFunction = function (data, filter): boolean {
      const searchTerms = JSON.parse(filter);
      return data.productName.toLowerCase().indexOf(searchTerms.productName) !== -1 &&
        data.skuCode.toLowerCase().indexOf(searchTerms.skuCode) !== -1;
    };
    return filterFunction;
  }
  private findStartEndIndices(): { startIndex: number, endIndex: number } {
    const pageIndex = this.productData.paginator.pageIndex;
    const pageSize = this.productData.paginator.pageSize;
    const total = this.productData.paginator.length;
    const startIndex = pageIndex * pageSize;
    const endIndex = (startIndex + pageSize) > total ? total : startIndex + pageSize;
    return { startIndex: startIndex, endIndex: endIndex };
  }
  isAllSelected() {
    const page: { startIndex: number, endIndex: number }
      = this.findStartEndIndices();
    const sortedData = this.productData._orderData(this.productData.data);
    const numSelected = sortedData.slice(page.startIndex, page.endIndex)
      .filter(row => this.selection.isSelected(row)).length;

    return numSelected === (page.endIndex - page.startIndex);
  }
  isAtLeaseOneSelected() {
    if (this.productData.length === 0) {
      console.log(this.productData.length);
    } else {
      const page: { startIndex: number, endIndex: number } =
        this.findStartEndIndices();
      const sortedData = this.productData._orderData(this.productData.data);
      const numSelected = sortedData.slice(page.startIndex, page.endIndex)
        .filter(row => this.selection.isSelected(row)).length;
      return numSelected > 0;
    }
  }

  createPromotions() {
    this.message = 'Promotions Created';
    this.promotionModel = new Promotion();
    this.promotionModel.productId = this.clickedProducts;
    this.promotionModel.promotionPosition =  this.promotionForm.controls.position.value;
    this.promotionModel.promotionTitle =  this.promotionForm.controls.promotionTitle.value;
    this.settingService.addPromotion(this.promotionModel).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });
      this.router.navigate(['settings/viewpromotions']);
    }, err => {
      console.log(err);
    });
  }
}
