import { ItemProposta } from './item-proposta.model';
import { BaseModel } from "../core/models/base.model";

export interface Proposta extends BaseModel {
    organizacaoMilitarId: string;
    eventoId: number;
    statusProposta: string;
    dataInclusao: Date;
    observacoes: string;
    itensProposta: ItemProposta[];
}