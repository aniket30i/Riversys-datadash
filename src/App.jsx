import UpperNav from "./components/UpperNav";
import LowerNav from "./components/LowerNav.jsx";
import UtilityBar from "./components/UtilityBar.jsx";
import TableArea from "./components/TableArea.jsx";
import { DataProvider } from "../src/context/ContextProvider.jsx";
function App() {
  return (
    <DataProvider>
      <UpperNav />
      <LowerNav />
      <UtilityBar />
      <TableArea />
    </DataProvider>
  );
}

export default App;
