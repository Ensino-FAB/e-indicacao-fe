import {BaseSearch} from '../core/models/base-search.model';


export interface CategoriaSearchModel extends BaseSearch {
  codigo: string;
  titulo?: string;
  descricao?: string;
  imageUrl?: string;
}
