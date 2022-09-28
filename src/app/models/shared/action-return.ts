import { Mensagem } from "./mensagem";

export interface ActionReturn {
    erro: boolean;
    mensagens: Mensagem[];
}