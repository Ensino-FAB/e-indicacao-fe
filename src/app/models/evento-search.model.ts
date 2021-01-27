import {BaseSearch} from '../core/models/base-search.model';
import {Evento} from "./evento.model";
import {Categoria} from "./categoria.model";


export interface EventoSearchModel extends BaseSearch {
  nome: string;
  id: number;
  evento: Evento;
  categoria: Categoria;
}
