import "./App.css";

import Header from "./components/header";
import Footer from "./components/footer";
import InputFile from "./components/inputFile";
import Parameters from "./components/parameters";
import Message from "./components/message";
import Advertising from "./components/advertising";

function App() {
  return (
    <>
      <div className="application">
        <Header />
        <div className="mainContent">
          <InputFile />
          <Parameters />
          <Message />
          <Advertising side="left" />
          <Advertising side="right" />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
