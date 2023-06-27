import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { setMessage } from "../../../redux/mainSlice";

export default function Parameters() {
  const dispatch = useDispatch();
  const params = useSelector((state: any) => state.globalState.params);
  const message = useSelector((state: any) => state.globalState.message);

  const selectParam = (param: string) => {
    dispatch(setMessage(message + `[${param}] `));
  };

  return (
    <div className="containerParams">
      <div className="containerParams__title">Parametros del archivo.</div>
      <div className="containerParams__paramsList">
        <div className="paramsList__containerScroll">
          {params &&
            params.map((param: any, index: number) => {
              return (
                <div
                  className="paramsList__container--contentParam"
                  key={index}
                  onClick={() => selectParam(param)}
                >
                  <span className="contentParam__parameter">{param}</span>
                </div>
              );
            })}
          {params.length === 0 && <h3>No hay parametros disponibles</h3>}
        </div>
      </div>
    </div>
  );
}
