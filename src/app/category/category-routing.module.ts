import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {SuperCategoryComponent} from './super-category/super-category.component';
import {MainCategoryComponent} from './main-category/main-category.component';
import {SubCategoryComponent} from './sub-category/sub-category.component';


const routes: Routes = [{
  path: 'supercategory',
  component: SuperCategoryComponent
},
{
  path: 'maincategory',
  component: MainCategoryComponent
},
{
  path: 'subcategory',
  component: SubCategoryComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
