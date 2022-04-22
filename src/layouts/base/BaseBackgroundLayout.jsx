import React from "react";
import PropTypes from "prop-types";
import Div100vh from "react-div-100vh";
import { Row, Col } from "antd";

const BaseBackgroundLayout = ({ backgroundImg, children, style }) => {
  const defaultStyle = {
    // backgroundImage: backgroundImg,
    // backgroundSize: "cover",
    // backgroundPosition: "center",
    // backgroundAttachment: "fixed",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    minHeight: "100rvh",
  };

  return (
    <Div100vh style={{ ...defaultStyle }}>
      <Row style={{ height: "100vh" }}>
        <Col xs={{span: 24}} sm={{span: 12}} md={{span: 16}} className="login-bg-left"></Col>
        <Col xs={{span: 24}} sm={{span: 12}} md={{span: 8}} className="login-content-main">
          {children}
        </Col>
      </Row>
    </Div100vh>
  );
};

BaseBackgroundLayout.propTypes = {
  backgroundImg: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.shape({
    backgroundImage: PropTypes.string,
  }),
};

BaseBackgroundLayout.defaultProps = {
  children: null,
  style: {},
};

export default BaseBackgroundLayout;
