import axios from "axios";
import { useState } from "react";
import { Endpoints } from "../src/constants";

const useSendMessage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = new FormData();
      data.append("mensaje", message);

      const response = await axios.post(Endpoints.SEND_MESSAGE, data);

      if (response.status !== 200) {
        throw new Error("Error uploading file.");
      }

      // File uploaded successfully
      //   console.log("Params here successfully.");
      // console.log("Send message response: ", response.data);
      //   setParams(response.data.columnas_principales);
    } catch (error: any) {
      console.log("Send message error: ", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    // params,
    sendMessage,
  };
};

export default useSendMessage;
