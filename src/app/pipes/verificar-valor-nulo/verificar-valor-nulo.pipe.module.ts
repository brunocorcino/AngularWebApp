import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificarValorNuloPipe } from './verificar-valor-nulo.pipe';

@NgModule({
  declarations: [VerificarValorNuloPipe],
  exports: [VerificarValorNuloPipe],
  imports: [
    CommonModule
  ]
})
export class VerificarValorNuloPipeModule { }
