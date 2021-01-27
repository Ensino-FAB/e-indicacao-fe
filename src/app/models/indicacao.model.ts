import {BaseModel} from '../core/models/base.model';
import {Organizacao} from "./organizacao.model";
import {Pessoa} from "./pessoa.model";
import {Evento} from "./evento.model";


export interface Indicacao extends BaseModel {
  codOrganizacaoSolicitante: number;
  codOrganizacaoBeneficiada: number;
  codPessoa: number;
  justificativa: string;
  observacoes: string;
  organizacaoBeneficiada?: Organizacao;
  organizacaoSolicitante?: Organizacao;
  pessoa?: Pessoa;
  evento?: Evento
}

