import React, { useState, useEffect } from "react";
import { Col, Divider, message, Select } from "antd";

import ViewExpense from "../components/ViewExpense";

import ApiTable from "../components/ApiTable";
import moment from "moment";
import api from "../axios.config";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    sorter: (a, b) => moment(a.date).format("X") - moment(b.date).format("X"),
    render: (text, record) => {
      var date = moment(text).format("DD-MM-YYYY");
      return date;
    },
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    filters: [
      {
        text: "Project",
        value: "Project",
      },
      {
        text: "Office",
        value: "Office",
      },
      {
        text: "Others",
        value: "Others",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.category.startsWith(value),

    render: (text, record) =>
      `${text === "Project" ? `Project (${record.projectname})` : `${text}`}`,
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    filters: [
      {
        text: "Material",
        value: "Material",
      },
      {
        text: "Extra Work",
        value: "Extrawork",
      },
      {
        text: "Sub Contract",
        value: "Sub Contract",
      },
      {
        text: "Others",
        value: "Others",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.type.startsWith(value),

    render: (text, record) =>
      `${
        text === "Material"
          ? `Material (${record.material})`
          : text === undefined
          ? ""
          : `${text} ${record.particular ? `(${record.particular})` : ""}`
      }`,
  },
  {
    title: "Total Value (in ₹)",
    dataIndex: "amount",
    key: "amount",
    sorter: (a, b) => a.amount - b.amount,
  },

  {
    title: "User",
    dataIndex: "user",
    key: "user",
  },
];

const ProjectExpense = () => {
  useEffect(() => {
    getAllProjects();
  }, []);
  const [projectSelected, setProjectSelected] = useState(null);
  const [Projects, setProjects] = useState([]);
  const [projectLoading, setLoading] = useState(false);
  const onChange = (value) => {
    setProjectSelected(value);
    console.log(projectSelected);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const getAllProjects = () => {
    setLoading(true);
    api
      .get("/project")
      .then((res) => {
        setProjects(res.data.message.Items);
        console.log(res.data.message.Items);
      })
      .catch((err) => {
        message.error("Error in fetching project details !");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Col span={24}>
      <Divider orientation="left" orientationMargin="0">
        Project Expense
      </Divider>
      <Select
        style={{ width: "50%" }}
        showSearch
        placeholder="Select a project"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {Projects.map((item) => (
          <Select.Option value={item.id}>{item.name}</Select.Option>
        ))}
      </Select>
      {projectSelected === null ? null : (
        <>
          <Divider orientation="left" orientationMargin="0">
            Expense of {Projects.find((x) => x.id === projectSelected).name}
          </Divider>
          <ApiTable
            apiURL="/expense"
            apiData={{ status: "approved" }}
            columns={columns}
            rowKey="id"
            exportType="expense"
            expandable={{
              expandedRowRender: (record) => <ViewExpense record={record} />,
              rowExpandable: (record) => record.id !== "Not Expandable",
              expandRowByClick: true,
            }}
          />
        </>
      )}
    </Col>
  );
};

export default ProjectExpense;
