import { PlusOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/Provider";

export default function NameFilterComponent() {
  const [inputFields, setInputFields] = useState([{ name: "" }]);
  const { name, setName } = useContext(AppContext);

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
    setName(data);
  };

  const addFields = () => {
    let newfield = { name: "" };
    setInputFields([...inputFields, newfield]);
  };

  return (
    <>
      <Form>
        {inputFields.map((input, index) => {
          return (
            <Form.Item>
              <Input
                name="name"
                placeholder="İsim Soyisim"
                value={input.name}
                onChange={(event) => handleFormChange(index, event)}
              />
            </Form.Item>
          );
        })}
      </Form>
      {/*  artı buton ile birden fazla input basacak default valuesi 1 olacak */}
      <PlusOutlined
        style={{ fontSize: 25, marginRight: 15 }}
        className="btn-edit"
        type=""
        title="Düzenle"
        onClick={addFields}
      />{" "}
      <br />
    </>
  );
}
