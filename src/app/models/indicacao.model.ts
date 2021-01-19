import {BaseModel} from '../core/models/base.model';


export interface EventoModel extends BaseModel {
  eventoId: number;
  codOrganizacaoSolicitante: number;
  codOrganizacaoBeneficiada: number;
  codPessoa: number;
  justificativa: string;
  observacoes: string;
}

