import { NavBarComponent } from './../nav-bar/nav-bar.component';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productFormGroup=new FormGroup({});
  submitted?:boolean=false;
  constructor(private fb:FormBuilder,private productsService:ProductsService) {
   }

  ngOnInit(): void {
    this.productFormGroup=this.fb.group({
      name:["",Validators.required],
      price:[0,Validators.required],
      quantity:[0,Validators.required],
      selected:[true,Validators.required],
      available:[true,Validators.required]
    })
  }
  onSaveProduct(){
     this.submitted=true
     if(this.productFormGroup.invalid) return;
     this.productsService.saveProduct(this.productFormGroup?.value)
        .subscribe(data=>{
          alert("Success saving product.")
        })
  }

}
