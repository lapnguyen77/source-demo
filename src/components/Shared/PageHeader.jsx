import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";

const PageHeader = ({ breadcrumb: Breadcrumb, extra: Extra, title: Title }) => (
  <Row type="flex" align="middle" justify="space-between">
    <Col>{typeof Title === "string" ? Title : <Title />}</Col>
    <Col>{Breadcrumb && <Breadcrumb />}</Col>
    {Extra && (
      <Col className="page-header-extra-container">
        {typeof Extra === "string" ? Extra : <Extra />}
      </Col>
    )}
  </Row>
);

PageHeader.propTypes = {
  breadcrumb: PropTypes.func,
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
};

PageHeader.defaultProps = {
  breadcrumb: null,
  extra: null,
};

export default observer(PageHeader);
