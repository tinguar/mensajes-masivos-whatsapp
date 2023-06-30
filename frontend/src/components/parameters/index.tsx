import "./index.css";
// import { useSelector, useDispatch } from "react-redux";
// import { IParam, setMessage } from "../../../redux/mainSlice";
import useSendMainParam from "../../../hooks/useSendMainParam";
import HeaderParams from "./HeaderParams";
import ScrollParams from "./ScrollParams";
import ChooseMainParam from "./ChooseMainParam";

export default function Parameters() {
  const { verifyMainParam } = useSendMainParam();
  return (
    <div className="containerParams">
      <HeaderParams />
      <div className="containerParams__paramsList">
        {verifyMainParam() && <ScrollParams />}
        {!verifyMainParam() && <ChooseMainParam />}
      </div>
    </div>
  );
}
