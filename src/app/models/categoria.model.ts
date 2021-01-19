import {BaseModel} from '../core/models/base.model';


export interface Categoria extends BaseModel {
  codigo: string;
  titulo?: string;
  descricao?: string;
  imageUrl?: string;
}
