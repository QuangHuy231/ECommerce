import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SinglePage from "./pages/SinglePage";

import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartScreen from "./pages/CartScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <Header />
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:slug" element={<SinglePage />} />
              <Route path="/cart" element={<CartScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
