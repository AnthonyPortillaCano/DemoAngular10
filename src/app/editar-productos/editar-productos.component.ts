import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';
import {FormControl,FormGroupDirective,FormGroup,NgForm,Validators, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Productos} from '../models/productos';
export class MyErrorStateMatcher implements ErrorStateMatcher{
  isErrorState(control:FormControl | null,form:FormGroupDirective | NgForm | null):boolean{
    const isSubmitted=form && form.submitted;
    return !!(control && control.invalid && (control.dirty|| control.touched || isSubmitted ));
  }
}
@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css']
})
export class EditarProductosComponent implements OnInit {
casesForm:FormGroup;
id:number=null;
nombre='';
precio:number=null;
tipo='';
isLoadingResults=false;
matcher=new MyErrorStateMatcher();
  constructor(private router:Router,private route:ActivatedRoute,private api:ApiService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.obtenerProductoPorId(this.route.snapshot.params.id);
    this.casesForm=this.formBuilder.group(
      {
        id:[null,Validators.required],
        nombre:[null,Validators.required],
        precio:[null,Validators.required],
        tipo:[null,Validators.required],
      }
    )

  }

  obtenerProductoPorId(id:number)
  {
    this.api.ObtenerProductoPorId(id).subscribe((data:Productos)=>{
      this.id=data.id;

      this.casesForm.setValue({
        id:data.id,
        nombre:data.nombre,
        precio:data.precio,
        tipo:data.tipo, 
      });
    });
      
  }
  onFormSubmit(){
    this.isLoadingResults=true;
    this.api.EditarProducto(this.id,this.casesForm.value).subscribe((res:any)=>{
      this.isLoadingResults=false;
      this.router.navigate(['/productos']);
    },(err:any)=>{
      console.log(err);
      this.isLoadingResults=false;
    }
    )

  }
}
