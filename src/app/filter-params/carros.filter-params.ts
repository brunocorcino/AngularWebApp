import { BaseFilterParams } from "./base/base.filter-params";

export interface CarrosFilterParams extends BaseFilterParams {
    idMarca?: string,
    modelo?: string
}