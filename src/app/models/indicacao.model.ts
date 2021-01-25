import { Evento } from './evento.model';
import { Organizacao } from './organizacao.model';
import { Pessoa } from './pessoa.model';
import {BaseModel} from '../core/models/base.model';


export interface Indicacao extends BaseModel {
  codOrganizacaoSolicitante: number;
  codOrganizacaoBeneficiada: number;
  codPessoa: number;
  justificativa: string;
  observacoes: string;
}

export interface IndicacaoResponse extends Indicacao{
  evento: Evento;
  pessoa: Pessoa;
  organizacaoSolicitante: Organizacao;
  organizacaoBeneficiada: Organizacao;
}