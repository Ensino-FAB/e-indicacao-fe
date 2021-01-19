import {BaseModel} from '../core/models/base.model';


export interface Categoria extends BaseModel {
  titulo?: string;
  descricao?: string;
  imageUrl?: string;
}
