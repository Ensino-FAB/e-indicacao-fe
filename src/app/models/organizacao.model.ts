import { BaseModel } from '../core/models/base.model';

export interface Organizacao extends BaseModel {
    nome: string;
    sigla: string;
    cdOrg?: string;
}
