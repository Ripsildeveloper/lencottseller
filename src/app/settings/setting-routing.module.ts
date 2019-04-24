import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {BannersComponent} from './banners/banners.component';
import {ViewBannersComponent} from './view-banners/view-banners.component';
import {AdsComponent} from './ads/ads.component';
import {ViewAdsComponent} from './view-ads/view-ads.component';
import {PromotionsComponent} from './promotions/promotions.component';
import {ViewPromotionsComponent} from './view-promotions/view-promotions.component';
import {FooterComponent} from './footer/footer.component';
import {ViewFooterComponent} from './view-footer/view-footer.component';
import {ProductSettingsComponent} from './product-settings/product-settings.component';
import { HeaderComponent } from './header/header.component';


const routes: Routes = [{
  path: 'addbanners',
  component: BannersComponent
},
{
  path: 'viewbanners',
  component: ViewBannersComponent
},
{
  path: 'addhotproducts',
  component: AdsComponent
},
{
  path: 'viewhotproducts',
  component: ViewAdsComponent   // Hot products
},
{
  path: 'addpromotions',
  component: PromotionsComponent
},
{
  path: 'viewpromotions',
  component: ViewPromotionsComponent
},
{
  path: 'header',
  component: HeaderComponent
},
{
  path: 'footer',
  component: FooterComponent
},
{
  path: 'viewfooter',
  component: ViewFooterComponent
},
{
  path: 'products',
  component: ProductSettingsComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
