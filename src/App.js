import { Router } from "@reach/router";
import StorePage from "./pages/StorePage";
import ItemPage from "./pages/ItemPage";
import UserPage from "./pages/UserPage";
import "./App.css";

function App() {
  return (
    <Router id="mainContent">
      <StorePage path="/" />
      <ItemPage path="/items/:item" />
      <UserPage path="/users/:user" />
    </Router>
  );
}

export default App;
