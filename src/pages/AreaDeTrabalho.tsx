import { Typography, Paper, Box, Grid, Button } from "@mui/material";
import { GridColDef, GridValueGetterParams, DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Theme } from "../themes/Theme";
import { getAllEventos } from "../services/Evento/getAllEventos";
import { Evento } from "../services/Evento";
import { getAllTarefas } from "../services/Tarefa/getAllTarefas";

const AreaDeTrabalho = () => {
  const [nome, setNome] = useState("Usuário");
  const [dataAtual, setDataAtual] = useState(new Date());

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const columnsEventos: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "data_hora_inicio", headerName: "Data", width: 150 },
    { field: "prioridade", headerName: "Prioridade", width: 150 },
    {
      field: "descricao",
      headerName: "Descrição",
      flex: 1,
    },
  ];
  const columnsTarefas: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    { field: "descricao", headerName: "Descrição", width: 300 },
    { field: "id_evento", headerName: "Id_Evento", width: 300 },
    {
      field: "acao",
      headerName: "Ação",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          href={`evento/${params.row.id_evento}`}
        >
          Ir
        </Button>
      ),
    },
  ];

  const columnsTarefasTotais: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "localidade", headerName: "Localicade", width: 100 },
  ];

  const theme = Theme;

  const [eventos, setEventos] = useState<any[]>([]);
  const [tarefas, setTarefas] = useState<any[]>([]);

  useEffect(() => {
    getAllTarefas().then((tarefas) => {
      let lTarefas = tarefas.filter(
        (tarefa) => tarefa.status === "Em andamento"
      );
      setTarefas(
        lTarefas.map((tarefa) => {
          return {
            id: tarefa.id_tarefa,
            status: tarefa.status,
            descricao: tarefa.descricao,
            id_evento: tarefa.evento,
          };
        })
      );
    });
  }, []);

  function formatDate(date: Date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  useEffect(() => {
    getAllEventos().then((eventos) => {
      const hoje = new Date();

      const primeiroDiaSemana = new Date(
        hoje.setDate(hoje.getDate() - hoje.getDay())
      );

      const ultimoDiaSemana = new Date(
        hoje.setDate(primeiroDiaSemana.getDate() + 6)
      );

      let lEventos = eventos.filter((evento) => {
        const dataInicioEvento = new Date(evento.data_hora_inicio);
        console.log("date", new Date(evento.data_hora_inicio).getDate());
        return (
          dataInicioEvento >= primeiroDiaSemana &&
          dataInicioEvento <= ultimoDiaSemana
        );
      });

      setEventos(
        lEventos.map((evento) => {
          return {
            id: evento.id_evento,
            descricao: evento.descricao,
            prioridade: evento.prioridade,
            data_hora_inicio: formatDate(new Date(evento.data_hora_inicio)),
          };
        })
      );
    });
  }, []);

  const Title = (props: { titulo: string }) => {
    return (
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          borderTopRightRadius: "4px",
          borderTopLeftRadius: "4px",
          backgroundColor: "#000",
        }}
      >
        <Typography variant="h6" color="white" style={{ margin: 0 }}>
          {props.titulo}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flex={1}
      padding="25px"
      flexDirection="row"
      bgcolor={theme.palette.background.default}
      gap={2}
    >
      <Grid container spacing={2}>
        <Box display="flex" flexDirection="column">
          <Typography variant="h6" gutterBottom>
            Olá {nome}, boa tarde
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {dataAtual.toLocaleString()}
          </Typography>
        </Box>
        <Grid item xs={12}>
          <Paper>
            <Title titulo="Eventos da Semana" />
            <DataGrid
              sx={{ border: 0 }}
              rows={eventos}
              columns={columnsEventos}
              autoHeight
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Title titulo="Tarefas Pendentes" />
            <DataGrid
              sx={{ border: 0 }}
              rows={tarefas}
              columns={columnsTarefas}
              autoHeight
            />
          </Paper>
        </Grid>
      </Grid>
      <Box display="flex" flex={1}>
        <Paper>
          <Title titulo="Tarefas Pendentes" />
          <DataGrid
            sx={{ border: 0 }}
            rows={[]}
            columns={columnsTarefasTotais}
            autoHeight
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default AreaDeTrabalho;
