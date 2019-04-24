import { Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../product.service';
import { Product } from '../add-product/product.model';
import { MainCategory } from './../product-details-view/mainCategory.model';
import {Size} from '../add-product/size.model';

@Component({
  selector: 'app-view-single-product',
  templateUrl: './view-single-product.component.html',
  styleUrls: ['./view-single-product.component.css']
})
export class ViewSingleProductComponent implements OnInit {
  regionModel: Size;
  productModel: Product;
  productData;
  productId;
  primeHide: boolean;
  showImages: boolean;
  mainCategory: MainCategory[];
  showRelatedProducts;
  selectedImg;
  selectedSmallImg: any;
  relatedProducts = [];
  color = 'red';
  mainCatergoryName: string;

  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService, private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getProductById();
  }

  getProductById() {
    this.productService.getProductById(this.productId).subscribe(data => {
      console.log('single product', data);
      this.regionModel = data.region;
      if (data.styleCode === '' || data.styleCode === undefined || data.styleCode === null) {
        this.showRelatedProducts = false;
        this.productModel = data;
        this.regionModel = data.region;
        console.log(this.regionModel);
      } else {
        this.showRelatedProducts = true;
        this.productService.getRelatedProducts(data).subscribe(relatedProductData => {
          console.log('related products', relatedProductData);
          relatedProductData.forEach(element => {
            if (element._id !== this.productId) {
              this.relatedProducts.push(element);
            }
          });
          this.productModel = relatedProductData.find(e => e._id === this.productId);
         /*  console.log(this.productModel); */
        }, err => {
          console.log(err);
        });
      }
      this.getCategory();
    }, err => {
      console.log(err);
    });
  }

  getCategory()  {
    this.productService.showAllMainCategory().subscribe(data => {
      this.mainCategory = data;
      this.mainCategory.forEach(element => {
        if (element._id === this.productModel.subCategoryId)         {
          this.mainCatergoryName = element.mainCategoryName;
        }
      });
    }, err => {
      console.log(err);
    });
  }
  clickImg(data) {
    this.primeHide = true;
    this.showImages = true;
    this.selectedSmallImg = data;
    this.selectedImg = data;
  }
  relatedProduct(element) {
    this.relatedProducts.push(this.productModel);
    this.productModel = element;
    this.primeHide = false;
    this.showImages = false;
    const index = this.relatedProducts.indexOf(element);
    if (index !== -1) {
      this.relatedProducts.splice(index, 1);
    }
  }
}
