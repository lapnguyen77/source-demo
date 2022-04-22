import React, { Component } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import loadable from '@loadable/component'

import { getNameMap } from '../../utils/breadcrumb'

const Breadcrumb = loadable(() => import('../../components/Shared/Breadcrumb'))

class BreadcrumbContainer extends Component {
  static propTypes = {
    breadcrumbEntityDisplay: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
        memberId: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }

  static defaultProps = {
    breadcrumbEntityDisplay: null,
  }

  render() {
    const {
      location: { pathname },
      match: { params: { id } },
      breadcrumbEntityDisplay,
    } = this.props

    const breadcrumbNameMap = getNameMap(id, breadcrumbEntityDisplay)
    const pathSnippets = pathname.split('/').filter(i => i)
    return (
      <Breadcrumb
        pathSnippets={pathSnippets}
        breadcrumbNameMap={breadcrumbNameMap}
      />
    )
  }
}

export default withRouter(observer(BreadcrumbContainer))
