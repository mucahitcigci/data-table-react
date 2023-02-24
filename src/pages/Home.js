import React, { useContext, useEffect } from "react";
import "antd/dist/reset.css";
import "../App.css";
import { Button, Space } from "antd";
import BaseTable from "../components/BaseTable";
import AddNewUserModal from "../components/AddNewUserModal";
import { PlusOutlined } from "@ant-design/icons";
import { AppContext } from "../context/Provider";
import useStoreData from "../hooks/useStoreData";
import Columns from "../components/Columns";
import FilterComp from "../components/FilterComp";

const Home = () => {
  const { users, setUsers, modal, setModal } = useContext(AppContext);
  const { getData } = useStoreData();
  useEffect(() => {
    checkData();
  }, []);

  const checkData = () => {
    const data = getData("users");
    if (data) {
      console.log(data);
      setUsers(data);
    }
  };

  return (
    <>
      <Space style={{ marginLeft: "25px", marginTop: "25px" }}>
        <FilterComp />
        <Button
          type=""
          className="btn-add"
          onClick={() =>
            setModal({ visible: true, title: "Yeni Kullanıcı Ekle" })
          }
        >
          Yeni Kayıt Ekle <PlusOutlined />
        </Button>{" "}
      </Space>

      <BaseTable columns={Columns()} data={users} />
      <AddNewUserModal
        visible={modal?.visible}
        title={modal?.title}
        data={modal}
        name={modal?.name}
      />
    </>
  );
};
export default Home;
