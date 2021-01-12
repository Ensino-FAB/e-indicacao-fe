import {BaseModel} from "../core/models/base.model";


export interface Categoria extends BaseModel {
  id: number;
  titulo?: string;
  descricao?: string;
  imageUrl?: string;
}
