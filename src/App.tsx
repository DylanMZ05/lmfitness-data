import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Main from "./components/main";
import Products from "./components/products-home/products";
import AboutUs from "./components/AboutUs";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/lmfitness"
          element={
            <>
              <Main />
              <Products />
              <AboutUs />
            </>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
