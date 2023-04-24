import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Drawer,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import EventIcon from "@mui/icons-material/Event";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { getAllEventos } from "../services/Evento/getAllEventos";
import { createEvento } from "../services/Evento/createEvento";
import { Evento } from "../services/Evento";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/pt-br";
// import "react-calendar/dist/Calendar.css";

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("pt-br");

const Calendario = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    getAllEventos().then((eventos) => setEventos(eventos));
  }, []);

  const tileContent = ({ date }: any) => {
    const eventosForDate = eventos.filter(
      (task) =>
        new Date(task.data_hora_inicio).getDate() ===
          new Date(formatDate(date)).getDate() &&
        new Date(task.data_hora_inicio).getMonth() ===
          new Date(formatDate(date)).getMonth() &&
        new Date(task.data_hora_inicio).getFullYear() ===
          new Date(formatDate(date)).getFullYear()
    );
    return (
      <>
        <Box display="flex" flex={1} flexDirection="column">
          {eventosForDate.map((task, index) => (
            <Button
              sx={{
                minHeight: "20px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: "5px",
                boxShadow: "none",
                borderLeft:
                  task.prioridade === "Rotina"
                    ? "5px solid #296ED6"
                    : task.prioridade === "Importante"
                    ? "5px solid #31D629"
                    : "5px solid #D63929",
              }}
              href={`evento/${task?.id_evento}`}
              variant="contained"
            >
              <Typography variant="overline">{task.descricao}</Typography>
            </Button>
          ))}
        </Box>

        <Box className="task-button">
          <IconButton
            onClick={() => {
              console.log("Testando", new Date(date));
              setSelectedStartDate(dayjs(date));
              setEventDrawerOpen(true);
            }}
          >
            <EventIcon className="event-icon" fontSize="small" />
          </IconButton>
        </Box>
      </>
    );
  };

  const formatDate = (date: any) => {
    return date.toISOString().slice(0, 10);
  };

  function tileClassName({ date, view, activeStartDate }: any) {
    // verifica se a data pertence ao mês selecionado pelo usuário
    if (view === "month" && date.getMonth() !== activeStartDate.getMonth()) {
      return "react-calendar__tile--inactive -month";
    }
  }

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string[]>([]);
  const [priority, setPriority] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const [eventDrawerOpen, setEventDrawerOpen] = useState<boolean>(false);

  const manutCategories = [
    "Manutenção Detectiva",
    "Manutenção Preventiva",
    "Manutenção Corretiva",
    "Manutenção de Emergência",
  ];

  const instCategories = ["Instalação de Hardware", "Instalação de Software"];

  const [selectedStartDate, setSelectedStartDate] = useState<any>();
  const [selectedEndDate, setSelectedEndDate] = useState<any>();

  const handleStartDateChange = (date: Date | null) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setSelectedEndDate(date);
  };

  function isToday(date: Date | null | undefined): boolean {
    if (date) {
      const lDate = new Date(date);
      const today = new Date();
      return (
        lDate.getDay() === today.getDay() &&
        lDate.getMonth() === today.getMonth() &&
        lDate.getFullYear() === today.getFullYear()
      );
    }

    return false;
  }

  const addEvento = () => {
    createEvento({
      categoria: category.join(),
      data_hora_inicio: selectedStartDate
        ? new Date(selectedStartDate)
        : new Date(),
      data_hora_fim: selectedEndDate ? new Date(selectedEndDate) : new Date(),
      descricao: description,
      status: "Em Andamento",
      prioridade: priority,
      tarefas: [],
      tipo: type,
    });
  };

  return (
    <Box bgcolor="#f1f1f1" display="flex" flex={1}>
      <Drawer
        open={eventDrawerOpen}
        anchor="right"
        onClose={() => setEventDrawerOpen(false)}
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 550,
            padding: "15px",
          },
        }}
      >
        <Typography variant="h5">
          {isToday(selectedStartDate) ? "Realizar Evento" : "Agendar Evento"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel id="type-select-label">Prioridade*</InputLabel>
            <Select
              labelId="type-select-label"
              id="type-select"
              value={priority}
              onChange={(e: any) => setPriority(e.target.value)}
              sx={{ width: "100%" }}
            >
              <MenuItem value="Rotina">
                <Box
                  sx={{
                    backgroundColor: "#A3C6FF",
                    borderRadius: "2px",
                    padding: "3px",
                  }}
                >
                  {" "}
                  Rotina{" "}
                </Box>
              </MenuItem>
              <MenuItem value="Importante">
                <Box
                  sx={{
                    backgroundColor: "#FFF4A3",
                    borderRadius: "2px",
                    padding: "3px",
                  }}
                >
                  {" "}
                  Importante{" "}
                </Box>
              </MenuItem>
              <MenuItem value="Urgente">
                <Box
                  sx={{
                    backgroundColor: "#FFA3A3",
                    borderRadius: "2px",
                    padding: "3px",
                  }}
                >
                  {" "}
                  Urgente{" "}
                </Box>
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <InputLabel id="type-select-label">Status*</InputLabel>
            <Select value={"Agendado"} sx={{ width: "100%" }}>
              <MenuItem value="Agendado">Agendado</MenuItem>
            </Select>
          </Grid>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item xs={6}>
              <InputLabel id="type-select-label">Início</InputLabel>
              <DateTimePicker
                value={selectedStartDate}
                onChange={handleStartDateChange}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="type-select-label">Fim</InputLabel>
              <DateTimePicker
                value={selectedEndDate}
                onChange={handleEndDateChange}
              />
            </Grid>
          </LocalizationProvider>
          <Grid item xs={12}>
            <InputLabel id="type-select-label">Tipo*</InputLabel>
            <Select
              labelId="type-select-label"
              id="type-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              sx={{ width: "100%" }}
            >
              <MenuItem value="Inst">Instalação</MenuItem>
              <MenuItem value="Ronda">
                Ronda
                <Typography color="grey"> /Manutenção</Typography>
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="type-select-label">Categoria*</InputLabel>
            <Select
              labelId="type-select-label"
              id="type-select"
              multiple
              value={category}
              onChange={(e: any) => setCategory(e.target.value)}
              sx={{ width: "100%" }}
            >
              {type === "Ronda"
                ? manutCategories.map((category) => {
                    return (
                      <MenuItem key={category} value={category}>
                        <Typography>{category}</Typography>
                      </MenuItem>
                    );
                  })
                : instCategories.map((category) => {
                    return (
                      <MenuItem key={category} value={category}>
                        <Typography>{category}</Typography>
                      </MenuItem>
                    );
                  })}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="type-select-label">Descrição*</InputLabel>
            <TextField
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              //helperText="Escreva sobre o que irá ser tratado nesse Evento de forma resumida."
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={addEvento} variant="outlined">
              {isToday(selectedStartDate) ? "Iniciar" : "Programar"}
            </Button>
          </Grid>
        </Grid>
      </Drawer>
      <Box width="100%" padding="25px">
        <Calendar
          tileClassName={tileClassName}
          calendarType="ISO 8601"
          tileContent={tileContent}
          next2Label=""
          prev2Label=""
        />
      </Box>
    </Box>
  );
};

export default Calendario;
