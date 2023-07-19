import Table from "./components/table";
import ContextProvider from "./context";

const App = () => {
  return (
    <ContextProvider>
      <Table />
    </ContextProvider>
  );
};

export default App;
