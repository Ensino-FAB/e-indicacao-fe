import {Organizacao} from './organizacao.model';
import {BaseModel} from './../core/models/base.model';
import {BaseSearch} from '../core/models/base-search.model';

export interface Pessoa extends BaseModel {
  nome: string;
  nrCpf: string;
  nrOrdem: string;
  siglaPosto: string;
  email: string;
  organizacao?: Organizacao;
}

export interface PessoaSearch extends BaseSearch {
  nrCpf?: string;
  nome?: string;
  siglaPosto?: string;
  siglaQuadro?: string;
  siglaEspecialidade?: string;
  situacao?: string;
  email?: string;
  organizacaoMilitarId?: number;
  contatoPrincipal?: string;
}
