import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AboutMe from "./components/pages/AboutMe";
import "./scss/main.scss";
function App() {
  return (
    <div className="App">
      <Header />
      <AboutMe />
      <Footer />
    </div>
  );
}

export default App;
