import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { AppContext } from "../context/Provider";
import useStoreData from "../hooks/useStoreData";

const Columns = () => {
  const { users, setUsers, setModal } = useContext(AppContext);
  const { setData } = useStoreData();
  function removeUser(i) {
    let newArr = users.filter((_, index) => index != i);
    setUsers(newArr);
    setData(newArr, "users");
  }

  return [
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
      render: (text) => <img width={50} height={50} src={text} alt="Red dot" />,
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
              setModal({
                visible: true,
                ...text,
                title: "Düzenle",
              });
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
};
export default Columns;
