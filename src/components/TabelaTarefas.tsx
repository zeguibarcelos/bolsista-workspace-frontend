import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getTarefaByEventoId } from "../services/Tarefa/getTarefaByEventoId";
import { Tarefa } from "../services/Tarefa";
import { createTarefa } from "../services/Tarefa/createTarefa";
import { Tecnico } from "../services/Tecnico";
import { getAllTecnicos } from "../services/Tecnico/getAllTecnicos";
import { Localidade } from "../services/Localidade";
import { getAllLocalidades } from "../services/Localidade/getAllLocalidades";
import { updateTarefa } from "../services/Tarefa/updateTarefa";

interface ITabelaTarefasProps {
  id_evento: number;
}

const TabelaTarefas: React.FC<ITabelaTarefasProps> = ({ id_evento }) => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("Em andamento");
  const [selectedTecnicos, setSelectedTecnicos] = useState<string[] | string>(
    []
  );
  const [componentes, setComponentes] = useState<string[] | string>([]);
  const [selectedLocalidade, setSelectedLocalidade] = useState<string>("");
  const [localidades, setLocalidades] = useState<Localidade[]>([]);
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);

  useEffect(() => {
    getAllTecnicos().then((tecnicos) => setTecnicos(tecnicos));
  }, []);

  useEffect(() => {
    getAllLocalidades().then((localidades) => {
      setLocalidades(localidades);
      console.log("localidades", localidades);
    });
  }, []);

  const handleAddTarefa = () => {
    createTarefa({
      descricao: descricao,
      eventoIdEvento: id_evento,
      status: status,
      tecnicos:
        typeof selectedTecnicos === "string"
          ? [{ matricula: Number(selectedTecnicos) }]
          : selectedTecnicos.map((selected) => {
              return { matricula: Number(selected) };
            }),

      componentes:
        typeof componentes === "string"
          ? [{ id_componente: Number(componentes) }]
          : componentes.map((selected) => {
              return { id_componente: Number(selected) };
            }),
    }).then(() => getTarefas());
  };

  useEffect(() => {
    getTarefas();
  }, []);

  function getTarefas() {
    getTarefaByEventoId(id_evento).then((task) => {
      setTarefas(task);
    });
  }

  const handleUpdateTarefa = (tarefa: Tarefa) => {
    updateTarefa({
      id_tarefa: tarefa.id_tarefa,
      descricao: tarefa.descricao,
      eventoIdEvento: tarefa.eventoIdEvento,
      status: "Concluída",
    }).then(() => getTarefas());
  };

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Descrição</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Localidade</TableCell>
            <TableCell>Componente</TableCell>
            <TableCell>Técnico</TableCell>
            <TableCell>Ação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tarefas.map((tarefa) => (
            <TableRow key={tarefa.id_tarefa}>
              <TableCell>{tarefa.descricao}</TableCell>
              <TableCell>{tarefa.status}</TableCell>
              <TableCell>
                {
                  localidades.find((localidade) =>
                    localidade.componentes.some((lcomponente) =>
                      tarefa.componentes?.some(
                        (componente) =>
                          componente.id_componente === lcomponente.id_componente
                      )
                    )
                  )?.descricao
                }
              </TableCell>
              <TableCell>
                {tarefa.componentes
                  ?.map((componente) => componente.descricao)
                  .join(", ")}
              </TableCell>
              <TableCell>
                {tarefa.tecnicos?.map((tecnico) => tecnico.nome).join(", ")}
              </TableCell>
              <TableCell>
                {" "}
                {tarefa.status !== "Concluída" && (
                  <Button
                    variant="contained"
                    onClick={() => handleUpdateTarefa(tarefa)}
                  >
                    Concluir tarefa
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <TextField
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                fullWidth
              />
            </TableCell>
            <TableCell>
              <Select
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value as string)}
                disabled
              >
                <MenuItem value="Em Andamento">A fazer</MenuItem>
              </Select>
            </TableCell>

            <TableCell>
              <Select
                fullWidth
                label="localidade"
                value={selectedLocalidade}
                onChange={(e) => setSelectedLocalidade(e.target.value)}
              >
                {localidades.map((localidade) => {
                  return (
                    <MenuItem value={localidade.id_localidade}>
                      {localidade.descricao}
                    </MenuItem>
                  );
                })}
              </Select>
            </TableCell>
            <TableCell>
              <Select
                fullWidth
                multiple
                label="componente"
                value={componentes}
                onChange={(e) => setComponentes(e.target.value)}
              >
                {localidades.map((localidade) => {
                  if (localidade.id_localidade === Number(selectedLocalidade)) {
                    return localidade.componentes.map((componente) => {
                      return (
                        <MenuItem value={componente.id_componente}>
                          {componente.descricao}
                        </MenuItem>
                      );
                    });
                  }
                })}
              </Select>
            </TableCell>
            <TableCell>
              <Select
                fullWidth
                multiple
                label="Tecnico"
                value={selectedTecnicos}
                onChange={(e) => setSelectedTecnicos(e.target.value)}
              >
                {tecnicos.map((tecnico) => {
                  return (
                    <MenuItem value={tecnico.matricula.toString()}>
                      {tecnico.nome}
                    </MenuItem>
                  );
                })}
              </Select>
            </TableCell>
            <TableCell>
              <Button variant="contained" onClick={handleAddTarefa}>
                Adicionar tarefa
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TabelaTarefas;
