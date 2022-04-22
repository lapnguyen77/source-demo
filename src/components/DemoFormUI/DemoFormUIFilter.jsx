import React from "react";
// import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Form, Row, Col, Input, Button, Select, Card, DatePicker, Switch } from "antd";
import { SearchOutlined, ReloadOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";

const { Option } = Select;

const DemoFormUIFilter = () => {
  // const { t } = useTranslation()

  const [form] = Form.useForm();

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Card className="mg-b-15">
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          prefix: "86",
        }}
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
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
          <Col span={8}>
            <Form.Item
              name="bdate"
              label="Ngày sinh"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="url" label="Website" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="active" label="Sử dụng" valuePropName="checked" rules={[{ required: true }]}>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "center" }}>
            <Button
              className="btn-filter"
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
            >
              Tìm kiếm
            </Button>
            <Button
              className="btn-filter"
              icon={<ReloadOutlined />}
              onClick={() => {
                form.resetFields();
              }}
            >
              Làm lại
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

DemoFormUIFilter.defaultProps = {};

export default observer(DemoFormUIFilter);
