import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Erros } from "src/app/constants/messages/erros";
import { HttpService } from "../shared/http.service";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export abstract class BaseCRUDService extends BaseService {
    
    constructor(protected override httpService: HttpService) {
        super(httpService)
    }

    list(filterParams: any) {
        return this.httpService.get(this.getUrl(), filterParams);
    }

    getById(id: string) {
        const url = this.getUrl();
        return this.httpService.get(url + this.getUrlSeparator(url) + id, {})
            .pipe(map(data => {
                if (data) {
                    return data;
                }
                throw new Error(Erros.registroNaoEncontrado);
            }))
    }

    create(model: any) {
        return this.httpService.post(this.getUrl(), model);
    }

    update(model: any) {
        return this.httpService.put(this.getUrl(), model);
    }

    delete(id: string) {
        const url = this.getUrl();
        return this.httpService.delete(url + this.getUrlSeparator(url) + id);
    }
} 