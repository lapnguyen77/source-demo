import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import loadable from "@loadable/component";

import RootStoreContext from "../../contexts/RootStoreContext";

import Loading from "../../components/Shared/Loading";

const PageHeaderContainer = loadable(
  () => import("../Shared/PageHeaderContainer"),
  {
    fallback: <Loading />,
  }
);

const DemoUIForm = loadable(
  () => import("../../components/DemoFormUI/DemoUIForm"),
  {
    fallback: <Loading />,
  }
);

class EditDemoFormUIContainer extends Component {
  static contextType = RootStoreContext;

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }).isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const { demoFormUIStore } = this.context;
    const { getDetail } = demoFormUIStore;

    if (id) {
      getDetail(id);
    }
  }

  componentWillUnmount() {
    const { demoFormUIStore } = this.context;
    const { clearDetail } = demoFormUIStore;

    clearDetail();
  }

  updateDemoFormUI = (values) => {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const { demoFormUIStore } = this.context;
    const { updateDetail } = demoFormUIStore;

    if (id) {
      updateDetail({
        Id: id,
        ...values,
      });
    }
  };

  render() {
    const { t } = this.props;

    const { demoFormUIStore } = this.context;
    const { detail, getDetailLoading } = demoFormUIStore;

    return getDetailLoading ? (
      <Loading />
    ) : (
      <>
        <PageHeaderContainer
          title={t("demoUI.titleAdd")}
          breadcrumbEntityDisplay={detail.Id}
        />
        <DemoUIForm onSubmit={this.updateDemoFormUI} detail={detail} />
      </>
    );
  }
}

export default observer(EditDemoFormUIContainer);
