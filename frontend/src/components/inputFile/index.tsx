import { useEffect, useState } from "react";
import "./index.css";
import useFileUploader from "../../../hooks/useFileUploader";

export default function InputFile() {
  const { uploadFile, isUploading } = useFileUploader();
  const [file, setFile] = useState(null as File | null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (file) {
      uploadFile(file);
    }
  }, [file]);

  return (
    <div className="contentInputFile">
      <div className="formFile">
        <label className="formFile__label-input" htmlFor="">
          Upload a file
        </label>
        <label
          className="formFile__inputFileSelector"
          htmlFor="inputFileSelector"
        >
          Select some file
        </label>
        <input
          type="file"
          name=""
          id="inputFileSelector"
          hidden
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .xlsx, .xls"
          onChange={handleFile}
        />
        {file && (
          <label htmlFor="" className="formFile__nameFile">
            {file.name}
          </label>
        )}
        {isUploading && <span>Uploading file...</span>}
      </div>
    </div>
  );
}
