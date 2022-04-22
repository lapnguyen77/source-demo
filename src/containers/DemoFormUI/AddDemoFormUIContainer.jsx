import React, { Component } from "react";
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

class AddDemoFormUIContainer extends Component {
  static contextType = RootStoreContext;

  static propTypes = {};

  render() {
    const { t } = this.props;
    const { demoFormUIStore } = this.context;
    const { addDetail } = demoFormUIStore;

    return (
      <>
        <PageHeaderContainer title={t("demoUI.titleAdd")} />
        <DemoUIForm onSubmit={addDetail} />
      </>
    );
  }
}

export default observer(AddDemoFormUIContainer);
