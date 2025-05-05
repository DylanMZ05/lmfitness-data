import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer";
import Catalogo from "./pages/products/Catalogo";
import ProductoDetalle from "./pages/products/ProductoDetalle";
import { CartProvider } from "./context/CartContext";
import WspButton from "./components/WspButton";
import HomeWrapper from "./components/HomeWrapper";

function App() {
  return (
    <CartProvider>
        <Router basename="/lmfitness">
          <Header />
          <Routes>
            <Route path="/" element={<HomeWrapper />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />
          </Routes>
          <WspButton />
          <Footer />
        </Router>
    </CartProvider>
  );
}

export default App;