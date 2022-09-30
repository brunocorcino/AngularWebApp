import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CarrosEdit } from 'src/app/models/carros/carros-edit.model';
import { CarrosService } from 'src/app/services/carros.service';
import { AlertService } from 'src/app/services/shared/alert.service';
import { EditBaseComponent } from '../../base/edit-base.component';
import { Erros } from 'src/app/constants/messages/erros';
import { MarcasFilterParams } from 'src/app/filter-params/marcas.filter-params';
import { MarcasService } from 'src/app/services/marcas.service';
import { MarcasList } from 'src/app/models/marcas/marcas-list.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent extends EditBaseComponent<CarrosEdit, CarrosService> {
  constructor(route: ActivatedRoute,
    router: Router,
    alertService: AlertService,
    service: CarrosService,
    private fb: FormBuilder,
    private marcasService: MarcasService) {
      super(route, router, alertService, service);
    }

  carrosForm = this.fb.group({
    modelo: [null, Validators.required],
    idMarca: [null, Validators.required],
    anoFabricacao: [null, Validators.required],
    anoModelo: [null, Validators.required],
    quantidadePortas: [null, Validators.required],
    automatico: [null, Validators.required]
  });

  listaMarcas: MarcasList[] = [];
  erros = Erros;

  getNewModelToCreate(): Observable<CarrosEdit> {
    return new Observable(observer => {
      const model: CarrosEdit = {
        anoFabricacao: new Date().getFullYear(),
        anoModelo: new Date().getFullYear(),
        automatico: false,
        idMarca: '',
        modelo: '',
        quantidadePortas: 4
      }
      observer.next(model);
    });
  }

  listarMarcas(): Subscription {
    const filter: MarcasFilterParams = {};

    return this.marcasService.list(filter).subscribe({
      next: (data) => {
        this.listaMarcas = data;
      }
    })
  }

  override dataLoaded(data: CarrosEdit): void {
    if (!this.listaMarcas.length) {
      this.listarMarcas();
    }

    super.dataLoaded(data);
  }

  override isValid(isSavingNew: boolean): boolean {
      let isValid = this.carrosForm.valid;

      if (!isValid) {
        this.carrosForm.markAllAsTouched();
        return isValid;
      }
      
      isValid = super.isValid(isSavingNew);

      return isValid;
  }
}
