import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, from} from 'rxjs';
import {catchError,tap} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {Productos} from './models/productos';
import {Respuesta} from './models/respuesta';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  private readonly API_URL=environment.webUri;
  httpOptions={
     headers:new HttpHeaders({
       'Content-Type':'application/json',
       'Authorization':'Bearer '+JSON.parse(localStorage.getItem("token"))
     })
  }
   ListProductos():Observable<Productos[]>{
     return this.http.get<Productos[]>(this.API_URL+"/Productos/ListarProductos",this.httpOptions).pipe(
       tap((data)=>{console.log(JSON.stringify(data))
      }),
      catchError(err=>{throw console.log('Error del servidoer detalles'+JSON.stringify(err));})
     )
   }
   GuardarProductos(productos:Productos):Observable<Respuesta>{
     return this.http.post<Respuesta>(this.API_URL+"/Productos/GuardarProductos",productos,this.httpOptions).pipe(
        tap((data)=>{console.log(data)}),
        catchError(err=>{throw console.log('Error del servidor detalles'+JSON.stringify(err));})
     )
   }
   ObtenerProductoPorId(id:number):Observable<Productos>{
     return this.http.get<Productos>(this.API_URL+"/Productos/ObtenerProductos/"+id,this.httpOptions).pipe(
       tap((data)=>{console.log(data)}),
       catchError(err=>{throw console.log('Error del servidor detalles :'+JSON.stringify(err));}),
     )
   }
   EliminarProducto(id:number)
   {
     return this.http.delete<Respuesta>(this.API_URL+"/Productos/EliminarProductos/"+id,this.httpOptions).pipe(
       tap((respuesta)=>{console.log(respuesta)}),
       catchError(err=>{throw console.log("Error del servidor"+JSON.stringify(err))}),
     )
   }
   EditarProducto(id:number,productos:Productos):Observable<Respuesta>{
     return this.http.put<Respuesta>(this.API_URL+"/Productos/ActualizarProducto/"+id,productos,this.httpOptions).pipe(
       tap((respuesta)=>{
         console.log(respuesta);
       }),
       catchError(err=>{throw console.log("Error del servidor: "+JSON.stringify(err))})
     )
   }
}
