import {BaseModel} from '../core/models/base.model';
import {Categoria} from "./categoria.model";
import {Organizacao} from "./organizacao.model";


export interface Evento extends BaseModel {
  categoriaId: number;
  categoria?: Categoria;
  codOrganizacaoGestora: number;
  organizacaoResponse: Organizacao;
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
