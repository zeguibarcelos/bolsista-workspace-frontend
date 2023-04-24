import { Evento } from "../Evento";
import { Tecnico } from "../Tecnico";

export interface Tarefa {
  id_tarefa?: number;
  descricao: string;
  status: string;
  evento: number;
  tecnicos?: Tecnico[];
  componentes?: any[]
}