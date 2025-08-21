// src/App.tsx
import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer";
import { CartProvider } from "./context/CartContext";
import WspButton from "./components/WspButton";
import FeaturedAthletesPage from "./pages/atletas/FeaturedAthletesPage";

// ✅ Lazy Loading de páginas pesadas
const Catalogo = lazy(() => import("./pages/products/Catalogo"));
const ProductoDetalle = lazy(() => import("./pages/products/ProductoDetalle"));
const HomeWrapper = lazy(() => import("./components/HomeWrapper"));
const Login = lazy(() => import("./admin/admin"));
// const Upload = lazy(() => import("./admin/Upload"));

function AppContent() {
  const location = useLocation();
  const isAdminRoute = ["/admin/login", "/admin/dashboard"].includes(
    location.pathname
  );

  return (
    <>
      {!isAdminRoute && <Header />}

      <Suspense fallback={<div style={{ textAlign: "center", marginTop: "50px" }}>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<HomeWrapper />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/atletas-lm" element={<FeaturedAthletesPage />} />
          <Route path="/admin/dashboard" element={<Login />} />
          {/* <Route path="/admin/upload" element={<Upload />} /> */}
        </Routes>
      </Suspense>

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
