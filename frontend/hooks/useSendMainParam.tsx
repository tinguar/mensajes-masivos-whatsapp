import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Endpoints } from "../src/constants";

const useSendMainParam = () => {
  const { params } = useSelector((state: any) => state.globalState);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const chooseMainParam = async (newParam: string) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Current main param: ", newParam);
      const formData = new FormData();
      formData.append("columna", newParam);
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

  return {
    isLoading,
    error,
    verifyMainParam,
    chooseMainParam,
  };
};

export default useSendMainParam;
