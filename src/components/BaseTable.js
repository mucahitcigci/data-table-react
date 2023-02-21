import { Table } from "antd";
import React from "react";

export default function BaseTable({ columns, data }) {
  return (
    <>
      <Table className="base-table" columns={columns} dataSource={data} />
    </>
  );
}
