import Temp from "./components/Contains/Temp.jsx";
import Contents from "./components/Contains/index";
import Footer from "./components/Footer/Footer.jsx";

import Intro from "./components/Intro/Intro.jsx";
import Menus from "./components/Menus/Index.jsx";

import { CartProvider } from "react-use-cart";
import Cart from "./components/Cart/index.jsx";
import ImageSlider from "./components/Contains/SlideImg.jsx";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="App">
          {/* <Temp/> */}
          <Cart />
          {/* <Login/> */}
          <Intro />
          <ImageSlider />
          <Contents />

          <Menus />
          <Footer />
        </div>
        <Routes>
          <Route exact path="/" />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
