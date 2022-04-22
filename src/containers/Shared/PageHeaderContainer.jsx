import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Typography, Card } from "antd";
import PageHeader from "../../components/Shared/PageHeader";
import BreadcrumbContainer from "./BreadcrumbContainer";
import { SendOutlined, PicRightOutlined } from "@ant-design/icons";

const { Title } = Typography;

const PageHeaderContainer = ({
  breadcrumb,
  breadcrumbEntityDisplay,
  extra,
  title,
}) => (
  <Card className="card-ms-form border-card mg-b-15">
    <PageHeader
      breadcrumb={
        breadcrumb === ""
          ? () => ""
          : () => (
              <BreadcrumbContainer
                breadcrumbEntityDisplay={breadcrumbEntityDisplay}
              />
            )
      }
      extra={extra}
      title={() => (
        <Title className="title-header m-b-0" level={3}>
          <span className="icon-header">
            <PicRightOutlined />
          </span>
          {title}
        </Title>
      )}
    />
  </Card>
);

PageHeaderContainer.propTypes = {
  breadcrumb: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  breadcrumbEntityDisplay: PropTypes.string,
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  title: PropTypes.string.isRequired,
};

PageHeaderContainer.defaultProps = {
  breadcrumbEntityDisplay: null,
  breadcrumb: null,
  extra: null,
};

export default observer(PageHeaderContainer);
