import { Indicacao } from './indicacao.model';
import { BaseModel } from './../core/models/base.model';

export interface ItemProposta extends BaseModel {
    indicacao: Indicacao;
    prioridade: number;
}