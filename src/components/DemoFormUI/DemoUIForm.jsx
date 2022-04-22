import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  Card,
  DatePicker,
  Switch,
  Space,
  message,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  SaveOutlined,
  RollbackOutlined,
  // LinkOutlined,
} from "@ant-design/icons";
// import { useTranslation } from 'react-i18next'

import { hasErrors } from '../../utils/form'

const { Option } = Select;

const DemoUIForm = ({ onSubmit, detail }) => {
  // const { t } = useTranslation()
  const [form] = Form.useForm();
  const { getFieldsError, setFieldsValue } = form
  const [hasErrorsNow, setErrorsNow] = useState(false)

  useEffect(() => {
    setFieldsValue({
      ...detail,
    })
  }, [detail])

  // const extraCard = (
  //   <a href="#">
  //     <Space>
  //       <LinkOutlined />
  //       Link
  //     </Space>
  //   </a>
  // );

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    // message.success("Submit success!");

    onSubmit(values)
  };

  // const onFinishFailed = () => {
  //   message.error("Submit failed!");
  // };

  return (
    <>
      <Card
        className="card-ms-form border-card"
        title="Thông tin chi tiết"
        // extra={extraCard}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          onFieldsChange={() => setErrorsNow(hasErrors(getFieldsError()))}
        >
          <Row gutter={16}>
            <Col className="gutter-row" xs={24} sm={16} md={8} lg={8} xl={8}>
              <Form.Item
                name="code"
                label="Code"
                rules={[
                  { required: true },
                  // { type: "url", warningOnly: true },
                  // { type: "string", min: 6 },
                ]}
              >
                <Input placeholder="Nhập mã" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} sm={16} md={8} lg={8} xl={8}>
              <Form.Item name="Name" label="Name" rules={[{ required: true }]}>
                <Input placeholder="Nhập tên" />
              </Form.Item>
            </Col>
            {/* <Col className="gutter-row" xs={24} sm={16} md={8} lg={8} xl={8}>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true }]}
              >
                <Input placeholder="Nhập địa chỉ" />
              </Form.Item>
            </Col> */}
            <Col className="gutter-row" xs={24} sm={16} md={8} lg={8} xl={8}>
              <Form.Item
                name="gender"
                label="Giới tính"
                rules={[{ required: true }]}
              >
                <Select placeholder="Chọn giới tính" allowClear>
                  <Option value="male">Nam</Option>
                  <Option value="female">Nữ</Option>
                  <Option value="other">Khác</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} sm={16} md={8} lg={8} xl={8}>
              <Form.Item
                name="birthday"
                label="Birthday"
                rules={[{ required: true }]}
              >
                <DatePicker className="full-w" placeholder="Chọn ngày sinh" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} sm={16} md={8} lg={8} xl={8}>
              <Form.Item
                name="url"
                label="Website"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} sm={16} md={8} lg={8} xl={8}>
              <Form.Item
                name="Completed"
                label="Sử dụng"
                valuePropName="checked"
                // rules={[{ required: true }]}
              >
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item className="ant-item-btn">
            <Space>
              <Button
                className="btn-ms"
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
              >
                Submit
              </Button>
              <Button
                className="btn-ms"
                htmlType="button"
                icon={<RollbackOutlined />}
                onClick={() => {
                  form.resetFields();
                }}
              >
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default DemoUIForm;
