import {Organizacao} from './organizacao.model';
import {BaseModel} from './../core/models/base.model';
import {BaseSearch} from '../core/models/base-search.model';


export interface Pessoa extends BaseModel {
  nome?: string;
  nrCpf?: string;
  nrOrdem?: string;
  siglaPosto?: string;
  email?: string;
  contatoPrincipal?: string;
  organizacao?: Organizacao;
}

export interface PessoaSearch extends BaseSearch {
  nome?: string;
}

export interface PessoaLogada{
  pessoa: Pessoa;
  roles: string[];
}
