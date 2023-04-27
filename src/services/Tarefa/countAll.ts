import { Tarefa } from ".";
import Api from "..";


export const countAll = async (): Promise<any> => {
    try {
      const { data } = await Api.get(`tarefa/localidade/count`);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao obter todos as tarefas');
    }
  };