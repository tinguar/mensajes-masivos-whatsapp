import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { setMessage } from "../../../redux/mainSlice";
import useSendMessage from "../../../hooks/useSendMessage";
import { useRef } from "react";
import { setCurrentPositionPointer } from "../../../redux/mainSlice";

export default function Message() {
  const dispatch = useDispatch();
  const message = useSelector((state: any) => state.globalState.message);
  const { sendMessage } = useSendMessage();
  const refInputMessage = useRef(null) as any;

  const handleChange = (e: any) => {
    dispatch(setMessage(e.target.value));
  };

  const handlePositionMouse = (e: any) => {
    const cursorPosition = refInputMessage.current.selectionStart;
    dispatch(setCurrentPositionPointer(cursorPosition));
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
          ref={refInputMessage}
          onClick={(e) => handlePositionMouse(e)}
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
