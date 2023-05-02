import { Button, message, Table, Tooltip, Row, Col, Input } from "antd";
import React, { useEffect, useState } from "react";
import {
  FileExcelOutlined,
  FilePdfOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import api from "../axios.config";
var XLSX = require("xlsx");
const { jsPDF } = require("jspdf");
const { Search } = Input;

const ApiTable = ({
  exportType = "none",
  columns,
  apiURL,
  apiData,
  apiTableFunctions,
  ...rest
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [LastEvaluatedKey, setLastEvaluatedKey] = useState(false);

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    let title, pdf_data, headers;

    if (exportType === "expense") {
      title = "Expenses";
      headers = [["Date", "Category", "Type", "Total Amount", "Added By"]];
      pdf_data = data.map((elt) => [
        elt.date,
        elt.category,
        elt.type,
        elt.amount,
        elt.user,
      ]);

      let content = {
        startY: 50,
        head: headers,
        body: pdf_data,
      };

      doc.text(title, marginLeft, 40);
      doc.autoTable(content);
      doc.save("Expenses.pdf");
    }
  };

  const exportXLSX = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(data);

    if (exportType === "expense") {
      XLSX.utils.book_append_sheet(wb, ws, "Expense");
      XLSX.writeFile(wb, "Expense.xlsx");
    }
  };

  const deleteRecord = (id) => {
    setData((array) => {
      let new_array = array.filter(function (obj) {
        return obj.id !== id;
      });
      return new_array;
    });
  };

  const fetchData = () => {
    setPageLoading(true);
    api
      .get(apiURL, {
        params: {
          ...(apiData ? apiData : {}),
          ...{ LastEvaluatedKey: JSON.stringify(LastEvaluatedKey || null) },
        },
      })
      .then((res) => {
        console.log(res);
        let new_LEK = res.data.message.LastEvaluatedKey
          ? res.data.message.LastEvaluatedKey
          : null;

        if (
          !(
            (new_LEK === null && LastEvaluatedKey === null) ||
            JSON.stringify(new_LEK) === JSON.stringify(LastEvaluatedKey)
          )
        )
          setData([...data, ...res.data.message.Items]);

        if (res.data.message.LastEvaluatedKey) {
          setLastEvaluatedKey(res.data.message.LastEvaluatedKey);
        } else {
          setLastEvaluatedKey(null);
        }
      })
      .catch((err) => message.error("Error fetching data from database"))
      .finally(() => {
        setPageLoading(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    if (apiTableFunctions)
      apiTableFunctions({
        deleteRecord,
      });
  }, []);

  return (
    <>
      <Row>
        <Col span={20}>
          <div
            style={{
              width: "100%",
              background: "#fafafa",
              padding: "10px 0px 5px 10px",
              display: "flex",
            }}
          >
            <Search placeholder="Search..." style={{ width: "50%" }} />
          </div>
        </Col>
        <Col span={4}>
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#fafafa",
              padding: "10px 0px 5px 10px",
              justifyContent: "end",
              display: "flex",
            }}
          >
            <Tooltip title="Export to XLSX">
              <div
                className="pointer-cursor"
                style={{ display: "inline-block", paddingRight: "10px" }}
                onClick={exportXLSX}
              >
                <FilePdfOutlined style={{ fontSize: "160%" }} />
              </div>
            </Tooltip>
            <div
              className="pointer-cursor"
              style={{ display: "inline-block", paddingRight: "10px" }}
              onClick={exportPDF}
            >
              <Tooltip title="Export to PDF">
                <FileExcelOutlined style={{ fontSize: "160%" }} />
              </Tooltip>
            </div>
          </div>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={loading}
        {...rest}
      />
      <Button
        onClick={fetchData}
        style={LastEvaluatedKey ? {} : { display: "none" }}
        block
      >
        {pageLoading ? <LoadingOutlined /> : "Load more items"}
      </Button>
    </>
  );
};

export default ApiTable;
