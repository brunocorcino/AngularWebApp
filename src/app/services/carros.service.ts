import { Injectable } from "@angular/core";
import { BaseCRUDService } from "./base/base-crud.service";
import { HttpService } from "./shared/http.service";

@Injectable({
    providedIn: 'root'
})
export class CarrosService extends BaseCRUDService {
    constructor(
        httpService: HttpService
    ) {
        super(httpService);
    }

    getApiControllerPath(): string {
        return '/api/carros';
    }
}