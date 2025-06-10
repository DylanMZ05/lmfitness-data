import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer";
import Catalogo from "./pages/products/Catalogo";
import ProductoDetalle from "./pages/products/ProductoDetalle";
import { CartProvider } from "./context/CartContext";
import WspButton from "./components/WspButton";
import HomeWrapper from "./components/HomeWrapper";
import Login from "./admin/login";

function AppContent() {
  const location = useLocation();
  const isLoginRoute = location.pathname === "/admin/login";

  return (
    <>
      {!isLoginRoute && <Header />}

      <Routes>
        <Route path="/" element={<HomeWrapper />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/admin/login" element={<Login />} />
      </Routes>

      {!isLoginRoute && <WspButton />}
      {!isLoginRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router basename="/">
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
