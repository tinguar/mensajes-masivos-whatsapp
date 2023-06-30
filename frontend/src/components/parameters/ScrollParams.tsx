import { IParam, setMessage } from "../../../redux/mainSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ScrollParams() {
  const dispatch = useDispatch();
  const { params, message } = useSelector((state: any) => state.globalState);

  const selectParam = (param: string) => {
    dispatch(setMessage(message + `[${param}] `));
  };

  return (
    <div className="paramsList__containerScroll">
      {params &&
        params.map((param: IParam, index: number) => {
          return (
            <div
              className="paramsList__container--contentParam"
              key={index}
              onClick={() => selectParam(param.name)}
            >
              <span className="contentParam__parameter">{param.name}</span>
            </div>
          );
        })}
      {params.length === 0 && <h3>No hay parametros disponibles</h3>}
    </div>
  );
}
