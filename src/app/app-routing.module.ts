import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductosDetalleComponent } from './productos-detalle/productos-detalle.component';
import { AgregarProductosComponent } from './agregar-productos/agregar-productos.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';

const routes: Routes = [{path:'login',component:LoginComponent},{path:'productos',component:ProductosComponent},{path:'productosDetalle/:id',component:ProductosDetalleComponent},{path:'AgregarProductos',component:AgregarProductosComponent},{path:'editarProductos/:id',component:EditarProductosComponent},{path:'',redirectTo:'login',pathMatch:'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
