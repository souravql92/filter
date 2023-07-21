import { FC, useState, useEffect, ChangeEvent, useContext, memo } from "react";
import styles from "./styles.module.css";
import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
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
  const [newArr, setNewArr] = useState<RowArray[]>([]);
  const { filterObj, setFilterObj, filterStat }: any = useContext(MainProvider);

  useEffect(() => {
    setNewArr(filterStat[name]);
  }, [filterStat, name]);

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
    let tempArr = filterStat[name].filter((item: any) =>
      item.name?.includes(val?.trim())
    );
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
