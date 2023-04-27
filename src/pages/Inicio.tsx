import { Typography, Paper, Box, Button } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Theme } from "../themes/Theme";
import { getAllEventos } from "../services/Evento/getAllEventos";
import { getAllTarefas } from "../services/Tarefa/getAllTarefas";
import Title from "../components/Title";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { countAll } from "../services/Tarefa/countAll";

ChartJS.register(ArcElement, Tooltip, Legend);

const Inicio = () => {
  document.title = "Inicio";
  const [nome, setNome] = useState("Usuário");
  const [dataAtual, setDataAtual] = useState(new Date());

  const columnsEventos: GridColDef[] = [
    { field: "id", headerName: "ID", width: 75 },
    { field: "data_hora_inicio", headerName: "Data", width: 150 },
    { field: "prioridade", headerName: "Prioridade", width: 100 },
    {
      field: "descricao",
      headerName: "Descrição",
      flex: 1,
    },
    {
      field: "acao",
      headerName: "Ação",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          href={`evento/${params.row.id}`}
        >
          Ir
        </Button>
      ),
    },
  ];
  const columnsTarefas: GridColDef[] = [
    { field: "id", headerName: "ID", width: 75 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    { field: "descricao", headerName: "Descrição", flex: 1 },
    { field: "id_evento", headerName: "Id_Evento", width: 75 },
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

  const theme = Theme;

  const [eventos, setEventos] = useState<any[]>([]);

  const [tarefas, setTarefas] = useState<any[]>([]);

  useEffect(() => {
    getAllTarefas().then((tarefas: any) => {
      let lTarefas = tarefas.filter(
        (tarefa: any) => tarefa.status === "Em Andamento"
      );
      setTarefas(
        lTarefas.map((tarefa: any) => {
          return {
            id: tarefa.id_tarefa,
            status: tarefa.status,
            descricao: tarefa.descricao,
            id_evento: tarefa.eventoIdEvento,
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
          dataInicioEvento <= ultimoDiaSemana &&
          evento.status === "Agendado"
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

  const [data, setData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
      },
    ],
  });

  useEffect(() => {
    countAll().then((counts) =>
      setData({
        labels: counts.map((count: any) => count.localidade),
        datasets: [
          {
            label: "Quantidade de Eventos",
            data: counts.map((count: any) => count.quantidade_eventos),
            backgroundColor: counts.map(() => generateRandomColor()),
          },
        ],
      })
    );
  }, []);

  function generateRandomColor() {
    // gera um valor aleatório entre 0 e 255 para cada componente RGB
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    // retorna a cor como uma string no formato "rgb(r, g, b)"
    return `rgb(${r}, ${g}, ${b})`;
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Box
      display="flex"
      flex={1}
      padding="25px"
      flexDirection="row"
      bgcolor={theme.palette.background.default}
      gap={2}
    >
      <Box display="flex" flex={3} flexDirection="column" gap={2}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Olá {nome}, boa tarde
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {dataAtual.toLocaleString()}
          </Typography>
        </Box>
        <Box>
          <Paper>
            <Title titulo="Eventos da Semana" />
            <DataGrid
              rows={eventos}
              columns={columnsEventos}
              autoHeight
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              sx={{ border: 0 }}
            />
          </Paper>
        </Box>
        <Box>
          <Paper>
            <Title titulo="Tarefas Pendentes" />
            <DataGrid
              rows={tarefas}
              columns={columnsTarefas}
              autoHeight
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              sx={{ border: 0 }}
            />
          </Paper>
        </Box>
      </Box>
      <Box display="flex" flex={1}>
        <Paper>
          <Title titulo="Métricas" />
          <div style={{ width: "100%", height: "400px" }}>
            <Pie data={data} options={options} />
          </div>
        </Paper>
      </Box>
    </Box>
  );
};

export default Inicio;
