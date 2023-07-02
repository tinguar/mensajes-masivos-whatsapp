import { useSelector } from "react-redux";
import CurrentParam from "./CurrentParam";

export default function HeaderParams() {
  const { params, currentMainParam } = useSelector(
    (state: any) => state.globalState
  );

  return (
    <div className="containerParams__contentTitle">
      <div className="containerParams__title secondaryTitle ">
        {params.length > 0
          ? "Parametros del archivo."
          : "Cargue un archivo para ver los parametro"}
        {currentMainParam && <CurrentParam />}
      </div>
      {!currentMainParam && params.length > 0 && (
        <div className="containerParams__helperLabel">
          Escoje el parametro que coresponde a los numeros de celular
        </div>
      )}
    </div>
  );
}
