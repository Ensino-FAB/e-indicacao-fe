import { Organizacao } from './organizacao.model';
import { BaseModel } from './../core/models/base.model';

export interface Pessoa extends BaseModel {
    nome: string;
    nrCpf: string;
    nrOrdem: string;
    siglaPosto: string;
    email: string;
    organizacao?: Organizacao;
  }