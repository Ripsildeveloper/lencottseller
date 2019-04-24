import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {Product} from './add-product/product.model';
import {MainCategory} from '../category/main-category/mainCategory.model';
import {SuperCategory} from '../category/super-category/superCategory.model';
import {MOQ} from '../moq/create-moq/moq.model';
import {Size} from './add-product/size.model';
import {ProductSettings} from '../settings/product-settings/product-settings.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  serviceUrl: string = AppSetting.serviceUrl;

  constructor(private httpClient: HttpClient) { }
  showMoq(): Observable<any> {
    const categoryUrl = 'moqs';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<MOQ>(url);
  }
  showAllSuperCategory(): Observable<any> {
    const categoryUrl = 'categoryDetails';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<SuperCategory>(url);
  }
  showAllMainCategory(): Observable<any> {
    const categoryUrl = 'showMainCategory';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<MainCategory>(url);
  }
  addProduct(data: Product): Observable<any> {
    const categoryUrl = 'product';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.post<Product>(url, data);
  }
  addRegionService(subUrl, data: Product): Observable<any> {
    const categoryUrl = 'product';
    const url: string = subUrl + categoryUrl;
    return this.httpClient.post<Product>(url, data);
  }
  uploadAllImages(subUrl, data, skucode): Observable<any> {
    const addUrl = 'productimages/';
    const url: string = subUrl + addUrl + skucode ;
    return this.httpClient.put<Product>(url, data);
  }
  addMOQ(moqid, productid): Observable<any> {
    const categoryUrl = 'addMoq/';
    const productUrl = '/product/';
    const url: string = this.serviceUrl + categoryUrl + moqid + productUrl + productid;
    return this.httpClient.get<MOQ>(url);
  }
  uploadImages(data, styleCode): Observable<any> {
    const addUrl = 'productimages/';
    const url: string = this.serviceUrl + addUrl + styleCode ;
    return this.httpClient.put<Product>(url, data);
  }
getProducts(): Observable<any> {
  const categoryUrl = 'product';
  const url: string = this.serviceUrl + categoryUrl;
  return this.httpClient.get<Product>(url);
}
getAllRegions(): Observable<any> {
  const categoryUrl = 'regions';
  const url: string = this.serviceUrl + categoryUrl;
  return this.httpClient.get<Size>(url);
}
deleteProduct(data): Observable<any> {
  const deleteUrl = 'product/';
  const deleteUrl1 = '/sku/';
  const url: string = this.serviceUrl + deleteUrl + data._id + deleteUrl1 + data.styleCode;
  return this.httpClient.delete<Product>(url);
}
deleteDistributorProduct(path, skucode): Observable<any> {
  const deleteUrl = 'sku/';
  const url: string = path + deleteUrl + skucode ;
  return this.httpClient.delete<Product>(url);
}
getProductById(data): Observable<any> {
  const productUrl = 'product/';
  const url: string = this.serviceUrl + productUrl + data;
  return this.httpClient.get<Product>(url);
}
getRelatedProducts(data): Observable<any> {
  const productUrl = 'relatedproducts/';
  const productUrl1 = '/product/';
  const url: string = this.serviceUrl + productUrl + data.styleCode + productUrl1 + data._id;
  return this.httpClient.get<Product>(url);
}
editRegionDetails(elem, data, regionDetails: Size): Observable<any> {
  const addUrl = 'product/';
  const addurl1 = '/region/';
  const url: string = this.serviceUrl + addUrl + elem  + addurl1 + data;
  return this.httpClient.put<Product>(url, regionDetails);
}
editQtyDetails(elem,  productDetails: Product): Observable<any> {
  const addUrl = 'mfdqty/';
  const url: string = this.serviceUrl + addUrl + elem ;
  return this.httpClient.put<Product>(url, productDetails);
}

// product settings

getProductSettings(): Observable<any> {
  const categoryUrl = 'productSettings';
  const url: string = this.serviceUrl + categoryUrl;
  return this.httpClient.get<ProductSettings>(url);
}
}
