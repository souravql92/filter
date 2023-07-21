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
  const [state, setState] = useState({
    number: [],
    mod3: [],
    mod4: [],
    mod5: [],
    mod6: [],
  });

  useEffect(() => {
    const numberObj: any = {};
    const numberArr: any = [];
    const mod3Obj: any = {};
    const mod3Arr: any = [];
    const mod4Obj: any = {};
    const mod4Arr: any = [];
    const mod5Obj: any = {};
    const mod5Arr: any = [];
    const mod6Obj: any = {};
    const mod6Arr: any = [];

    if (jsonData.length > 0) {
      for (let i = 0; i < jsonData.length; i++) {
        const item: any = jsonData[i];
        numberObj[item.number] = (numberObj[item.number] || 0) + 1;
        mod3Obj[item.mod3] = (mod3Obj[item.mod3] || 0) + 1;
        mod4Obj[item.mod4] = (mod3Obj[item.mod4] || 0) + 1;
        mod5Obj[item.mod5] = (mod3Obj[item.mod5] || 0) + 1;
        mod6Obj[item.mod6] = (mod3Obj[item.mod6] || 0) + 1;
      }
    }

    for (let i = 0; i < Object.keys(numberObj)?.length; i++) {
      let key = Object.keys(numberObj)[i];
      numberArr.push({ name: key, count: numberObj[key], isChecked: false });
    }
    for (let i = 0; i < Object.keys(mod3Obj)?.length; i++) {
      let key = Object.keys(mod3Obj)[i];
      mod3Arr.push({ name: key, count: mod3Obj[key], isChecked: false });
    }
    for (let i = 0; i < Object.keys(mod4Obj)?.length; i++) {
      let key = Object.keys(mod4Obj)[i];
      mod4Arr.push({ name: key, count: mod4Obj[key], isChecked: false });
    }
    for (let i = 0; i < Object.keys(mod5Obj)?.length; i++) {
      let key = Object.keys(mod5Obj)[i];
      mod5Arr.push({ name: key, count: mod5Obj[key], isChecked: false });
    }
    for (let i = 0; i < Object.keys(mod6Obj)?.length; i++) {
      let key = Object.keys(mod6Obj)[i];
      mod6Arr.push({ name: key, count: mod6Obj[key], isChecked: false });
    }

    setState({
      number: numberArr,
      mod3: mod3Arr,
      mod4: mod4Arr,
      mod5: mod5Arr,
      mod6: mod6Arr,
    });
  }, [jsonData]);
  console.log(state);

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
      value={{ jsonData, filterObj, setFilterObj, rowData, filterStat: state }}
    >
      {children}
    </MainProvider.Provider>
  );
};

export default ContextProvider;
