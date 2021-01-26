import {BaseSearch} from '../core/models/base-search.model';
import {Evento} from "./evento.model";


export interface EventoSearchModel extends BaseSearch {
  nome: string;
  id: number;
  evento: Evento;
}
