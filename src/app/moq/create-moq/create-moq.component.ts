import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';

import {MOQ} from './moq.model';
import {MoqService} from '../moq.service';

@Component({
  selector: 'app-create-moq',
  templateUrl: './create-moq.component.html',
  styleUrls: ['./create-moq.component.css']
})
export class CreateMoqComponent implements OnInit {
  moqForm: FormGroup;
  moqModel: MOQ;
  message;
  action;

  constructor(private fb: FormBuilder, private router: Router, private moqService: MoqService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.moqForm = this.fb.group({
      id: [''],
      moqName: [''],
      moqDescription: [''],
      moqQuantity: ['']
    });
  }
  createMoq() {
    this.message = 'MOQ Created';
        this.moqModel = new MOQ();
    this.moqModel.moqName = this.moqForm.controls.moqName.value;
    this.moqModel.moqDescription = this.moqForm.controls.moqDescription.value;
    this.moqModel.moqQuantity = this.moqForm.controls.moqQuantity.value;
    this.moqService.createMOQ(this.moqModel).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.router.navigate(['/moq/viewmoq']);
    }, err => {
      console.log(err);
    });
  }
}
