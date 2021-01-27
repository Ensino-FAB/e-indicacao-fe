import { Organizacao } from './organizacao.model';
import { BaseModel } from './../core/models/base.model';
import { Indicacao, IndicacaoResponse } from './indicacao.model';

export interface Pessoa extends BaseModel {
  nome: string;
  nrCpf: string;
  nrOrdem: string;
  siglaPosto: string;
  email: string;
  contatoPrincipal: string;
  organizacao?: Organizacao;
}


export interface PessoaIndicada{
  prioridade?: number;
  indicacao: IndicacaoResponse;
}
