import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { Menu } from "antd";
// import {SettingOutlined } from "@ant-design/icons";
import { MENU_TYPES } from "../../constants";
import { useTranslation } from "react-i18next";

const { SubMenu } = Menu;

const renderIcon = ItemIcon => (
  <ItemIcon />
)

const Navbar = ({
  theme,
  mode,
  pathname,
  push,
  mgLeft,
  menu,
  selectedKey,
  handleMenuClick,
}) => {
  const { t } = useTranslation();

  if (menu.length === 0) {
    return null
  }

  return (
    <Menu
      style={{ width: mgLeft }}
      theme={theme}
      mode={mode}
      selectedKeys={[selectedKey]}
      onClick={handleMenuClick}
      className="menu-ms"
    >
      {menu.map((item) =>
        item.type === MENU_TYPES.MenuItem ? (
          <Menu.Item key={item.key} icon={renderIcon(item.icon)}>
            {item.transKey ? t(item.transKey) : item.text}
          </Menu.Item>
        ) : (
          <SubMenu
            key={item.key}
            icon={renderIcon(item.icon)}
            title={item.transKey ? t(item.transKey) : item.text}
          >
            {item.items.map((subMenuItem) => (
              <Menu.Item key={subMenuItem.key}>
                {subMenuItem.transKey
                  ? t(subMenuItem.transKey)
                  : subMenuItem.text}
              </Menu.Item>
            ))}
          </SubMenu>
        )
      )}
    </Menu>
  );
};

Navbar.propTypes = {
  theme: PropTypes.string,
  mode: PropTypes.string,
  pathname: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  mgLeft: PropTypes.number.isRequired,
  menu: PropTypes.arrayOf(PropTypes.object),
  selectedKey: PropTypes.string.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  theme: null,
  mode: null,
  menu: [],
}

export default observer(Navbar);
