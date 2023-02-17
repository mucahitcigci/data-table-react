import React, { useContext, useState, useEffect } from "react";
import "antd/dist/reset.css";
import "../App.css";
import { Button, Col, Row, Space, Tag } from "antd";
import BaseTable from "../components/BaseTable";
import AddNewUserModal from "../components/AddNewUserModal";
import AddImage from "../components/AddImage";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { AppContext } from "../context/Provider";
import useStoreData from "../hooks/useStoreData";

const data = [
  // {
  //   key: "0",
  //   outOfUse: "False",
  //   name: "John Brown",
  //   gender: "Erkek",
  //   birthday: "06/16/2202",
  //   salary: 12000,
  //   image: "https://picsum.photos/200/300",
  //   startDate: "06/16/2202",
  // },
  // {
  //   key: "1",
  //   outOfUse: "True",
  //   name: "John Brown",
  //   gender: "Erkek",
  //   birthday: "06/16/2202",
  //   salary: 12000,
  //   image: "https://picsum.photos/200/300",
  //   startDate: "06/16/2202",
  // },
  // {
  //   key: "2",
  //   outOfUse: "True",
  //   name: "Jess Brown",
  //   gender: "Kadın",
  //   birthday: "06/16/2202",
  //   salary: 12000,
  //   image: "https://picsum.photos/200/300",
  //   startDate: "06/16/2202",
  // },
];

const Home = () => {
  const { users, setUsers, modal, setModal } = useContext(AppContext);
  const { getData, setData } = useStoreData();
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

  function removeUser(i) {
    let newArr = users.filter((item, index) => index != i);
    setUsers(newArr);
    setData(newArr, "users");
  }
  const columns = [
    {
      title: "Kullanım Dışı",
      key: "outOfUse",
      dataIndex: "outOfUse",
      filters: [
        {
          text: "True",
          value: "True",
        },
        {
          text: "False",
          value: "False",
        },
      ],
      onFilter: (value, record) => record.outOfUse.startsWith(value),
      render: (text) => (
        <a title={{ text }}>{text ? text.toString() : "false"}</a>
      ),
    },

    {
      title: "İsim Soyisim",
      dataIndex: "name",
      key: "name",
      render: (text) => <a title={{ text }}>{text}</a>,
    },
    {
      title: "Doğum Tarihi",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Cinsiyet",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "İşe Başlama Tarihi",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "Maaş",
      key: "salary",
      dataIndex: "salary",
    },
    {
      title: "Fotoğraf",
      key: "image",
      dataIndex: "image",
    },
    {
      title: "Düzenle/Sil",
      key: "btn",
      render: (text, record, index) => (
        <>
          {/* <Button onClick={() => console.log(text)}>Düzenle</Button> */}
          <EditOutlined
            style={{ fontSize: 25, marginRight: 15 }}
            className="btn-edit"
            type=""
            title="Düzenle"
            onClick={() => {
              setModal(() => ({ visible: true, title: "Düzenle", ...text }));
            }}
          />

          <DeleteOutlined
            style={{ fontSize: 25 }}
            className="btn-delete"
            type=""
            title="Sil"
            onClick={() => removeUser(index)}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Button
        type=""
        className="btn-add"
        onClick={() =>
          setModal({ visible: true, title: "Yeni Kullanıcı Ekle" })
        }
      >
        Yeni Kayıt Ekle <PlusOutlined />
      </Button>
      <BaseTable columns={columns} data={users} />
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
