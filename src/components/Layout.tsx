import { Box} from "@mui/material";
import Navbar from "./UI/Navbar";
import Main from "./UI/Main";

const Layout = () => {

  return (
    <Box
      sx={{
        height: "100dvh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar content */}
      <Navbar />

      {/* Main content */}
      <Main />

      {/* Footer content */}
      <Box></Box>
    </Box>
  );
};

export default Layout;
