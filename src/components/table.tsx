import { useContext, useState } from "react";
import SelectBar from "./selectBar";
import { MainProvider } from "../context";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const Table = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { rowData }: any = useContext(MainProvider);

  return (
    <div>
      <div className="filter">
        <SelectBar name="number" />
        <SelectBar name="mod3" />
        <SelectBar name="mod4" />
        <SelectBar name="mod5" />
        <SelectBar name="mod6" />
      </div>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>number</td>
            <td>mod3</td>
            <td>mod4</td>
            <td>mod5</td>
            <td>mod6</td>
          </tr>
        </thead>
        <tbody>
          {rowData
            ?.slice(currentPage * 20, (currentPage + 1) * 20)
            .map((item: any, i: number) => (
              <tr key={i}>
                <td>{currentPage * 50 + i + 1}</td>
                <td>{item.number}</td>
                <td>{item.mod3}</td>
                <td>{item.mod4}</td>
                <td>{item.mod5}</td>
                <td>{item.mod6}</td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <span>{`${(currentPage + 1)}/${Math.floor(rowData.length / 50)}`}</span>
          <button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <GrFormPrevious />
          </button>
          <button
            disabled={currentPage === Math.floor(rowData.length / 50)}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <GrFormNext />
          </button>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
