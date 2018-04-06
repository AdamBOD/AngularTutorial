import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { IProduct } from "./product"
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable ()

export class ProductService {
    private _productUrl = "./api/products/products.json";
    constructor (private _http : HttpClient) {

    }

    getProducts () : Observable <IProduct[]> {
        return this._http.get <IProduct[]>(this._productUrl)
                .do (data => console.log ("All: " + JSON.stringify (data)))
                .catch (this.handleError); //If the handleError function doesn't exist then all this code in the promise has type issues
    }

    getProduct(id: number): Observable<IProduct> {
        console.log ("ID: " + id);
        return this.getProducts()
            .map((products: IProduct[]) => products.find(p => p.productId === id));
    }

    private handleError (err : HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return Observable.throw(errorMessage);
    }
}