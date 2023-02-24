import { Input } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../context/Provider";

export default function SalaryFilter({ value }) {
  const { minSalary, setMinSalary, setMaxSalary, maxsalary } =
    useContext(AppContext);
  return (
    <>
      <Input
        style={{ width: "%100", marginBottom: 5 }}
        placeholder={value === "MinSalary" ? "Minimum Değer" : "Maximum Değer"}
        value={value === "MinSalary" ? minSalary : maxsalary}
        onChange={(e) => {
          value === "MinSalary"
            ? setMinSalary(e.target.value)
            : setMaxSalary(e.target.value);
        }}
      />
    </>
  );
}
