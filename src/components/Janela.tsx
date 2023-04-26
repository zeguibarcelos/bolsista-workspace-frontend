import { Dialog, Box, Typography, IconButton } from "@mui/material";
import { Theme } from "../themes/Theme";
import CloseIcon from "@mui/icons-material/Close";

const Janela = (props: {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  children: any;
  title: string;
}) => {
  const theme = Theme;
  return (
    <Dialog open={props.opened} onClose={() => props.setOpened(false)}>
      <Box display="flex" flex={1} flexDirection="column">
        <Box
          display="flex"
          flex={1}
          justifyContent="center"
          alignItems="center"
          bgcolor={theme.palette.secondary.main}
          paddingLeft="10px"
          paddingRight="10px"
        >
          <Typography color={theme.palette.secondary.contrastText} variant="h5">
            {props.title}
          </Typography>
          <Box
            display="flex"
            flex={1}
            justifyContent="flex-end"
            alignItems="center"
          >
            <IconButton onClick={() => props.setOpened(false)}>
              <CloseIcon sx={{ color: theme.palette.secondary.contrastText }} />
            </IconButton>
          </Box>
        </Box>
        <Box paddingLeft="15px" paddingRight="15px" paddingBottom="15px">
          {props.children}
        </Box>
      </Box>
    </Dialog>
  );
};

export default Janela;
