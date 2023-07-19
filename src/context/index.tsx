import { FC, createContext, useState, useEffect } from "react";
import jsonData from "../data.json";

type Props = {
  children: any;
};

export const MainProvider = createContext({});

interface RowData {
  number: string;
  mod3: string;
  mod4: string;
  mod5: string;
  mod6: string;
}

const ContextProvider: FC<Props> = ({ children }) => {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [filterObj, setFilterObj] = useState<any>({});

  useEffect(() => {
    let tempArr = jsonData;
    for (let i = 0; i < Object.keys(filterObj).length; i++) {
      let key = Object.keys(filterObj)[i];
      tempArr = tempArr.filter((item: any) =>
        filterObj[key].includes(item[key])
      );
    }
    setRowData(tempArr);
  }, [filterObj]);

  useEffect(() => {
    setRowData(jsonData);
  }, []);

  return (
    <MainProvider.Provider
      value={{ jsonData, filterObj, setFilterObj, rowData }}
    >
      {children}
    </MainProvider.Provider>
  );
};

export default ContextProvider;
