import {BaseSearch} from '../core/models/base-search.model';
import {StatusEvento} from './evento.model';


export interface EventoSearchModel extends BaseSearch {
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
