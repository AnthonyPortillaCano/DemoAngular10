import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormControl,FormGroupDirective,FormBuilder,FormGroup,NgForm,Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
export class MyErrorStateMatcher implements ErrorStateMatcher{
    isErrorState(control:FormControl | null,form:FormGroupDirective | NgForm | null):boolean{
      const isSubmitted=form && form.submitted;
      return !!(control && control.invalid && (control.dirty|| control.touched || isSubmitted ));
    }
}

@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.component.html',
  styleUrls: ['./agregar-productos.component.css']
})
export class AgregarProductosComponent implements OnInit {
   casesForm:FormGroup;
   nombre='';
   tipo='';
   precio:number=null;
   isLoadingResults=false;
   matcher=new MyErrorStateMatcher();
  constructor(private api:ApiService,private router:Router,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.casesForm=this.formBuilder.group({
      nombre:[null,Validators.required],
      tipo:[null,Validators.required],
      precio:[null,Validators.required]
    });
  }
   onFormSubmit()
   {
     this.isLoadingResults=true;
     this.api.GuardarProductos(this.casesForm.value).subscribe((res:any)=>{
       console.log(res);
       this.isLoadingResults=false;
       this.router.navigate(["productos"]);
     },(err:any)=>{
       console.log(err);
       this.isLoadingResults=false;
     })
   }
}
