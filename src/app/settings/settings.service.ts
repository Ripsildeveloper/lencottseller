import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {Banner} from './banners/banner.model';
import {BannerImageData} from './banners/bannerImageData.model';
import {Ads} from './ads/ads.model';
import {Promotion} from './promotions/promotion.model';
import {Footer} from './footer/footer.model';
import {Product} from '../product/add-product/product.model';
import { Header} from '../settings/header/header.model';
import {ProductSettings} from './product-settings/product-settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  serviceUrl: string = AppSetting.serviceUrl;

  constructor(private httpClient: HttpClient) { }

  uploadBanners(data , position): Observable<any> {
    const addUrl = 'banners/';
    const url: string = this.serviceUrl + addUrl + position ;
    return this.httpClient.put<boolean>(url, data);
  }

  getBanners(): Observable<any> {
    const categoryUrl = 'banners';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Banner>(url);
  }
  deleteBanner(data): Observable<any> {
    const deleteUrl = 'deletebanners/';
    const url: string = this.serviceUrl + deleteUrl + data._id ;
    return this.httpClient.delete<Banner>(url);
  }

   // header

   addLogo(data): Observable<any> {
    const footerUrl = 'createLogoImage';
    const url: string = this.serviceUrl + footerUrl ;
    return this.httpClient.post<Header>(url, data);
  }

  getHeaderDetails(): Observable<any> {
    const categoryUrl = 'headerDetails';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Header>(url);
  }
  // ads
  getAds(): Observable<any> {
    const categoryUrl = 'ads';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Ads>(url);
  }
  uploadAds(data , position): Observable<any> {
    const addUrl = 'ads/';
    const url: string = this.serviceUrl + addUrl + position ;
    return this.httpClient.put<boolean>(url, data);
  }
  deleteAds(data): Observable<any> {
    const deleteUrl = 'deleteads/';
    const url: string = this.serviceUrl + deleteUrl + data._id ;
    return this.httpClient.delete<Ads>(url);
  }

  // promotions
  addPromotion(data): Observable<any> {
    const footerUrl = 'promotions';
    const url: string = this.serviceUrl + footerUrl ;
    return this.httpClient.post<Promotion>(url, data);
  }

  getPromotions(): Observable<any> {
    const categoryUrl = 'promotions';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Promotion>(url);
  }
  deletePromotions(data): Observable<any> {
    const deleteUrl = 'deletepromotions/';
    const url: string = this.serviceUrl + deleteUrl + data._id ;
    return this.httpClient.delete<Promotion>(url);
  }

  // footer

  addFooterdetails(data: Footer): Observable<any> {
    const footerUrl = 'footer/';
    const url: string = this.serviceUrl + footerUrl ;
    return this.httpClient.post<Footer>(url, data);
  }
  uploadLogo(data , id): Observable<any> {
    const addUrl = 'createLogoImage/';
    const url: string = this.serviceUrl + addUrl + id ;
    return this.httpClient.put<boolean>(url, data);
  }

  getFooterDetails(): Observable<any> {
    const categoryUrl = 'footerDetails';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Ads>(url);
  }
  updateFooterDetails(data , id): Observable<any> {
    const addUrl = 'details/';
    const url: string = this.serviceUrl + addUrl + id ;
    return this.httpClient.put<Footer>(url, data);
  }
  // getProducts

  getProducts(): Observable<any> {
    const categoryUrl = 'product';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Product>(url);
  }

  // product settings

  addPriceRange(data: ProductSettings): Observable<any> {
    const settingsUrl = 'pricerange';
    const url: string = this.serviceUrl + settingsUrl;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  deletePriceRange(data): Observable<any> {
    const deleteUrl = 'removeprice';
    const url: string = this.serviceUrl + deleteUrl ;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  addColor(data: ProductSettings): Observable<any> {
    const settingsUrl = 'color';
    const url: string = this.serviceUrl + settingsUrl;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  deleteColor(data): Observable<any> {
    const deleteUrl = 'removecolor';
    const url: string = this.serviceUrl + deleteUrl ;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  addMaterial(data: ProductSettings): Observable<any> {
    const settingsUrl = 'material';
    const url: string = this.serviceUrl + settingsUrl;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  addOccasion(data: ProductSettings): Observable<any> {
    const settingsUrl = 'occasion';
    const url: string = this.serviceUrl + settingsUrl;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  addSize(data: ProductSettings): Observable<any> {
    const settingsUrl = 'size';
    const url: string = this.serviceUrl + settingsUrl;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  deleteMaterial(data): Observable<any> {
    const deleteUrl = 'removematerial';
    const url: string = this.serviceUrl + deleteUrl ;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  deleteOccasion(data): Observable<any> {
    const deleteUrl = 'removeoccasion';
    const url: string = this.serviceUrl + deleteUrl ;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  deleteSize(data): Observable<any> {
    const deleteUrl = 'removesize';
    const url: string = this.serviceUrl + deleteUrl ;
    return this.httpClient.post<ProductSettings>(url, data);
  }
  getProductSettings(): Observable<any> {
    const categoryUrl = 'productSettings';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<ProductSettings>(url);
  }
}
