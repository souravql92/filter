import { FC, useState, useEffect, ChangeEvent, useContext, memo } from "react";
import styles from "./styles.module.css";
import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
import jsonData from "../data.json";
import Select from "./select";
import { MainProvider } from "../context";

type Props = {
  name: string;
};

interface RowArray {
  name: string;
  count: number;
  isChecked: boolean;
}

const SelectBar: FC<Props> = ({ name }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<RowArray[]>([]);
  const [newArr, setNewArr] = useState<RowArray[]>([]);
  const { filterObj, setFilterObj }: any = useContext(MainProvider);

  useEffect(() => {
    let tempObj: any = {};
    let tempArr: RowArray[] = [];

    for (let i = 0; i < jsonData.length; i++) {
      let ele: any = jsonData[i];
      let key: string = ele[name];
      tempObj[key] = (tempObj[key] || 0) + 1;
    }

    for (let i = 0; i < Object.keys(tempObj)?.length; i++) {
      let key = Object.keys(tempObj)[i];
      tempArr.push({ name: key, count: tempObj[key], isChecked: false });
    }
    setNewArr(tempArr);
    setData(tempArr);
  }, [name]);

  const handleSelect = (value: string, check: boolean) => {
    let tempArr = newArr?.map((item) =>
      item.name === value ? { ...item, isChecked: check } : item
    );
    setNewArr(tempArr);

    let tempObj = { ...filterObj };

    let arr = tempArr?.filter((item) => item.isChecked);
    if (arr.length > 0) {
      tempObj[name] = arr.map((item) => item.name);
    } else {
      delete tempObj[name];
    }
    setFilterObj(tempObj);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e?.target?.value;
    let tempArr = data.filter((item) => item.name?.includes(val?.trim()));
    setNewArr(tempArr);
  };

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    let tempArr = newArr?.map((item) => ({
      ...item,
      isChecked: e?.target?.checked,
    }));
    setNewArr(tempArr);
    let tempObj = { ...filterObj };
    if (e?.target?.checked) {
      let arr = newArr?.map((item) => item.name);
      tempObj[name] = arr;
    } else {
      delete tempObj[name];
    }
    setFilterObj(tempObj);
  };

  return (
    <div className={styles.container}>
      <button onClick={() => setOpen((pre) => !pre)}>
        {name} <AiFillCaretDown />
      </button>
      {open && (
        <div className={styles.card}>
          <div className={`${styles.title} ${styles.list}`}>
            <input type="checkbox" onChange={handleSelectAll} />
            {name}
          </div>
          <div className={`${styles.search} ${styles.list}`}>
            <div>
              <AiOutlineSearch />
            </div>
            <input placeholder="Type to Search" onChange={handleChange} />
          </div>
          <div className={styles.lists}>
            {newArr?.map((item: any, i: number) => (
              <Select
                key={i}
                count={item.count}
                value={item.name}
                isChecked={item.isChecked}
                handleSelect={handleSelect}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(SelectBar);
