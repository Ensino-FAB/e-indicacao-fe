import {BaseModel} from '../core/models/base.model';


export interface Indicacao extends BaseModel {
  eventoId: number;
  codOrganizacaoSolicitante: number;
  codOrganizacaoBeneficiada: number;
  codPessoa: number;
  justificativa: string;
  observacoes: string;
}

