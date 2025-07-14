// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer";
import Catalogo from "./pages/products/Catalogo";
import ProductoDetalle from "./pages/products/ProductoDetalle";
import { CartProvider } from "./context/CartContext";
import WspButton from "./components/WspButton";
import HomeWrapper from "./components/HomeWrapper";
import Login from "./admin/admin";
// import Upload from "./admin/Upload";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = ["/admin/login", "/admin/dashboard"].includes(location.pathname);

  return (
    <>
      {!isAdminRoute && <Header />}

      <Routes>
        <Route path="/" element={<HomeWrapper />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/admin/dashboard" element={<Login />} />
        {/* <Route path="/admin/upload" element={<Upload />} /> */}
      </Routes>

      {!isAdminRoute && <WspButton />}
      {!isAdminRoute && <Footer />}
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
