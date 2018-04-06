import { Component, OnInit, OnChanges, Pipe } from '@angular/core';
import { IProduct } from './product'; //Importing the custom created interface
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';

@Component ({ //Component decorator where the selector for the template, the template URL and the stylesheet URL are defined
   // selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnChanges { //Implementing the OnInit and the OnChanges livehooks into the component livecycle
    
    pageTitle: string = 'Product List';
    
    imageVisibility = "hidden";
    buttonText = "Show Photos";

    _filterVar : string;

    get filterVar () : string { //Getter for _filterVar
        return this._filterVar;
    }
    set filterVar (value : string) { //Setter for _filterVar
        this._filterVar = value;
        this.filteredProducts = this._filterVar ? this.performFilter (this._filterVar) : this.products; //Conditional statement for filtering products
    }

    errorMessage = "";
    
    filteredProducts: IProduct[];

    products: IProduct[] //= [
    //     {productID: 1234, productName: 'Hammer', productCode: '01-23', releaseDate: 'N/A', price: 9.95, description: "Hammer", starRating: 4.3, imageURL: "https://openclipart.org/download/30583/construction-hammer-jon--01.svg"}, 
    //     {productID: 2345, productName: 'Screwdriver', productCode: '12-34', releaseDate: 'N/A', price: 19.99,  description: "Screwdriver", starRating: 3.7, imageURL: "https://openclipart.org/download/221832/cyberscooty-tournevis.svg"},
    //     {productID: 3456, productName: 'Drill', productCode: '23-45', releaseDate: 'N/A', price: 50.99,  description: "Drill", starRating: 4.6, imageURL: "https://openclipart.org/download/216781/Electric-screwdriver-by-Rones.svg"}
    // ];

    constructor (private _productService : ProductService) {
        
    }

    toggleImageVisibility () : void {
        if (this.imageVisibility == "visible") {
            this.imageVisibility = "hidden";
            this.buttonText = "Show Photos";
        }
        else {
            this.imageVisibility = "visible";
            this.buttonText = "Hide Photos";
        }
        console.log (this.displayDescription())
    }

    displayDescription () : string {
        let descriptionsArray: any = {};
        
        for (let value of this.products) {
            descriptionsArray[value.productCode] = value.description;
        }
        return descriptionsArray;
    }

    performFilter (filterBy : string) : IProduct[] {
        filterBy = filterBy.toLocaleLowerCase ();
        return this.products.filter ((product : IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    ngOnInit () : void {
        console.log ("Initializing");
        this._productService.getProducts()
            .subscribe (products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error => this.errorMessage = <any> error);
    }

    ngOnChanges () : void {
        console.log ("UI Change");
    }

    onRatingClicked (message : string) : void {
        console.log (message);
    }
}

@Pipe ({ //Pipe decorator defining the pipe name which allows it to be called in the DOM
    name: "convertToSpaces"
})

export class ConvertToSpaces {
    transform (value : string, character : string) : string {
        return value;
    }
}