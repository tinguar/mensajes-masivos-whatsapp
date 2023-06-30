import useSendMainParam from "../../../hooks/useSendMainParam";
import { useSelector } from "react-redux";

export default function HeaderParams() {
  const { verifyMainParam } = useSendMainParam();
  const { params } = useSelector((state: any) => state.globalState);

  return (
    <div className="containerParams__contentTitle">
      <div className="containerParams__title secondaryTitle ">
        {params.length > 0
          ? "Parametros del archivo."
          : "Cargue un archivo para ver los parametro"}
      </div>
      {!verifyMainParam() && params.length > 0 && (
        <div className="containerParams__helperLabel">
          Escoje el parametro que coresponde a los numeros de celular
        </div>
      )}
    </div>
  );
}
