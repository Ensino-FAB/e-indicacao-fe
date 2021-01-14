import {BaseModel} from '../core/models/base.model';


export interface Categoria extends BaseModel {
  id: number;
  codigo: string;
  titulo?: string;
  descricao?: string;
  imageUrl?: string;
}
