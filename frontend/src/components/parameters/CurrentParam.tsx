import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "../../assets/close.svg";
import { setMainParam } from "../../../redux/mainSlice";

export default function CurrentParam() {
  const dispatch = useDispatch();
  const { currentMainParam } = useSelector((state: any) => state.globalState);

  const handleCleanParam = () => {
    dispatch(setMainParam(""));
  };

  return (
    <div className="containerParams__containerCurrenteParam">
      <span className="containerParams__containerCurrenteParam--currentParam">
        {currentMainParam}
      </span>
      <img
        className="containerParams__containerCurrenteParam--closeIcon"
        src={CloseIcon}
        alt="close-icon"
        onClick={() => handleCleanParam()}
      />
    </div>
  );
}
