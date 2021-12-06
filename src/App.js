import { Router } from "@reach/router";
import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import StorePage from "./pages/StorePage";
import ItemPage from "./pages/ItemPage";
import UserPage from "./pages/UserPage";
import "./App.css";
import { UserProvider } from "./contexts/UserContext";
import LoginPage from "./pages/LoginPage";
import TitleBar from "./components/TitleBar";
import { CartProvider } from "./contexts/CartContext";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <CssBaseline />
        <TitleBar />
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        />
        <Router id='mainContent'>
          <StorePage path='/' />
          <ItemPage path='/items/:item' />
          <UserPage path='/users/:user' />
          <LoginPage path='/login' />
        </Router>
        <ShoppingCart />
      </CartProvider>
    </UserProvider>
  );
}

export default App;
