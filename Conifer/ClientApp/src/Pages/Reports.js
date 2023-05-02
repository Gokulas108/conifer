import { Button, Card, Divider, List, Radio, Select } from "antd";
import { useState } from "react";
const { Option } = Select;

function Reports(props) {
  const [value, setValue] = useState(1);
  const [projectSelected, setProjectSelected] = useState(null);
  const [userSelected, setUserSelected] = useState(null);
  const onPChange = (value) => {
    console.log(`selected ${value}`);
    setProjectSelected(value);
  };

  const onPSearch = (value) => {
    console.log("search:", value);
  };
  const onUChange = (value) => {
    console.log(`selected ${value}`);
    setUserSelected(value);
  };

  const onUSearch = (value) => {
    console.log("search:", value);
  };

  const data = [
    {
      title: "Total Accounts",
      content: (
        <>
          Summary of total accounts.
          <br />
          <br />
          Format:
          <br />
          <Radio.Group value={value}>
            <Radio value={1}>PDF</Radio>
            <Radio value={2}>XLS</Radio>
          </Radio.Group>
          <br />
          <br />
          <Button type="primary">Download</Button>
        </>
      ),
    },
    {
      title: "Project Accounts",
      content: (
        <>
          Summary of accounts for selected project.
          <br />
          <br />
          Project:
          <br />
          <Select
            showSearch
            placeholder="Select a project"
            optionFilterProp="children"
            onChange={onPChange}
            onSearch={onPSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
          <br />
          <br />
          Format:
          <br />
          <Radio.Group value={value}>
            <Radio value={1}>PDF</Radio>
            <Radio value={2}>XLS</Radio>
          </Radio.Group>
          <br />
          <br />
          {projectSelected ? (
            <Button type="primary">Download</Button>
          ) : (
            <Button disabled type="primary">
              Download
            </Button>
          )}
        </>
      ),
    },
    {
      title: "User Expenses",
      content: (
        <>
          Total expenses made by the selected user.
          <br />
          <br />
          User:
          <br />
          <Select
            showSearch
            placeholder="Select a user"
            optionFilterProp="children"
            onChange={onUChange}
            onSearch={onUSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
          <br />
          <br />
          Format:
          <br />
          <Radio.Group value={value}>
            <Radio value={1}>PDF</Radio>
            <Radio value={2}>XLS</Radio>
          </Radio.Group>
          <br />
          <br />
          {userSelected ? (
            <Button type="primary">Download</Button>
          ) : (
            <Button disabled type="primary">
              Download
            </Button>
          )}
        </>
      ),
    },
  ];
  return (
    <div>
      <Divider orientation="left" orientationMargin="0">
        Reports
      </Divider>
      <List
        grid={{
          gutter: 16,
          column: 4,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title}>{item.content}</Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Reports;
