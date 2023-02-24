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
import {
  genderFilter,
  maxSalaryFilter,
  minSalaryFilter,
  nameFilter,
  outOfUseFilter,
} from "../helpers/globalFunctions";
import useStoreData from "../hooks/useStoreData";
import GenderFilterComponent from "./GenderFilterComponent";
import NameFilterComponent from "./NameFilterComponent";
import OutOfUseFilter from "./OutOfUseFilter";
import SalaryFilter from "./SalaryFilter";
import StartDateFilter from "./StartDateFilter";
const { Option } = Select;
var now = dayjs();

const FilterComp = () => {
  const [open, setOpen] = useState(false);
  const [customFilters, setCustomFilters] = useState([]);
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

  const selectComponent = [
    {
      value: "Name",
      component: <NameFilterComponent />,
      id: 1,
    },
    { value: "Gender", component: <GenderFilterComponent /> },
    // {
    //   value: "StartDate",
    //   component: <StartDateFilter value={"StartDate"} />,
    //   id: 2,
    // },
    // {
    //   value: "EndDate",
    //   component: <StartDateFilter value={"EndDate"} />,
    //   id: 3,
    // },
    { value: "OutOfUse", component: <OutOfUseFilter />, id: 4 },
    {
      value: "MinSalary",
      component: <SalaryFilter value={"MinSalary"} />,
      id: 5,
    },
    {
      value: "MaxSalary",
      component: <SalaryFilter value={"MaxSalary"} />,
      id: 6,
    },
  ];

  const filterFunc = {
    Name: nameFilter,
    Gender: genderFilter,
    MinSalary: minSalaryFilter,
    MaxSalary: maxSalaryFilter,
    OutOfUse: outOfUseFilter,
  };

  const filterValue = {
    Name: name,
    Gender: gender,
    MinSalary: minSalary,
    MaxSalary: maxsalary,
    OutOfUse: outOfUse,
  };

  const filterList = () => {
    let filteredList = [...users];
    for (let i = 0; i < customFilters.length; i++) {
      const element = customFilters[i].value;
      let newArr = filterFunc[element](filteredList, filterValue[element]);
      filteredList = newArr;
    }
    setUsers(filteredList);
  };

  const removeFilter = () => {
    setCustomFilters([]);
    const data = getData("users");
    setUsers(data);
    setOpen(false);
  };

  const addComponent = (e) => {
    let newFilters = [...customFilters];
    newFilters.push(selectComponent.filter((item) => item.value === e)[0]);
    setCustomFilters(newFilters);
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
        {customFilters.map((item) => (
          <>{item.component}</>
        ))}
        <Space>
          <Select onChange={addComponent} style={{ width: 120 }}>
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Select.Option value={selectComponent[i].value}>
                  {selectComponent[i].value}
                </Select.Option>
              ))}
          </Select>
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
