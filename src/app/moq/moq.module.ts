import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  MatPaginatorModule,
  MatTableModule,
} from '@angular/material';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import {MoqRoutingModule} from './moq-routing.module';
import { CreateMoqComponent } from './create-moq/create-moq.component';
import {MoqService} from './moq.service';
import { ViewMoqComponent } from './view-moq/view-moq.component';

@NgModule({
  declarations: [CreateMoqComponent, ViewMoqComponent],
  imports: [
    HttpClientModule,
    MoqRoutingModule,
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
  ],
  providers:
  [
    MoqService
  ]
})
export class MoqModule { }
