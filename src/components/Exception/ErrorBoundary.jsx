import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Exception from './Exception'
import Img500 from './500.svg'

class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  }

  state = { error: null }

  componentDidCatch(error) {
    this.setState({
      error,
    })
  }

  render() {
    const { error } = this.state
    const { children } = this.props

    if (error) {
      return (
        <Exception
          desc="Something went wrong"
          img={Img500}
          showAction={false}
          title="Oops!"
          type="500"
        />
      )
    }

    return children
  }
}

export default ErrorBoundary
