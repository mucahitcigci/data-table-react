import { Input, Select } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../context/Provider";

export default function GenderFilterComponent() {
  const { gender, setGender } = useContext(AppContext);
  return (
    <>
      <label style={{ width: 50 }}>Cinsiyeti : </label>
      <Select
        value={gender}
        onChange={(e) => setGender(e)}
        style={{ width: 200, marginBottom: 5 }}
      >
        <Select.Option value="Erkek">Erkek</Select.Option>
        <Select.Option value="Kadın">Kadın</Select.Option>
      </Select>
      <br />
    </>
  );
}
