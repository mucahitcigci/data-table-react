import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import dayjs from "dayjs";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AppContext } from "../context/Provider";
import useStoreData from "../hooks/useStoreData";
const { Option } = Select;
var now = dayjs();

const FilterComp = () => {
  const [open, setOpen] = useState(false);
  const nameRef = useRef();
  const [remove, setRemove] = useState(false);
  const {
    setGender,
    gender,
    name,
    setName,
    startDate,
    setStartDate,
    minSalary,
    maxsalary,
    setMaxSalary,
    setMinSalary,
    outOfUse,
    setOutOfUse,
    users,
    setUsers,
  } = useContext(AppContext);
  const { getData } = useStoreData();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const filterList = () => {
    let newArr = [...users];
    let nameFilteredList = newArr
      .filter((item) =>
        name === "" ? true : item.name.toLowerCase() === name.toLowerCase()
      )
      .filter((item) => (gender === "" ? true : item.gender === gender))
      .filter((item) =>
        outOfUse === "" ? true : item.outOfUse.toString() === outOfUse
      )
      .filter((item) => {
        if (minSalary === "" && maxsalary === "") return true;
        if (minSalary === "" && maxsalary !== "")
          return item.salary <= maxsalary;
        if (minSalary !== "" && maxsalary === "")
          return item.salary >= minSalary;
        if (minSalary !== "" && maxsalary !== "")
          return item.salary >= minSalary && item.salary <= maxsalary;
      });

    setUsers(nameFilteredList);
    setOpen(false);
    document.getElementById("create-course-form").reset();
  };

  const removeFilter = () => {
    document.getElementById("create-course-form").reset();
    const data = getData("users");
    setUsers(data);
    setOpen(false);
  };

  return (
    <>
      <Button className="btn-add" onClick={showDrawer} icon={<PlusOutlined />}>
        Filtre Ekle
      </Button>

      <Drawer
        title="Yeni Bir Filtre Oluşturun"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Form layout="vertical" hideRequiredMark id="create-course-form">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="İsim Soyisim">
                <Input
                  ref={nameRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="outOfUse" label="Kullanım Dışı">
                <Select value={outOfUse} onChange={(e) => setOutOfUse(e)}>
                  <Option value="true">True</Option>
                  <Option value="false">False</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="gender" label="Cinsiyet">
                <Select value={gender} onChange={(e) => setGender(e)}>
                  <Option value="Erkek">Erkek</Option>
                  <Option value="Kadın">Kadın</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="startDate" label="İşe Başlama Tarihi">
                <DatePicker.RangePicker
                  format={"YYYY/MM/DD"}
                  onChange={(e) => setStartDate(e)}
                  style={{
                    width: "100%",
                  }}
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="salary" label="Maaş">
                <Input.Group compact>
                  <Input
                    style={{
                      width: 100,
                      textAlign: "center",
                    }}
                    placeholder="Minimum"
                    onChange={(e) => setMinSalary(e.target.value)}
                    value={minSalary}
                  />
                  <Input
                    className="site-input-split"
                    style={{
                      width: 30,
                      borderLeft: 0,
                      borderRight: 0,
                      pointerEvents: "none",
                    }}
                    placeholder="~"
                    disabled
                  />
                  <Input
                    className="site-input-right"
                    style={{
                      width: 100,
                      textAlign: "center",
                    }}
                    placeholder="Maximum"
                    onChange={(e) => setMaxSalary(e.target.value)}
                    value={maxsalary}
                  />
                </Input.Group>
              </Form.Item>
            </Col>
            <Col span={12}>{/*  */}</Col>
          </Row>
        </Form>
        <Space style={{ float: "right" }}>
          <Button onClick={removeFilter}>filtreleri kaldır</Button>
          <Button onClick={filterList} type="primary">
            Filtrele
          </Button>
        </Space>
      </Drawer>
    </>
  );
};
export default FilterComp;
