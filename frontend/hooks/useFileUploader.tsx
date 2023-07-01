import axios from "axios";
import { useState } from "react";
import { Endpoints } from "../src/constants";

const useFileUploader = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadFile = async (file: string | Blob) => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(Endpoints.LOAD_FILE, formData);

      if (response.status !== 200) {
        throw new Error("Error uploading file.");
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, error, uploadFile };
};

export default useFileUploader;
