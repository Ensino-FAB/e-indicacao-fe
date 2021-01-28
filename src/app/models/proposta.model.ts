import { Evento } from './evento.model';
import { Organizacao } from './organizacao.model';
import { ItemProposta } from './item-proposta.model';
import { BaseModel } from "../core/models/base.model";

export interface Proposta{
    organizacaoMilitarId: string;
    eventoId: number;
    statusProposta: string;
    dataInclusao: Date;
    observacoes: string;
    itensProposta: ItemProposta[];
}

export interface PropostaResponse extends BaseModel {
    organizacao: Organizacao;
    evento: Evento;
    status: string;
    dataInclusao: Date;
    observacoes: string;
}