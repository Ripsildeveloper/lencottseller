import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import {
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatSnackBarModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatRippleModule,
  MatDialogModule,
  MatChipsModule,
  MatInputModule,
  MatFormFieldModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatTabsModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import {ProductRoutingModule} from './product-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import {ProductService} from './product.service';
import { ViewProductsComponent } from './view-products/view-products.component';
import { ViewSingleProductComponent } from './view-single-product/view-single-product.component';
import { ProductDetailsViewComponent } from './product-details-view/product-details-view.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { UpperCaseDirective } from './add-product/upper-case.directive';


@NgModule({
  declarations: [AddProductComponent, ViewProductsComponent, ViewSingleProductComponent, ProductDetailsViewComponent, UpperCaseDirective,
     EditProductComponent ],
  imports: [
    HttpClientModule,
    ProductRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    MatStepperModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatRadioModule,
    MatExpansionModule,
    FormsModule

      ],
  providers:
   [
    ProductService
   ]
})
export class ProductModule { }
