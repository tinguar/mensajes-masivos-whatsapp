import { IParam } from "../../../redux/mainSlice";

import useSendMainParam from "../../../hooks/useSendMainParam";
import { useDispatch, useSelector } from "react-redux";
import { setMainParam } from "../../../redux/mainSlice";

export default function ChooseMainParam() {
  const dispatch = useDispatch();
  const { params } = useSelector((state: any) => state.globalState);
  const { chooseMainParam } = useSendMainParam();

  const handleMainParam = (param: string) => {
    chooseMainParam(param);
    dispatch(setMainParam(param));
  };

  return (
    <div className="paramsList__containerScroll">
      {params &&
        params.map((param: IParam, index: number) => {
          return (
            <div
              className="paramsList__container--contentParam"
              key={index}
              onClick={() => handleMainParam(param.name)}
            >
              <span className="contentParam__parameter">{param.name}</span>
            </div>
          );
        })}
    </div>
  );
}
