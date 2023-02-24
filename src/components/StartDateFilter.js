import { DatePicker } from "antd";
import dayjs from "dayjs";
import React, { useContext } from "react";
import { AppContext } from "../context/Provider";

var now = dayjs();
const dateFormat = "MM/DD/YYYY";

export default function StartDateFilter({ value }) {
  const { setStartDate, setEndDate } = useContext(AppContext);
  return (
    <>
      <DatePicker
        format={dateFormat}
        onChange={(e) => {
          value === "StartDate" ? setStartDate(e) : setEndDate(e);
        }}
        style={{
          width: "100%",
        }}
        getPopupContainer={(trigger) => trigger.parentElement}
      />
    </>
  );
}
