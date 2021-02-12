import { IndicacaoResponse } from './indicacao.model';
import { BaseModel } from './../core/models/base.model';

export interface ItemPropostaRequest extends BaseModel {
    indicacaoId: number;
    prioridade: number;
}

export interface ItemPropostaResponse{
    id?: number;
    prioridade?: number;
    indicacao: IndicacaoResponse;
}
