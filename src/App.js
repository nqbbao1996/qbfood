import { CartProvider } from "react-use-cart";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import AdminPage from "./components/page/admin.jsx";
import HomePage from "./components/page/Home.jsx";

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<HomePage />} />

            <Route path="admin/:id?" element={<AdminPage />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
