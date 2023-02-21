import { EditOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Space,
} from "antd";
import dayjs from "dayjs";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/Provider";
import { imageUpload } from "../helpers/globalFunctions";
import NewImagePicker from "./NewImagePicker";

var now = dayjs();
const dateFormat = "MM/DD/YYYY";

export default function UserForm({ setUser, user, updateImage }) {
  const [componentSize, setComponentSize] = useState("default");

  const { image, setImage } = useContext(AppContext);
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const setData = async (e) => {
    let data = await imageUpload(e);
    setImage(data);
  };

  return (
    <>
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
            onChange={(e) => {
              setUser((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
        </Form.Item>
        <Form.Item label="Doğum Tarihi">
          <DatePicker
            format={dateFormat}
            value={dayjs(user?.birthday ?? now, dateFormat)}
            onChange={(_, i) => setUser((prev) => ({ ...prev, birthday: i }))}
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
            onChange={(_, i) => setUser((prev) => ({ ...prev, startDate: i }))}
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
          <NewImagePicker uri={user?.image} />
          {(user?.image || image !== "") && (
            <>
              <label htmlFor="filePicker">
                <EditOutlined
                  style={{ fontSize: 25, marginRight: 15 }}
                  className="btn-edit"
                  type=""
                  title="Düzenle"
                />
              </label>
              <input
                id="filePicker"
                style={{ visibility: "hidden" }}
                type={"file"}
                onChange={setData}
              />
            </>
          )}
        </Form.Item>
        <Form.Item label="Kullanım Dışı" valuePropName="checked">
          <Switch
            onChange={(e) => setUser((prev) => ({ ...prev, outOfUse: e }))}
          />
        </Form.Item>
      </Form>
    </>
  );
}
