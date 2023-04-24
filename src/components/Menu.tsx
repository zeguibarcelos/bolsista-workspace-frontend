import {
  Box,
  Drawer,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactElement, useState } from "react";
import { useNavigate, useResolvedPath, useMatch } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Theme } from "../themes/Theme";
import MenuIcon from "@mui/icons-material/Menu";
interface IListItemProps {
  to: string;
  icon: ReactElement;
  label?: string;
  isDrawerOpen: boolean;
  onClick?: () => void;
}
const ListItemLink: React.FC<IListItemProps> = ({
  to,
  icon,
  label,
  isDrawerOpen,
  onClick,
}) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    onClick?.(); //se for undefined n faz nada
    navigate(to);
  };

  const theme = useTheme();
  const smDown: boolean = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <ListItemButton
        sx={{
          ...(!!match && { backgroundColor: theme.palette.action.selected }),
        }}
        onClick={handleClick}
      >
        <Box
          display="flex"
          alignItems="center"
          flexDirection={smDown ? "column" : "row"}
        >
          <ListItemIcon
            sx={{
              ...(smDown && { minWidth: "10px" }),
              justifyContent: "center",
            }}
          >
            {icon}
          </ListItemIcon>
          {isDrawerOpen && (
            <ListItemText
              primary={
                <Typography sx={{ ...(smDown && { fontSize: "10px" }) }}>
                  {label}
                </Typography>
              }
            />
          )}
        </Box>
      </ListItemButton>
    </>
  );
};
const Menu = ({ children }: any) => {
  const theme = Theme;
  const [opened, setOpened] = useState<boolean>(false);

  const handleOpened = () => {
    setOpened(!opened);
  };

  return (
    <Box display="flex" flex={1} flexDirection="row">
      <Box
        sx={{
          backgroundColor: theme.palette.primary.dark,
          color: "white",
        }}
      >
        <Box
          display="flex"
          flex={1}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <IconButton onClick={handleOpened}>
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
          {/* <Box padding="35px">
          <img
            width="180px"
            src="https://portal1.iff.edu.br/home/++resource++brasil.gov.portal/img/iffluminense.png"
          />
        </Box> */}
          <Box height="350px">
            <ListItemLink
              icon={<DashboardIcon sx={{ color: "white" }} />}
              isDrawerOpen={opened}
              to="/inicio"
              label="Início"
              onClick={() => {}}
            />
            <ListItemLink
              icon={<CalendarMonthIcon sx={{ color: "white" }} />}
              isDrawerOpen={opened}
              to="/calendario"
              label="Calendário"
              onClick={() => {}}
            />
            <ListItemLink
              icon={<AccountCircleIcon sx={{ color: "white" }} />}
              isDrawerOpen={opened}
              to="/perfil"
              label="Perfil"
              onClick={() => {}}
            />
          </Box>
        </Box>
      </Box>

      <Box minHeight="100vh" display="flex" flex={1}>
        {children}
      </Box>
    </Box>
  );
};

export default Menu;
