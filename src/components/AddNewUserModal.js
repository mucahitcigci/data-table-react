import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Space,
} from "antd";
import dayjs from "dayjs";
import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Provider";
import useStoreData from "../hooks/useStoreData";
import AddImage from "./AddImage";
import BaseModal from "./BaseModal";

var now = dayjs();
const dateFormat = "MM/DD/YYYY";

export default function AddNewUserModal({ visible, title }) {
  const { setModal, modal, users, setUsers } = useContext(AppContext);
  const [componentSize, setComponentSize] = useState("default");
  const [user, setUser] = useState(modal);
  const { setData } = useStoreData();
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const handleOk = () => {
    let newArr = [...users];
    newArr.push(user);
    setData(newArr, "users");
    setUsers(newArr);
    setModal((prev) => ({ ...prev, visible: true }));
  };
  const handleCancel = () => {
    setModal((prev) => ({ ...prev, visible: false }));
  };

  const updateUser = () => {};

  return (
    <>
      <BaseModal
        title={title}
        visible={visible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      >
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          style={{
            maxWidth: 500,
          }}
        >
          <Form.Item label="İsim Soyisim:">
            <Input
              value={user?.name}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="Doğum Tarihi">
            <DatePicker
              format={dateFormat}
              value={dayjs(user?.birthday ?? now, dateFormat)}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, birthday: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="Cinsiyet">
            <Select
              value={user?.gender}
              onChange={(e) => setUser((prev) => ({ ...prev, gender: e }))}
            >
              <Select.Option value="Erkek">Erkek</Select.Option>
              <Select.Option value="Kadın">Kadın</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="İşe Başlama Tarihi">
            <DatePicker
              format={dateFormat}
              value={dayjs(user?.startDate ?? now, dateFormat)}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, startDate: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="Maaş">
            <Space>
              <InputNumber
                formatter={(value) =>
                  `₺ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\₺\s?|(,*)/g, "")}
                onChange={(e) => setUser((prev) => ({ ...prev, salary: e }))}
                value={user?.salary}
              />
            </Space>
          </Form.Item>
          <Form.Item label="Fotoğraf">
            <AddImage uri={user?.image} />
          </Form.Item>

          <Form.Item label="Kullanım Dışı" valuePropName="checked">
            <Switch
              onChange={(e) => setUser((prev) => ({ ...prev, outOfUse: e }))}
            />
          </Form.Item>
        </Form>
      </BaseModal>
    </>
  );
}
