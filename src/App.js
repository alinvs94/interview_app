import "./App.css";
import { InputControl } from "./InputControl/InputControl";
import { SearchBar } from "./SearchBar/SearchBar";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1 style={{ alignSelf: "center" }}>Interview app</h1>
      <InputControl></InputControl>
      <SearchBar></SearchBar>
    </div>
  );
}

export default App;
