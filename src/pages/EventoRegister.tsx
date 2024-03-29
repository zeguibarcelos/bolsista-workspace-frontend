import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventoById } from "../services/Evento/getEventoById";
import TabelaTarefas from "../components/TabelaTarefas";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { updateEvento } from "../services/Evento/updateEvento";
import { Theme } from "../themes/Theme";
import { Tarefa } from "../services/Tarefa";
import { getTarefaByEventoId } from "../services/Tarefa/getTarefaByEventoId";

const EventoRegister = () => {
  document.title = "Evento";

  const { id } = useParams<{ id: string }>();

  const [disabled, setDisabled] = useState<boolean>(true);

  const [evento, setEvento] = useState<any>({
    prioridade: "",
    tipo: "",
    categoria: "",
    descricao: "",
    data_hora_inicio: "",
    data_hora_fim: "",
    status: "",
  });

  useEffect(() => {
    getEvento();
  }, []);

  const getEvento = () => {
    getEventoById(Number(id)).then((event) =>
      setEvento({
        id_evento: event.id_evento,
        prioridade: event.prioridade,
        tipo: event.tipo,
        categoria: event.categoria,
        descricao: event.descricao,
        data_hora_inicio: event.data_hora_inicio.toString(),
        data_hora_fim: event.data_hora_fim.toString(),
        status: event.status,
      })
    );
  };

  const handleConcluir = () => {
    getTarefaByEventoId(Number(id)).then((tasks) => {
      if (tasks.some((tarefa: Tarefa) => tarefa.status === "Em Andamento")) {
        alert("Conclua todas as Tarefas antes de concluir o Evento!");
      } else {
        updateEvento({
          ...evento,
          status: "Concluído",
          data_hora_fim: new Date(),
        }).then(() => {
          getEvento();
        });
      }
    });
  };

  function handleTextFieldChange(event: any) {
    const { name, value } = event.target;
    setEvento({
      ...evento,
      [name]: value,
    });
  }

  const handleSalvar = () => {
    updateEvento(evento).then(() => {
      setDisabled(true);
      getEvento();
    });
  };
  const theme = Theme;
  return (
    <Box
      display="flex"
      flex={1}
      flexDirection="column"
      padding="15px"
      bgcolor={theme.palette.background.default}
    >
      <Box display="flex" flexDirection="row" marginBottom="15px">
        <Typography variant="h4">Realizar Evento:</Typography>
        <Box
          display="flex"
          flex={1}
          justifyContent="flex-end"
          alignItems="center"
        >
          {evento.status !== "Concluído" && (
            <>
              {!disabled ? (
                <Button onClick={handleSalvar} startIcon={<SaveIcon />}>
                  Salvar
                </Button>
              ) : (
                <Button
                  onClick={() => setDisabled(false)}
                  startIcon={<EditIcon />}
                >
                  Editar
                </Button>
              )}

              <Button onClick={handleConcluir} startIcon={<CheckIcon />}>
                Concluir Evento
              </Button>
            </>
          )}
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            name="prioridade"
            label="Prioridade"
            value={evento.prioridade}
            onChange={handleTextFieldChange}
            fullWidth
            required
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="status"
            label="Status"
            value={evento.status}
            onChange={handleTextFieldChange}
            fullWidth
            required
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="tipo"
            label="Tipo"
            value={evento.tipo}
            onChange={handleTextFieldChange}
            fullWidth
            required
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="categoria"
            label="Categoria"
            value={evento.categoria}
            onChange={handleTextFieldChange}
            fullWidth
            required
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="data_hora_inicio"
            label="Data/Hora Início"
            value={evento.data_hora_inicio}
            onChange={handleTextFieldChange}
            fullWidth
            required
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="data_hora_fim"
            label="Data/Hora Fim"
            value={evento.data_hora_fim}
            onChange={handleTextFieldChange}
            fullWidth
            required
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="descricao"
            label="Descrição"
            value={evento.descricao}
            onChange={handleTextFieldChange}
            fullWidth
            required
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <TabelaTarefas evento={evento} setEvento={setEvento} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventoRegister;
