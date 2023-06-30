import { IParam } from "../redux/mainSlice";

export default function findParamByProp(params: any) {
  return params.forEach((param: IParam) => {
    if (param.isMain) return param.name;
  });
}
