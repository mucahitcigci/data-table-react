import { Table } from "antd";
import React from "react";

export default function BaseTable({ columns, data }) {
  return (
    <div className="container">
      <Table className="base-table" columns={columns} dataSource={data} />
    </div>
  );
}
