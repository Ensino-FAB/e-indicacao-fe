import { BaseModel } from './base.model';
import {Organizacao} from "../../models/organizacao.model";

export interface User extends BaseModel {
  nome: string;
  nrCpf: string;
  roles?: string[];
  organizacao?: Organizacao;
}

