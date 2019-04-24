import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import { MOQ } from '../create-moq/moq.model';
import { MoqService } from '../moq.service';

export interface PeriodicElement {
  /*  primeImage: string; */
  moqName: string;
  moqDescription: string;
  moqQuantity: string;
  productQuantity: string;
  view: string;
  delete: string;
}

@Component({
  selector: 'app-view-moq',
  templateUrl: './view-moq.component.html',
  styleUrls: ['./view-moq.component.css']
})
export class ViewMoqComponent implements OnInit {
  displayedColumns: string[] = ['moqName', 'moqDescription', 'moqQuantity', 'productQuantity', 'view', 'delete'];
  moqForm: FormGroup;
  moqModel: MOQ[];
  moqData;
  message;
  action;
  productLength;
  singleMoq;

  constructor(private fb: FormBuilder, private router: Router, private moqService: MoqService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.viewMoq();
  }
  createForm() {
    this.moqForm = this.fb.group({
      id: [''],
      moqName: [''],
      moqDescription: [''],
      moqQuantity: ['']
    });
  }
  viewMoq() {
    this.moqService.viewMOQ().subscribe(data => {
      this.moqModel = data;
      this.moqData = new MatTableDataSource<PeriodicElement>(data);
    }, err => {
      console.log(err);
    });
  }
  deleteMOQ(element) {
    this.message = 'moq deleted';
    this.moqService.deleteMOQ(element).subscribe(data => {
      this.moqModel = data;
      this.moqData = new MatTableDataSource<PeriodicElement>(data);
      this.snackBar.open(this.message, this.action, {
        duration: 3000
      });
    }, err => {
      console.log(err);
    });
  }
 /*  viewSingleMOQ(element) {
this.singleMoq = this.moqModel.filter( val => val._id === element._id);
this.moqService.viewSingleMOQ(element).subscribe(data => {
  console.log(data);
}, err => {
  console.log(err);
});
  } */
}
