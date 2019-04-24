import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import {AccountRoutingModule} from './account-routing.module';
import { ReactiveFormsModule} from '@angular/forms';
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
  MatPaginatorModule
} from '@angular/material';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AccountService } from './account.service';

@NgModule({
  declarations: [SigninComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    CommonModule,
    AccountRoutingModule,
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
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule { }
