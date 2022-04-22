import React from 'react'
import PropTypes from 'prop-types'
import Div100vh from 'react-div-100vh' // Work around: 100vh bug on Safari
import { Colors } from '../../constants'

const defaultStyle = {
  backgroundColor: Colors.layout,
  minHeight: '100rvh',
}

const BaseBlankLayout = ({ children, style }) => (
  <Div100vh style={{ ...defaultStyle, ...style }}>
    {children}
  </Div100vh>
)

BaseBlankLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: PropTypes.shape({
    backgroundColor: PropTypes.string,
  }),
}

BaseBlankLayout.defaultProps = {
  style: {},
}

export default BaseBlankLayout
