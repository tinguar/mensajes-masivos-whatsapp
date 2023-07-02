import "./index.css";
import { useSelector } from "react-redux";
import HeaderParams from "./HeaderParams";
import ScrollParams from "./ScrollParams";
import ChooseMainParam from "./ChooseMainParam";

export default function Parameters() {
  const { currentMainParam } = useSelector((state: any) => state.globalState);

  return (
    <div className="containerParams">
      <HeaderParams />
      <div className="containerParams__paramsList">
        {currentMainParam && <ScrollParams />}
        {!currentMainParam && <ChooseMainParam />}
      </div>
    </div>
  );
}
