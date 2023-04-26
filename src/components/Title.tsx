import { Box, Typography } from "@mui/material";
import { Theme } from "../themes/Theme";

const Title = (props: { titulo: string }) => {
  const theme = Theme;
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        borderTopRightRadius: "4px",
        borderTopLeftRadius: "4px",
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <Typography variant="h6" color="white" style={{ margin: 0 }}>
        {props.titulo}
      </Typography>
    </Box>
  );
};

export default Title;
