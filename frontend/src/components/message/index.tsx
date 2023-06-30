import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { setMessage } from "../../../redux/mainSlice";
import useSendMessage from "../../../hooks/useSendMessage";

export default function Message() {
  const dispatch = useDispatch();
  const message = useSelector((state: any) => state.globalState.message);
  const { sendMessage } = useSendMessage();

  const handleChange = (e: any) => {
    dispatch(setMessage(e.target.value));
  };

  const actionMessage = (e: Event) => {
    e.preventDefault();
    sendMessage(message);
  };

  return (
    <div className="containerMessage">
      <div className="containerMessage__title secondaryTitle ">
        Mensaje personalizado
      </div>
      <div className="containerMessage__imputTextArea">
        <textarea
          className="containerMessage__imputTextArea--textArea"
          placeholder="Escribe tu mensaje aqui..."
          onChange={handleChange}
          value={message}
        ></textarea>
        <div className="containerMessage__containerButton">
          <div
            className="containerMessage__button"
            onClick={(e) => actionMessage(e.nativeEvent)}
          >
            Enviar mensaje
          </div>
        </div>
      </div>
    </div>
  );
}
