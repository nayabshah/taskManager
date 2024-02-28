import FilterContainer from "./components/FilterContainer";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="container">
      <Header />
      <TaskList />
      <FilterContainer />
      <Toaster />
    </div>
  );
}

export default App;
