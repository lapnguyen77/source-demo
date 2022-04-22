import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Checkbox,
  Avatar,
  Typography,
} from "antd";
import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { hasErrors } from "../../../utils/form";

const { Title } = Typography;

const LoginForm = ({ login, loginLoading, redirectPath }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { getFieldsError } = form;
  const [hasErrorsNow, setErrorsNow] = useState(false);

  const onFinish = (values) => {
    console.log("Received values of form: ", values, redirectPath);
    login(
      {
        ...values,
        username: values.username.trim().toLowerCase(),
      },
      redirectPath
    );
  };

  return (
    <div className="login-form-wrapper">
      <Row>
        <Col span={24} className="avatar-login">
          <Avatar
            style={{ backgroundColor: "#5e35b1" }}
            size="large"
            icon={<LockOutlined />}
          />
        </Col>
        <Col span={24} className="title-login">
          <Title level={2}>{t("login.title")}</Title>
        </Col>
      </Row>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFieldsChange={() => setErrorsNow(hasErrors(getFieldsError()))}
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: t("login.message.username-required"),
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder={t("login.username")}
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: t("login.message.password-required"),
            },
            { min: 8, message: t("login.message.password-min-length") },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder={t("login.password")}
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="color-b">{t("login.remember-btn")}</Checkbox>
          </Form.Item>

          <a className="login-form-forgot color-b" href="">
            {t("login.forgot-btn")}
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={hasErrorsNow || loginLoading}
            size="large"
            loading={loginLoading}
          >
            <LoginOutlined />
            {t("login.login-btn")}
          </Button>
          <b className="color-b">{t("login.or")}</b>{" "}
          <a href="">
            {t("login.register-btn")}!
          </a>
        </Form.Item>
      </Form>
      <Row>
        <Col span={24} style={{textAlign: "center"}}>
          <p>Copyright © 2022.</p>
        </Col>
      </Row>
    </div>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  loginLoading: PropTypes.bool.isRequired,
  redirectPath: PropTypes.string,
};

LoginForm.defaultProps = {
  redirectPath: null,
};

export default LoginForm;
