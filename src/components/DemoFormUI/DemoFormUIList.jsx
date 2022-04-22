import React from "react";
import PropTypes from "prop-types";
import { observer, PropTypes as MobxPropTypes } from "mobx-react";
// import { history } from "../../stores";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Divider,
  Space,
  Button,
  Checkbox,
} from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import DataTable from "../../components/Shared/DataTable";
import { useTranslation } from "react-i18next";

const DemoFormUIList = ({
  getListLoading,
  onTableChange,
  list,
  pagination,
}) => {
  // const { t } = useTranslation();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "Id",
      key: "Id",
    },
    {
      title: "Title",
      dataIndex: "Title",
      key: "Title",
    },
    {
      title: "Completed",
      dataIndex: "Completed",
      key: "Completed",
      render: (value) => (
        <div className="a-center">
          <Checkbox defaultChecked={value} disabled />
        </div>
      ),
    },
    {
      title: "TenantId",
      dataIndex: "TenantId",
      key: "TenantId",
    },
  ];

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
              <Link to="/demo-form-ui/add">
                <Button className="btn-ms btn-add-ms" icon={<PlusOutlined />}>
                  Thêm mới
                </Button>
              </Link>
            </Space>
          </Col>
        </Row>
      </Form>
      <Divider orientation="left" plain>
        <span className="txt-divider-ms">Thông tin dữ liệu</span>
      </Divider>
      <Row>
        <Col span={24}>
          <DataTable
            columns={columns}
            dataSource={list}
            loading={getListLoading}
            rowKey="Id"
            onChange={onTableChange}
            pagination={pagination}
            className="selectable-rows"
            // onRow={(record) => ({
            //   onClick: () => {
            //     const path = `/demo-form-ui/edit/${record.Id}`;
            //     history.push(path);
            //   },
            // })}
          />
        </Col>
      </Row>
    </Card>
  );
};

DemoFormUIList.propTypes = {
  getListLoading: PropTypes.bool.isRequired,
  onTableChange: PropTypes.func.isRequired,
  list: MobxPropTypes.arrayOrObservableArray,
  pagination: MobxPropTypes.objectOrObservableObject,
};

DemoFormUIList.defaultProps = {
  list: [],
  pagination: {},
};

export default observer(DemoFormUIList);
