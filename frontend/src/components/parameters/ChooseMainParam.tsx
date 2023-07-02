import useSendMainParam from "../../../hooks/useSendMainParam";
import { useDispatch, useSelector } from "react-redux";
import { setMainParam } from "../../../redux/mainSlice";
import { useEffect, useState } from "react";

export default function ChooseMainParam() {
  const dispatch = useDispatch();
  const { params } = useSelector((state: any) => state.globalState);
  const [localChooseMainParam, SetChooseMainParam] = useState("");

  const { chooseMainParam } = useSendMainParam();

  useEffect(() => {
    dispatch(setMainParam(localChooseMainParam));
    chooseMainParam(localChooseMainParam);
  }, [localChooseMainParam]);

  return (
    <div className="paramsList__containerScroll">
      {params &&
        params.map((param: string, index: number) => {
          return (
            <div
              className="paramsList__container--contentParam"
              key={index}
              onClick={() => SetChooseMainParam(param)}
            >
              <span className="contentParam__parameter">{param}</span>
            </div>
          );
        })}
    </div>
  );
}
