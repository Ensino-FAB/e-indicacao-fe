import {BaseSearch} from '../core/models/base-search.model';


export interface EventoSearchModel extends BaseSearch {
  nome: string;
  id: number;
}
