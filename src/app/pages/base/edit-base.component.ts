import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Alertas } from "src/app/constants/messages/alertas";
import { BaseCRUDService } from "src/app/services/base/base-crud.service";
import { AlertService } from "src/app/services/shared/alert.service";

@Component({
    template: ''
})
export abstract class EditBaseComponent<TEdit, TService extends BaseCRUDService>
implements OnInit {

    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        protected alertService: AlertService,
        @Inject(BaseCRUDService) protected service: TService
    ) {}

    public id: string = '';
    public model: any = {};
    public esconderBotaoExcluir: boolean = true;
    public manterNaMesmaPaginaAposSalvar: boolean = false;

    ngOnInit(): void {
        this.getNewModelToCreate().subscribe(data => {
            this.inicializar(data);
        });
    }
    
    abstract getNewModelToCreate(): Observable<TEdit>;

    protected inicializar(model: TEdit): void {
        this.route.params.subscribe((params: any) => {
            this.dataLoaded(model);

            if (params.id) {
                this.id = params.id;
                this.esconderBotaoExcluir = false;

                this.getDataFromServer(this.id).subscribe({
                    next: (data: TEdit) => {
                        this.dataLoaded(data);
                    },
                    error: (erro) => this.showError(erro.message || erro)
                });
            }
        });
    }

    isSavingNew(): boolean {
        return this.id === '';
    }

    save(manterNaMesmaPagina?: boolean): void {
        this.manterNaMesmaPaginaAposSalvar = manterNaMesmaPagina ?? false;

        const isSavingNew = this.isSavingNew();

        if (!this.isValid(isSavingNew)) {
            return;
        }

        if (isSavingNew === false) {
            this.update();
        } else {
            this.create();
        }
    }

    cancel(): void {
        if (this.isSavingNew()) {
            this.router.navigate(['../index'], {relativeTo: this.route});
        } else {
            this.router.navigate(['../../index'], {relativeTo: this.route});
        }
    }

    delete(): void {
        this.alertService.confirm(
            Alertas.confirmarExclusao,
            () => {this.deleteConfirmed();},
            () => {}
        );
    }

    protected deleteConfirmed(): void {
        this.service.delete(this.getDataToDelete()).subscribe({
            next: () => {
                this.showSuccessMessage(Alertas.registroExcluidoComSucesso, this.deleteSuccessCallback);
            },
            error: (erro) => this.showError(erro.message || erro)
        })
    }

    deleteSuccessCallback(): void {
        this.cancel();
    }

    getDataToDelete(): string {
        return this.id;
    }

    dataLoaded(data: TEdit): void {
        this.model = data;
    }

    getDataFromServer(id: string): Observable<TEdit> {
        return this.service.getById(id);
    }

    create(): void {
        this.service.create(this.getDataToCreate()).subscribe({
            next: (data) => {
                this.model = data;
                this.showSuccessMessage(Alertas.registroCriadoComSucesso, this.createSuccessCallback);
            },
            error: (erro) => this.showError(erro.message || erro)
        })
    }

    createSuccessCallback(): void {
        if (!this.manterNaMesmaPaginaAposSalvar) {
            this.router.navigate(['../index'], {relativeTo: this.route});
        } else {
            this.router.navigate([`../edit/${this.model.id}`], {relativeTo: this.route});
        }
    }

    getDataToCreate(): TEdit {
        return this.model;
    }

    update(): void {
        this.service.update(this.getDataToUpdate()).subscribe({
            next: (data) => {
                this.model = data;
                this.showSuccessMessage(Alertas.registroAlteradoComSucesso, this.updateSuccessCallback)
            },
            error: (erro) => this.showError(erro.message || erro)
        })
    }

    getDataToUpdate(): TEdit {
        return this.model;
    }

    updateSuccessCallback(): void {
        if (this.manterNaMesmaPaginaAposSalvar) {
            this.recarregarDados();
        } else {
            this.router.navigate(['../../index'], {relativeTo: this.route});
        }
    }

    isValid(isSavingNew: boolean): boolean {
        const cvm = isSavingNew ? 
            this.customValidationMessagesBeforeCreate() :
            this.customValidationMessagesBeforeUpdate();

        if (cvm.length > 0) {
            let msg = '';

            for (const mensagem of cvm) {
                msg += '\n\r' + mensagem;
            }

            this.alertService.showError(msg);
            return false;
        }

        return true;
    }

    customValidationMessagesBeforeCreate(): string[] {
        return [];
    }

    customValidationMessagesBeforeUpdate(): string[] {
        return [];
    }

    protected recarregarDados(): void {
        this.getDataFromServer(this.id).subscribe({
            next: (data: TEdit) => {
                this.dataLoaded(data);
            },
            error: (erro) => this.showError(erro.message || erro)
        })
    }

    private showError(message: string) {
        this.alertService.showError(message);
    }

    protected showSuccessMessage(message: string, callback: () => void) {
        if (message) {
            this.alertService.showSuccess(message);
        }

        if (callback !== undefined) {
            callback.bind(this)();
        }
    }
}