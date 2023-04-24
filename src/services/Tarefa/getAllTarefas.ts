import { Tarefa } from ".";
import Api from "..";


export const getAllTarefas = async (): Promise<Tarefa[]> => {
    try {
      const { data } = await Api.get<Tarefa[]>(`tarefa`);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao obter todos as tarefas');
    }
  };