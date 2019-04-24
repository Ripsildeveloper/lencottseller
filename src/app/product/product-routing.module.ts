import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {AddProductComponent} from './add-product/add-product.component';
import {ViewProductsComponent} from './view-products/view-products.component';
import {ViewSingleProductComponent} from './view-single-product/view-single-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [{
  path: 'addproducts',
  component: AddProductComponent
},
{
  path: 'viewproducts',
  component: ViewProductsComponent
},
{
  path: 'productdetail/:id',
  component: ViewSingleProductComponent
},
{
  path: 'editproduct',
  component: EditProductComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
