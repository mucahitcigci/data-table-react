import { Input, Select } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../context/Provider";

export default function OutOfUseFilter() {
  const { outOfUse, setOutOfUse } = useContext(AppContext);
  return (
    <>
      <label style={{ width: 50 }}>Kullanım Dışı: </label>
      <Select
        value={outOfUse}
        onChange={(e) => setOutOfUse(e)}
        style={{ width: 200, marginBottom: 5 }}
      >
        <Select.Option value="true">True</Select.Option>
        <Select.Option value="false">False</Select.Option>
      </Select>{" "}
      <br />
    </>
  );
}
