import Cart from "../Cart";
import Intro from "../Intro/Intro";
import ImageSlider from "../Contains/SlideImg";
import Footer from "../Footer/Footer";
import Contents from "../Contains/index";
import Menus from "../Menus/Index.jsx";

function HomePage() {
  return (
    <>
      <Cart login={true} />
      <Intro />
      <ImageSlider />
      <Contents />
      <Menus />
      <Footer />
    </>
  );
}

export default HomePage;
