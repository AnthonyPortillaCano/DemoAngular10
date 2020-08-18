import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Productos} from '../models/productos';
import {Router}from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
   displayedColumns:string[]=['id','nombre','precio','tipo'];
   data:Productos[]=[];
   isLoadingResults=true;
  constructor(private router:Router,private api:ApiService) { }

  ngOnInit(): void {
    this.api.ListProductos().subscribe((res:Productos[])=>{
      this.data=res;
      this.isLoadingResults=false;
    },err=>{
      console.log(err);
      this.isLoadingResults=false;
    })

  }
  CerrarSesion()
  {
    localStorage.removeItem("token");
    this.router.navigate(['login']);
  }
}
