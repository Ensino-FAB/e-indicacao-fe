import {BaseSearch} from '../core/models/base-search.model';


export interface IndicacaoSearchModel extends BaseSearch {
  eventoId?: number;
  codOrganizacaoSolicitante?: string;
  codPessoa?: number;
}
