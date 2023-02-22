import { Input } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../context/Provider";

export default function NameFilterComponent() {
  const { name, setName } = useContext(AppContext);
  return (
    <>
      <Input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    </>
  );
}
