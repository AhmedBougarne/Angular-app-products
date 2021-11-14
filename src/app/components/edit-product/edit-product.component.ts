import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  
  productId:number;
  productFormGroup=new FormGroup({});
  submitted:boolean=false;
  //recupérer l'id
  constructor(private activatedRoute:ActivatedRoute,
              private ps:ProductsService,
              private fb: FormBuilder) { 
         this.productId=activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    //charger le produit à editer
    this.ps.getProduct(this.productId)
    .subscribe(product=>{
      this.productFormGroup=this.fb.group({
        id:[product.id,Validators.required],
        name:[product.name,Validators.required],
        price:[product.price,Validators.required],
        quantity:[product.quantity,Validators.required],
        selected:[product.selected,Validators.required],
        available:[product.available,Validators.required]
      })
    });
  }
  onUpdateProduct(){
    this.submitted=true
    if(this.productFormGroup.invalid) return;
    this.ps.updateProduct(this.productFormGroup.value)
       .subscribe(data=>{
         alert("Success updating product.")
       });
 }

}
