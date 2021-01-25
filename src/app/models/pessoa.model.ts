import { Organizacao } from './organizacao.model';
import { BaseModel } from './../core/models/base.model';
import {BaseSearch} from '../core/models/base-search.model';
import { Indicacao, IndicacaoResponse } from './indicacao.model';



export interface Pessoa extends BaseModel {
  nome: string;
  nrCpf: string;
  nrOrdem: string;
  siglaPosto: string;
  email: string;
  organizacao?: Organizacao;
}

export interface PessoaSearch extends BaseSearch {
  nome?: string;
}


export interface PessoaIndicada{
  prioridade?: number;
  indicacao: IndicacaoResponse;
}
