import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import {
  Layout,
  Menu,
  Row,
  Col,
  Dropdown,
  Avatar,
  Button,
  Space,
  Badge,
  Drawer,
} from "antd";
import i18n from "../i18n";
import { withTranslation } from "react-i18next";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  BellFilled,
  LogoutOutlined,
} from "@ant-design/icons";

import RootStoreContext from "../contexts/RootStoreContext";

import AvatarDefault from "../images/avatar-default.png";

import FlagVi from "../images/flags/vi.png";
import FlagEn from "../images/flags/en.png";

import NavbarContainer from "../containers/Navigation/NavbarContainer";

const { Header, Sider, Content, Footer } = Layout;

class AuthenticatedLayout extends Component {
  static contextType = RootStoreContext;
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  state = {
    collapsed: false,
    marginLeft: 250,
    visible: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      marginLeft: this.state.collapsed ? 250 : 80,
    });
  };

  changeLanguageApp = (value) => {
    // console.log("changeLanguageApp: ", value, i18n.language);
    i18n.changeLanguage(value);
  };

  showDrawer = () => {
    this.setState({
      visible: true,
      collapsed: true,
      marginLeft: 250,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      collapsed: !this.state.collapsed,
      marginLeft: this.state.collapsed ? 250 : 80,
    });
  };

  render() {
    // const { navStore } = this.context

    const { children, t: translator } = this.props;

    const avatar = AvatarDefault;

    const handleError = (e) => {
      e.target.src = AvatarDefault;
    };

    const renderMenu = () => (
      <Menu>
        <Menu.Item key="logout">
          <UserOutlined style={{ marginRight: "1.4rem" }} />
          Thông tin tài khoản
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="login">
          <Link to="/login">
            <LogoutOutlined style={{ marginRight: "1.4rem" }} />
            Đăng xuất
          </Link>
        </Menu.Item>
      </Menu>
    );

    const { visible } = this.state;

    const menuFlag = (
      <Menu
        className="dr-mn-lang"
        onClick={(e) => this.changeLanguageApp(e.key)}
      >
        <Menu.Item key="vi-VN">
          <Space className="mn-item-sp">
            <span className="bg-item-menu vi-img"></span>
            <span>Vietnamese</span>
          </Space>
        </Menu.Item>
        <Menu.Item key="en-US">
          <Space className="mn-item-sp">
            <span className="bg-item-menu en-img"></span>
            <span>English</span>
          </Space>
        </Menu.Item>
      </Menu>
    );

    const notiList = (
      <Menu className="dr-mn-noti">
        <Menu.Item key="1">
          <Space>
            <Avatar size="64" src={avatar} onError={handleError} />
            <span>Notification A</span>
          </Space>
        </Menu.Item>
        <Menu.Item key="2">
          <Space>
            <Avatar size="64" src={avatar} onError={handleError} />
            <span>Notification B</span>
          </Space>
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout className="main-layout">
        {/* Menu desktop */}
        <Sider
          width={this.state.marginLeft}
          className="main-sidebar"
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          // collapsedWidth={0}
          // breakpoint="sm"
        >
          <div className="logo-main" />
          <NavbarContainer t={translator} mgLeft={this.state.marginLeft} />
        </Sider>

        {/* Menu Mobile */}
        <Drawer
          className="navbar-mobile"
          // title="ESS App"
          width={this.state.marginLeft + 1}
          placement='left'
          closable={false}
          onClose={this.onClose}
          visible={visible}
          key='left'
        >
          <NavbarContainer t={translator} mgLeft={this.state.marginLeft} />
        </Drawer>

        {/* Main content */}
        <Layout
          className="layout-ui-ms"
          style={{ marginLeft: this.state.marginLeft }}
        >
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Row>
              {/* trigger button desktop */}
              <Col className="trigger-nav-desk" span={4}>
                {React.createElement(
                  this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: this.toggle,
                  }
                )}
              </Col>

              {/* trigger button mobile */}
              <Col className="trigger-nav-mob" span={4}>
                <Button className="btn-trigger" type="link" onClick={this.showDrawer}>
                  <MenuUnfoldOutlined />
                </Button>
              </Col>

              <Col className="pad-l-r-10" span={20}>
                <Row className="header-info-s">
                  <Col span={24}>
                    {/* Notification */}
                    <Dropdown
                      className="noti-header"
                      placement="bottomRight"
                      overlay={notiList}
                      trigger={["click"]}
                      arrow
                      overlayClassName="my-noti-dr"
                    >
                      <Space className="hover-dr-ms mg-r" size="middle">
                        <Badge count={5}>
                          <Avatar
                            style={{ backgroundColor: "#87d068" }}
                            icon={<BellFilled />}
                            size="64"
                          />
                        </Badge>
                      </Space>
                    </Dropdown>

                    {/* Language */}
                    <Dropdown
                      placement="bottomRight"
                      overlay={menuFlag}
                      // trigger={["click"]}
                      arrow
                      overlayClassName="my-lang-dr"
                      className="lang-header"
                    >
                      <Button type="link">
                        <Space size="middle">
                          <span className="fw-b">
                            {i18n.language === "vi-VN"
                              ? "Vietnamese"
                              : "English"}
                          </span>
                          <Avatar
                            size="64"
                            src={i18n.language === "vi-VN" ? FlagVi : FlagEn}
                          />
                        </Space>
                      </Button>
                    </Dropdown>

                    {/* Profile */}
                    <Dropdown
                      overlay={renderMenu()}
                      // trigger={["click"]}
                      placement="bottomRight"
                      arrow
                      overlayClassName="my-pos-dr"
                      className="pro-header"
                    >
                      <Button type="link">
                        <Space size="middle">
                          <span className="pro-name fw-b">Admin</span>
                          <Avatar
                            size="large"
                            src={avatar}
                            onError={handleError}
                          />
                        </Space>
                      </Button>
                    </Dropdown>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Header>
          <Content className="main-layout-content">{children}</Content>
          <Footer style={{ textAlign: "center" }}>
            ©{new Date().getFullYear()} Design UI
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default observer(withTranslation()(AuthenticatedLayout));
