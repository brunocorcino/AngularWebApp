import { Injectable } from "@angular/core";
import { HttpService } from "../shared/http.service";

@Injectable({
    providedIn: 'root'
})
export abstract class BaseService {
    private urlApi: string;

    constructor(protected httpService: HttpService) {
        this.urlApi = this.getApiControllerPath();
    }

    abstract getApiControllerPath(): string;

    protected getUrl(): string {
        return this.urlApi;
    }

    getUrlSeparator(url: string) {
        return url.slice(-1) === '/' ? '' : '/'
    }
}