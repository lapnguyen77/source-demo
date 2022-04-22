import React, { Component } from 'react'
import { observer } from 'mobx-react'
import loadable from '@loadable/component'
// import { Link } from 'react-router-dom'
import RootStoreContext from '../../contexts/RootStoreContext'
import Loading from '../../components/Shared/Loading'

const PageHeaderContainer = loadable(() => import('../Shared/PageHeaderContainer'), {
  fallback: <Loading />,
})

// const DemoFormUIFilter = loadable(() => import('../../components/DemoFormUI/DemoFormUIFilter'), {
//   fallback: <Loading />,
// })

const DemoFormUIList = loadable(() => import('../../components/DemoFormUI/DemoFormUIList'), {
  fallback: <Loading />,
})

class DemoFormUIContainer extends Component {
  static contextType = RootStoreContext;

  static propTypes = {
  }

  static defaultProps = {
  }

  componentDidMount() {
    const { demoFormUIStore } = this.context
    const { getList } = demoFormUIStore

    getList()
  }

  componentWillUnmount() {
    const { demoFormUIStore } = this.context
    const { clearList } = demoFormUIStore

    clearList()
  }

  onTableChange = (currentPagination) => {
    const { demoFormUIStore } = this.context
    const { getList, setPagination } = demoFormUIStore
    const { current, pageSize } = currentPagination

    setPagination({ ...currentPagination })

    getList({
      page: current,
      pageSize,
    })
  }

  render() {
    const { t } = this.props
    const { demoFormUIStore } = this.context
    const { getListLoading, list, pagination } = demoFormUIStore

    return (
      <>
        <PageHeaderContainer
          title={t('demoUI.title')}
          // extra={() => (
          //   <Link to="/demo-form-ui/add">
          //     <Button type="primary">{t('demoUI.titleAdd')}</Button>
          //   </Link>
          // )}
        />
        <div className="page-section">
          {/* <DemoFormUIFilter /> */}
          <DemoFormUIList
            getListLoading={getListLoading}
            onTableChange={this.onTableChange}
            list={list}
            pagination={pagination}
          />
        </div>
      </>
    )
  }
}

export default observer(DemoFormUIContainer)
