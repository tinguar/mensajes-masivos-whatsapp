import { useEffect, useState } from "react";
import "./index.css";
import useFileUploader from "../../../hooks/useFileUploader";
import useGetParams from "../../../hooks/useGetParams";
import { useDispatch } from "react-redux";
import { setParams } from "../../../redux/mainSlice";

export default function InputFile() {
  const dispatch = useDispatch();
  const { uploadFile, isUploading } = useFileUploader();
  const { getParams, params } = useGetParams();
  const [file, setFile] = useState(null as File | null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    const uploadAndFetchData = async (file: File) => {
      await uploadFile(file);
      await getParams();
    };

    if (file) {
      uploadAndFetchData(file);
    }
  }, [file]);

  useEffect(() => {
    if (params.length > 0) {
      console.log(params);
      dispatch(setParams(params));
    }
  }, [params]);

  return (
    <div className="contentInputFile">
      <div className="formFile">
        <label className="formFile__label-input" htmlFor="">
          Cargar archivo
        </label>
        <label
          className="formFile__inputFileSelector"
          htmlFor="inputFileSelector"
        >
          Escoge un archivo
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
        {isUploading && (
          <span className="formFile__uploadingLabel">Cargando archivo...</span>
        )}
      </div>
    </div>
  );
}
