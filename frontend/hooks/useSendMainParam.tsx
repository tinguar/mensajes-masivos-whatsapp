import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Endpoints } from "../src/constants";

const useSendMainParam = () => {
  const [currentMainParam, setCurrentMainParam] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { params } = useSelector((state: any) => state.globalState);

  const postMainParam = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("columna", currentMainParam);
      const response = await axios.post(Endpoints.POST_PHONE_PARAM, formData);
      if (response.status !== 200) {
        throw new Error("Error uploading file.");
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyMainParam = () => {
    for (const param of params) {
      if (param.isMain === true) {
        return true;
      }
    }
    return false;
  };

  const chooseMainParam = (nameParam: string) => {
    setCurrentMainParam(nameParam);
    postMainParam();
  };

  return {
    isLoading,
    error,
    verifyMainParam,
    chooseMainParam,
  };
};

export default useSendMainParam;
