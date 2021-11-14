import { AppDataState, DataStateEnum } from './../../state/product.state';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$?:Observable<AppDataState<Product[]>>;
  readonly DataStateEnum=DataStateEnum;
  constructor(private productsService: ProductsService, private router:Router) { }

  ngOnInit(): void {
  }
  onGetAllProducts(){
    console.log("start...")
    this.products$=
      this.productsService.getAllProducts().pipe(
        //l operateur map reçoit une donnée data: liste des produits et puis on retourne 
        //un objet
        map(data=>{
          console.log(data)
          return ({dataState:DataStateEnum.LOADED,data:data})
        }),
        //retourner qlq chose avant meme que la req soit envoyé
        startWith({dataState:DataStateEnum.LOADING}),
        //le 3eme op s'il y a des erreurs
        catchError(err=>of({dataStat:DataStateEnum.ERROR,errorMessage:err.message}))

      );
 }
 onGetSelectedProducts(){
  this.products$=
    this.productsService.getSelectedProducts().pipe(
      map(data=>{
        console.log(data)
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataStat:DataStateEnum.ERROR,errorMessage:err.message}))
    );
 }
 onGetAvailableProducts(){
  this.products$=
    this.productsService.getAvailableProducts().pipe(
      map(data=>{
        console.log(data)
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataStat:DataStateEnum.ERROR,errorMessage:err.message}))
    );
 }
 onSearch(dataForm:any){
  this.products$=
    this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data=>{
        console.log(data)
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataStat:DataStateEnum.ERROR,errorMessage:err.message}))
    );
 }
 onSelect(p:Product){
   this.productsService.select(p)
      .subscribe(data=>{
        p.selected=data.selected;
      })

 }
 onDelete(p:Product){
   let v=confirm("Are you sure you want to delete this product?");
   if(v==true)
  this.productsService.deleteProduct(p)
     .subscribe(data=>{
       this.onGetAllProducts();
     })

}
onNewProduct(){
    this.router.navigateByUrl("/new-product")
}
onEdit(p:Product){
    this.router.navigateByUrl("/editProduct/"+p.id)
}
  /*
  onGetAllProducts(){
     this.productsService.getAllProducts().subscribe(data=>{
       this.products=data;
     },err=>{
       console.log(err)
     })
  }
  /*2eme methode c'est d'utiliser un observable: Observable<Product[]>
  et donc on fait: this.products=this.productsService.getAllProducts();
  on fait products$ pour dire que c'est une var Observable.
  pour faire le subscribe dans une var de type Observable dans la partie html
  on fait: "let p of products$ | async"
  */

}
