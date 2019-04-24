import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {


  productForm: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });
  }
  createForm() {
    this.productForm = this.fb.group({
      id: [''],
      productName: [''],
      productDescription: [''],
      price: [''],
      size: [''],
      color: [''],
      styleCode: [''],
      skuCode: [''],
      skuCodeValue: [''],
      region: [''],
      length: [''],
      breadth: [''],
      height: [''],
      material: [''],
      waterProof: [''],
      laptopSize: [''],
      closure: [''],
      compartments: [''],
      pockets: [''],
      confirmRegion: this.fb.array([
      ])
    });
  }
}
