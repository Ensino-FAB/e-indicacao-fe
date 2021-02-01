import { BaseModel } from './base.model';

export interface User extends BaseModel {
  nome: string;
  nrCpf: string;
  roles?: string[];
}
