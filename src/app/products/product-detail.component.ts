import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = "Product Detail";
  errorMessage: string;
  product: IProduct;

  constructor (private _route: ActivatedRoute, private _productService: ProductService) { }

  ngOnInit() {
    let id = +this._route.snapshot.paramMap.get ("id");
    if (id) {
      const param = +id;
      this.getProduct (param)
    }
    this.pageTitle += `: ${id}`;
  }

  getProduct (id: number) {
    this._productService.getProduct(id).subscribe(
      product => {this.product = product; console.log (product)},
      error => this.errorMessage = <any>error);
  }
}
