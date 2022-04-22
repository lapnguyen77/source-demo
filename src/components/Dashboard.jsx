import React, { useState } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  Card,
  Divider,
  Space,
} from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const Dashboard = ({ appName }) => {
  // const { t } = useTranslation()

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Card className="card-ms border-card">
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          prefix: "86",
        }}
        onFinish={onFinish}
      >
        <Row>
          <Col flex="auto">
            <Input
              allowClear
              className="filter-ms"
              placeholder="Nhập nội dung tìm kiếm"
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col style={{ textAlign: "right" }} flex="390px">
            <Space>
              <Button
                className="btn-ms"
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
              >
                Tìm kiếm
              </Button>
              <Button
                className="btn-ms"
                icon={<ReloadOutlined />}
                onClick={() => {
                  form.resetFields();
                }}
              >
                Làm mới
              </Button>
              <Button className="btn-ms btn-add-ms" icon={<PlusOutlined />}>
                Thêm mới
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
      <Divider orientation="left" plain>
        <span className="txt-divider-ms">Thông tin dữ liệu</span>
      </Divider>
      <Row>
        <Col>
          
        </Col>
      </Row>
    </Card>
  );
};

Dashboard.propTypes = {
  appName: PropTypes.string.isRequired,
};

Dashboard.defaultProps = {};

export default observer(Dashboard);
