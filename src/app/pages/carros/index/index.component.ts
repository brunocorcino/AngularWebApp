import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarrosFilterParams } from 'src/app/filter-params/carros.filter-params';
import { MarcasFilterParams } from 'src/app/filter-params/marcas.filter-params';
import { CarrosList } from 'src/app/models/carros/carros-list.model';
import { MarcasList } from 'src/app/models/marcas/marcas-list.model';
import { CarrosService } from 'src/app/services/carros.service';
import { MarcasService } from 'src/app/services/marcas.service';
import { AlertService } from 'src/app/services/shared/alert.service';
import { IndexBaseComponent } from '../../base/index-base.components';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent extends IndexBaseComponent<CarrosList, CarrosFilterParams, CarrosService> {
  constructor(route: ActivatedRoute,
    router: Router,
    alertService: AlertService,
    service: CarrosService,
    private marcasService: MarcasService) {
      super(route, router, alertService, service);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['modelo', 'marca', 'anoFabricacaoModelo', 'automatico', 'actions'];

  listaMarcas: MarcasList[] = [];

  override ngOnInit(): void {
    this.listarMarcas();
  }

  override dataLoaded(data: any): void {
    super.dataLoaded(data);
    setTimeout(() => this.rows.paginator = this.paginator);
  }

  protected newFilterParams(): CarrosFilterParams {
    const filter: CarrosFilterParams = {
      ignorePagination: false,
      pageNumber: 1,
      pageSize: 100
    };

    return filter;
  }

  listarMarcas(): Subscription {
    const filter: MarcasFilterParams = {};

    return this.marcasService.list(filter).subscribe({
      next: (data) => {
        this.listaMarcas = data;
      }
    });
  }
}
