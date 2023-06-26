import "./App.css";

import Header from "./components/header";
import Footer from "./components/footer";
import InputFile from "./components/inputFile";

function App() {
  return (
    <>
      <div className="application">
        <Header />
        <div className="mainContent">
          <InputFile />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
