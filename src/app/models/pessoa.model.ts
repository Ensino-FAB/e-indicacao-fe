import { Organizacao } from './organizacao.model';
import { BaseModel } from './../core/models/base.model';

export interface Pessoa extends BaseModel {
  nome: string;
  nrCpf: string;
  nrOrdem: string;
  siglaPosto: string;
  email: string;
  contatoPrincipal: string;
  organizacao?: Organizacao;
}


export interface PessoaIndicada {
  index?: number;
  nome: string;
  siglaPosto: string;
  organizacaoBeneficiada: string;
  organizacaoSolicitante: string;
  organizacaoIndicado: string;
  justificativa: string;
  observacao: string;
  contatoPrincipal: string;
  email: string;
}
