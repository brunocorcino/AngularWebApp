import { BaseModel } from "../base/base.model";

export interface CarrosEdit extends BaseModel {
    idMarca: string;
    modelo: string;
    anoFabricacao: number;
    anoModelo: number;
    quantidadePortas: number;
    automatico: boolean;
}