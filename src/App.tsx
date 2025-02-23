import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Main from "./pages/home/main";
import Products from "./pages/home/products-home/products";
import AboutUs from "./pages/home/AboutUs";
import Footer from "./components/footer";

import Catalogo from "./pages/products/Catalogo"

import { CartProvider } from "./context/CartContext";

function App() {
  return (
      <CartProvider>
          <Router basename="/lmfitness">
              <Header />
              <Routes>
                  <Route
                      path="/"
                      element={
                          <>
                              <Main />
                              <Products />
                              <AboutUs />
                          </>
                      }
                  />
                  <Route path="/catalogo" element={<Catalogo />} />
              </Routes>
              <Footer />
          </Router>
      </CartProvider>
  );
}

export default App;
