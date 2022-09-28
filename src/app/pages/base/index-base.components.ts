import { Component, Inject, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { Alertas } from "src/app/constants/messages/alertas";
import { BaseFilterParams } from "src/app/filter-params/base/base.filter-params";
import { ApiResult } from "src/app/models/shared/api-result";
import { BaseCRUDService } from "src/app/services/base/base-crud.service";
import { AlertService } from "src/app/services/shared/alert.service";

@Component({
    template: ''
})
export abstract class IndexBaseComponent<TList, TFilter extends BaseFilterParams, TService extends BaseCRUDService>
implements OnInit {

    public showGrid: boolean = false;
    public rows: MatTableDataSource<TList> = new MatTableDataSource<TList>();
    public filterParams: TFilter;

    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        protected alertService: AlertService,
        @Inject(BaseCRUDService) protected service: TService
    ) {
        this.filterParams = this.newFilterParams();
    }

    protected abstract newFilterParams(): TFilter;
    
    ngOnInit(): void { }

    protected getFilterParams(): TFilter {
        return this.filterParams;
    }
    
    getDataFromServer(filterParams: any): Observable<ApiResult<TList[]>> {
        return this.service.list(filterParams);
    }

    dataLoaded(data: any): void {
        this.rows = new MatTableDataSource(this.mapToRows(data));
    }

    protected mapToRows(data: any): TList[] {
        return data;
    }

    list(): Subscription {
        return this.getDataFromServer(this.getFilterParams()).subscribe({
            next: (data) => {
                this.dataLoaded(data);
                this.showGrid = true;
            },
            error: (erro) => this.showError(erro.message || erro)
        })
    }

    novo(): void {
        this.router.navigate(['../create'], { relativeTo: this.route });
    }

    editar(id: string) {
        this.router.navigate([`../edit/${id}`], {relativeTo: this.route});
    }

    deletar(id: string) {
        this.alertService.confirm(
            Alertas.confirmarExclusao,
            () => {this.deleteConfirmed(id);},
            () => {}
        );
    }

    protected deleteConfirmed(id: any): void {
        this.service.delete(id).subscribe({
            next: () => {
                this.alertService.showSuccess(Alertas.registroExcluidoComSucesso);
                this.list();
            },
            error: (erro) => this.showError(erro.message || erro)
        })
    }

    private showError(message: string) {
        this.alertService.showError(message);
    }
}