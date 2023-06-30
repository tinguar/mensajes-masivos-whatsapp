import { IParam } from "../../../redux/mainSlice";

import useSendMainParam from "../../../hooks/useSendMainParam";
import { useSelector } from "react-redux";
// import { setMainParam } from "../../../redux/mainSlice";

export default function ChooseMainParam() {
  //   const dispatch = useDispatch();
  const { params } = useSelector((state: any) => state.globalState);
  const { chooseMainParam } = useSendMainParam();

  return (
    <div className="paramsList__containerScroll">
      {params &&
        params.map((param: IParam, index: number) => {
          return (
            <div
              className="paramsList__container--contentParam"
              key={index}
              onClick={() => chooseMainParam(param.name)}
            >
              <span className="contentParam__parameter">{param.name}</span>
            </div>
          );
        })}
    </div>
  );
}
