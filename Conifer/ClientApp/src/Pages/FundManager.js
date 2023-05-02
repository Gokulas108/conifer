import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
} from "antd";
import moment from "moment";
import { useState } from "react";
const dataSource = [];
const { Option } = Select;

const columns = [
  {
    title: "Transaction",
    dataIndex: "transaction",
    key: "transaction",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Mode of Payment",
    dataIndex: "mode",
    key: "mode",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
];

const ClientPaymentForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="New Client Payment"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="clientpaymentform"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="date"
          label="Date"
          rules={[
            {
              required: true,
              message: "Please input the Date!",
            },
          ]}
        >
          <DatePicker defaultValue={moment()} />
        </Form.Item>
        <Form.Item
          name="name"
          label="Client Name"
          rules={[
            {
              required: true,
              message: "Please input the name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[
            {
              required: true,
              message: "Please input the amount!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="mode"
          label="Mode of Payment"
          rules={[
            {
              required: true,
              message: "Please input the amount!",
            },
          ]}
        >
          <Select>
            <Select.Option value="cash">Cash</Select.Option>
            <Select.Option value="bank">Bank Transfer</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="remarks" label="Remarks">
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const FundReleaseForm = ({ visible, onCreate, onCancel }) => {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="New Fund Release"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="fundreleaseform"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="date"
          label="Date"
          rules={[
            {
              required: true,
              message: "Please input the Date!",
            },
          ]}
        >
          <DatePicker defaultValue={moment()} />
        </Form.Item>
        <Form.Item
          name="staff"
          label="Staff"
          rules={[
            {
              required: true,
              message: "Please input the name!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select a staff"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[
            {
              required: true,
              message: "Please input the amount!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="mode"
          label="Mode of Payment"
          rules={[
            {
              required: true,
              message: "Please input the amount!",
            },
          ]}
        >
          <Select>
            <Select.Option value="cash">Cash</Select.Option>
            <Select.Option value="bank">Bank Transfer</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="remarks" label="Remarks">
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const FundTransferForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="New Fund Transfer"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="fundtransferform"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="date"
          label="Date"
          rules={[
            {
              required: true,
              message: "Please input the Date!",
            },
          ]}
        >
          <DatePicker defaultValue={moment()} />
        </Form.Item>
        <Form.Item
          name="from"
          label="From"
          rules={[
            {
              required: true,
              message: "Please select the debit account!",
            },
          ]}
        >
          <Select>
            <Select.Option value="coop">Cooperative Bank</Select.Option>
            <Select.Option value="bank">Bank</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="to"
          label="To"
          rules={[
            {
              required: true,
              message: "Please select the credit account!",
            },
          ]}
        >
          <Select>
            <Select.Option value="coop">Cooperative Bank</Select.Option>
            <Select.Option value="bank">Bank</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[
            {
              required: true,
              message: "Please input the amount!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="mode"
          label="Mode of Payment"
          rules={[
            {
              required: true,
              message: "Please input the amount!",
            },
          ]}
        >
          <Select>
            <Select.Option value="cashdeposit">Cash Deposit</Select.Option>
            <Select.Option value="bank">Bank Transfer</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="remarks" label="Remarks">
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

function FundManager(props) {
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const on1Create = (values) => {
    console.log("Received values of form: ", values);
    setModal1Visible(false);
  };
  const on2Create = (values) => {
    console.log("Received values of form: ", values);
    setModal2Visible(false);
  };
  const on3Create = (values) => {
    console.log("Received values of form: ", values);
    setModal3Visible(false);
  };
  return (
    <div>
      <Divider orientation="left" orientationMargin="0">
        Fund Manager
      </Divider>
      <Row>
        <Col span={19}>
          <Table dataSource={dataSource} columns={columns} />
        </Col>

        <Col justify="center" span={5}>
          <div style={{ width: "100%" }}>
            <Row justify="center">
              <h3 style={{ margin: "15px 0 15px 25px" }}>
                Add New Transaction
              </h3>
            </Row>
            <Row justify="center">
              <Button
                onClick={() => setModal1Visible(true)}
                type="dashed"
                block
                style={{ margin: "0 0 10px 25px" }}
              >
                Client Payment
              </Button>
              <ClientPaymentForm
                visible={modal1Visible}
                onCreate={on1Create}
                onCancel={() => {
                  setModal1Visible(false);
                }}
              />
            </Row>
            <Row justify="center">
              <Button
                onClick={() => setModal2Visible(true)}
                type="dashed"
                block
                style={{ margin: "0 0 10px 25px" }}
              >
                Fund Release
              </Button>
              <FundReleaseForm
                visible={modal2Visible}
                onCreate={on2Create}
                onCancel={() => {
                  setModal2Visible(false);
                }}
              />
            </Row>
            <Row justify="center">
              <Button
                onClick={() => setModal3Visible(true)}
                type="dashed"
                block
                style={{ margin: "0 0 10px 25px" }}
              >
                Fund Transfer
              </Button>
              <FundTransferForm
                visible={modal3Visible}
                onCreate={on3Create}
                onCancel={() => {
                  setModal3Visible(false);
                }}
              />
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default FundManager;
