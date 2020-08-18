import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {ApiService} from '../api.service';
import {Productos} from '../models/productos';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { identifierModuleUrl } from '@angular/compiler';
@Component({
  selector: 'app-productos-detalle',
  templateUrl: './productos-detalle.component.html',
  styleUrls: ['./productos-detalle.component.css']
})
export class ProductosDetalleComponent implements OnInit {
productos:Productos={id:0,nombre:'',precio:0,tipo:''};
isLoadingResults=true;
  constructor(private route:ActivatedRoute,private api:ApiService,private router:Router) { }

  ngOnInit(): void {
    this.obtenerProductoPorId(this.route.snapshot.params.id);
  }
   obtenerProductoPorId(id:number)
   {
     this.api.ObtenerProductoPorId(id).subscribe((data:any)=>{
       this.productos=data;
       console.log(this.productos);
       this.isLoadingResults=false;
     });
   }
   eliminarProductos(id:number)
   {
     this.isLoadingResults=true;
     this.api.EliminarProducto(id).subscribe(res=>{
       console.log(res);
       this.isLoadingResults=false;
       this.router.navigate(['/productos']);
     },(err)=>{console.log(err);
        this.isLoadingResults=false;
    })
   }

   setColor(status:string)
   {
      let color:string;
      if(status==='Positive')
      {
        color='orange-color';
      }
      else if(status==='Recovered')
      {
        color='green-color';
      }
      else
      {
        color= 'red-color';
      }

      return color;
   }
}
