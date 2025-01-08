/*import logo from './logo.svg';
import './App.css';*/

//components
import Header from "./components/header/header";
import Home from "./components/home/Home";
import { Box } from "@mui/material";
import DataProvider from "./context/DataProvider";

function App() {
  return (
    <DataProvider>
      <Header />
      <Box style={{ marginTop: 54 }}>
        <Home />
      </Box>
    </DataProvider>
  );
}

export default App;
