import React, { Component } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import RootStoreContext from '../../contexts/RootStoreContext'
import Navbar from '../../components/Navigation/Navbar'
import { getMenuKeyByPath } from '../../utils/path'
import { getSidebarMenu } from '../../utils/sidebar'

class NavbarContainer extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }

  static contextType = RootStoreContext;

  static defaultProps = {

  }

  state = {
    selectedKey: getMenuKeyByPath(window.location.pathname),
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({
        selectedKey: getMenuKeyByPath(this.props.location.pathname),
      })
    }
  }

  handleMenuClick = (e) => {
    if (e.key) {
      this.props.history.push(`/${e.key}`)
    }
  }

  render() {
    // const { configStore } = this.context

    const {
      history: { push },
      location: { pathname },
      mgLeft
    } = this.props

    const { selectedKey } = this.state

    const menu = getSidebarMenu()

    return (
      <>
        <Navbar
          theme="light"
          mode="inline"
          pathname={pathname}
          push={push}
          mgLeft={mgLeft}
          menu={menu}
          selectedKey={selectedKey}
          handleMenuClick={this.handleMenuClick}
        />
      </>
    )
  }
}

export default withRouter(observer(NavbarContainer))
