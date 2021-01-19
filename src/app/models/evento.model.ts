import {BaseModel} from '../core/models/base.model';


export interface EventoModel extends BaseModel {
  categoriaId: number;
  codOrganizacaoGestora: number;
  dataInicio: Date;
  dataInicioIndicacao: Date;
  dataTermino: Date;
  dataTerminoIndicacao: Date;
  descricao: string;
  nome: string;
  observacoes: string;
  sigla: string;
  statusEvento: StatusEvento;
  ticket: string;
}

export interface StatusEvento {
  descricao: string;
}
