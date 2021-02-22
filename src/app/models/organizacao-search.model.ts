import {BaseSearch} from '../core/models/base-search.model';

export interface OrganizacaoSearchModel extends BaseSearch {
    nome?: string;
    sigla?: string;
    idsOrg?: number[];
}
