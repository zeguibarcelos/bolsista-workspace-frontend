import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Tecnico } from "../services/Tecnico";
import {
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Title from "../components/Title";
import { createTecnico } from "../services/Tecnico/createTecnico";
import { getAllTecnicos } from "../services/Tecnico/getAllTecnicos";
import { Localidade } from "../services/Localidade";
import { createLocalidade } from "../services/Localidade/createLocalidade";
import { getAllLocalidades } from "../services/Localidade/getAllLocalidades";
import AddIcon from "@mui/icons-material/Add";
import { Theme } from "../themes/Theme";
import Janela from "../components/Janela";

const Administrador = () => {
  document.title = "Administração";

  const theme = Theme;

  //===================================================================================================
  //TECNICO
  const tecnicosColumns: GridColDef[] = [
    { field: "id", headerName: "Matrícula", flex: 1 },
    { field: "nome", headerName: "Nome", flex: 1 },
  ];

  const [tecnicos, setTecnicos] = useState<any[]>([]);
  const [tecnico, setTecnico] = useState<Tecnico>({
    matricula: 0,
    nome: "",
  });

  const handleSetTecnico = (event: any) => {
    const { name, value } = event.target;
    setTecnico({
      ...tecnico,
      [name]: value,
    });
  };

  const addTecnico = () => {
    createTecnico(tecnico).then(() => {
      setTecnicoDialogOpened(false);
      setTecnico({
        matricula: 0,
        nome: "",
      });
      getTecnicos();
    });
  };

  const getTecnicos = () => {
    getAllTecnicos().then((tecnicos) =>
      setTecnicos(
        tecnicos.map((tecnico) => {
          return { id: tecnico.matricula, nome: tecnico.nome };
        })
      )
    );
  };

  useEffect(() => {
    getTecnicos();
  }, []);
  //===================================================================================================
  //===================================================================================================
  //LOCALIDADE
  const localidadesColumns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "descricao", headerName: "Descrição", flex: 1 },
    { field: "componentes", headerName: "Componentes", flex: 1 },
  ];

  const [localidades, setLocalidades] = useState<any[]>([]);
  const [localidade, setLocalidade] = useState<Localidade>({
    id_localidade: 0,
    descricao: "",
    componentes: [],
  });

  const [componente, setComponente] = useState<string>("");
  const [componentes, setComponentes] = useState<string[]>([]);

  const addComponente = () => {
    setComponentes((prevComponentes) => [...prevComponentes, componente]);
  };

  const handleSetLocalidade = (event: any) => {
    const { name, value } = event.target;
    setLocalidade({
      ...localidade,
      [name]: value,
    });
  };

  const addLocalidade = () => {
    createLocalidade({
      ...localidade,
      componentes: componentes.map((componente) => {
        return { descricao: componente };
      }),
    }).then(() => {
      setLocalidadeDialogOpened(false);
      setLocalidade({
        id_localidade: 0,
        descricao: "",
        componentes: [],
      });
      setComponentes([]);
      setComponente("");
      getLocalidades();
    });
  };

  const getLocalidades = () => {
    getAllLocalidades().then((localidades) => {
      setLocalidades(
        localidades.map((localidade) => {
          return {
            id: localidade.id_localidade,
            descricao: localidade.descricao,
            componentes: localidade.componentes.map(
              (componente) => componente.descricao
            ),
          };
        })
      );
    });
  };

  useEffect(() => {
    getLocalidades();
  }, []);
  //===================================================================================================

  const [tecnicoDialogOpened, setTecnicoDialogOpened] =
    useState<boolean>(false);
  const [localidadeDialogOpened, setLocalidadeDialogOpened] =
    useState<boolean>(false);

  return (
    <div
      style={{
        height: 400,
        width: "100%",
        padding: "25px",
        minHeight: "100vh",
        backgroundColor: "#f1f1f1",
      }}
    >
      <Janela
        opened={tecnicoDialogOpened}
        setOpened={setTecnicoDialogOpened}
        title="Cadastrar Tecnico"
      >
        <InputLabel sx={{ marginTop: "15px" }}>Matrícula</InputLabel>
        <TextField
          name="matricula"
          value={tecnico?.matricula}
          onChange={handleSetTecnico}
          fullWidth
          required
        />
        <InputLabel sx={{ marginTop: "15px" }}>Nome</InputLabel>
        <TextField
          name="nome"
          value={tecnico?.nome}
          onChange={handleSetTecnico}
          fullWidth
          required
        />
        <Button
          sx={{ marginTop: "15px" }}
          fullWidth
          variant="contained"
          onClick={addTecnico}
        >
          Cadastrar
        </Button>
      </Janela>
      <Janela
        opened={localidadeDialogOpened}
        setOpened={setLocalidadeDialogOpened}
        title="Cadastrar Localidade"
      >
        <InputLabel sx={{ marginTop: "15px" }}>Descrição</InputLabel>

        <TextField
          name="descricao"
          value={localidade?.descricao}
          onChange={handleSetLocalidade}
          fullWidth
          required
        />
        <InputLabel sx={{ marginTop: "15px" }}>Componentes</InputLabel>

        <Typography>Adicionados: {componentes.join(", ")}</Typography>
        <Box display="flex">
          <TextField
            name="componente"
            value={componente}
            onChange={(e) => setComponente(e.target.value)}
            fullWidth
            required
          />
          <Button color="secondary" variant="contained" onClick={addComponente}>
            <AddIcon />
          </Button>
        </Box>
        <Button
          sx={{ marginTop: "15px" }}
          fullWidth
          variant="contained"
          onClick={addLocalidade}
        >
          Cadastrar
        </Button>
      </Janela>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper>
            <Title titulo="Técnicos" />
            <DataGrid
              rows={tecnicos}
              columns={tecnicosColumns}
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
            <Button
              variant="contained"
              fullWidth
              onClick={() => setTecnicoDialogOpened(true)}
            >
              Adicionar Técnico
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Title titulo="Localidades" />
            <DataGrid
              rows={localidades}
              columns={localidadesColumns}
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
            <Button
              variant="contained"
              fullWidth
              onClick={() => setLocalidadeDialogOpened(true)}
            >
              Adicionar Localidade
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Administrador;
