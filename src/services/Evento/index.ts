export interface Evento {
  id_evento?: number;
    prioridade: string;
    status: string;
    tipo: string;
    categoria: string;
    descricao: string;
    data_hora_inicio: Date;
    data_hora_fim: Date;
    tarefas: any[];
  }