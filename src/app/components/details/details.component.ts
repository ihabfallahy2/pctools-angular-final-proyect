import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  details: any;

  constructor(public product:ProductService,public ruta:Router) { 

    if(this.product.detailsCod){
      this.product.searchSpecificProductFirebase(this.product.detailsCod);
      this.details = this.product.ntf;
    }else{
      this.ruta.navigate(['']);
    }
    
  }

  ngOnInit(): void {
  }

}
