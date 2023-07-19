import { FC, memo } from "react";
import styles from "./styles.module.css";

type Props = {
  value: number;
  count: string;
  isChecked: boolean;
  handleSelect: any;
};

const Select: FC<Props> = ({ value, count, isChecked, handleSelect }) => {
  return (
    <div className={styles.list}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => handleSelect(value, !isChecked)}
      />
      <span>{value}</span>
      <span>{count}</span>
    </div>
  );
};

export default memo(Select);
