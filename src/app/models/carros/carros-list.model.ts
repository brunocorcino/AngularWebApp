import { BaseModel } from "../base/base.model";

export interface CarroList extends BaseModel {
    modelo: string;
    marca: string;
    anoFabricacao: number;
    anoModelo: number;
    automatico: boolean;
}