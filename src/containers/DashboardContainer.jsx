import React, { Component } from "react";
import { observer } from "mobx-react";
import loadable from "@loadable/component";

import RootStoreContext from "../contexts/RootStoreContext";

import Loading from "../components/Shared/Loading";

const PageHeaderContainer = loadable(
  () => import("./Shared/PageHeaderContainer"),
  {
    fallback: <Loading />,
  }
);

const Dashboard = loadable(() => import("../components/Dashboard"), {
  fallback: <Loading />,
});

class DashboardContainer extends Component {
  static contextType = RootStoreContext;

  static propTypes = {};

  static defaultProps = {};

  componentDidMount() {}

  render() {
    const { configStore } = this.context;
    const { appName } = configStore;
    const { t } = this.props;

    return (
      <>
        <div className="page-section">
          <PageHeaderContainer title={t("dashboard.title")} />
          <Dashboard appName={appName} />
        </div>
      </>
    );
  }
}

export default observer(DashboardContainer);
