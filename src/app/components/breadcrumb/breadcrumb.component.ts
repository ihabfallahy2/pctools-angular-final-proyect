import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  currentRoute = "";

  constructor(public ruta:Router) { 
    
    // console.log(ruta.url);
    const str = ruta.url;
    const newStr = str.slice(1, -1)
    console.log(newStr)

    this.currentRoute = newStr;

  }

  ngOnInit(): void {
  }

}
