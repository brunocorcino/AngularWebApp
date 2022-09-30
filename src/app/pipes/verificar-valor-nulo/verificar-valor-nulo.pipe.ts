import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'verificarValorNulo'})
export class VerificarValorNuloPipe implements PipeTransform {
  transform(value: boolean): string {
      return value ? 'Sim' : 'Não';
  }
}
