import { Evento } from './evento.model';
import { Organizacao } from './organizacao.model';
import { ItemPropostaRequest, ItemPropostaResponse } from './item-proposta.model';
import { BaseModel } from '../core/models/base.model';

export interface PropostaRequest{
    codOrganizacao: number;
    eventoId: number;
    statusProposta: string;
    dataInclusao: Date;
    observacoes: string;
    itensProposta: ItemPropostaRequest[];
}

export interface PropostaResponse extends BaseModel {
    organizacao: Organizacao;
    evento: Evento;
    status: StatusProposta;
    dataInclusao: Date;
    observacoes: string;
    itensProposta: ItemPropostaResponse[];
}

export interface StatusProposta {
  status: [
    'ABERTA', 'FINALIZADA'
  ]
}
