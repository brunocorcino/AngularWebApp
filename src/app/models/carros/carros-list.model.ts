import { BaseModel } from "../base/base.model";

export interface CarrosList extends BaseModel {
    modelo: string;
    marca: string;
    anoFabricacao: number;
    anoModelo: number;
    automatico: boolean;
}