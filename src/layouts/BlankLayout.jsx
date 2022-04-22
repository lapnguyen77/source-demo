import React from 'react'
import PropTypes from 'prop-types'
import BaseBlankLayout from './base/BaseBlankLayout'

const BlankLayout = ({ children }) => (
  <BaseBlankLayout
    style={{
      overflowX: 'hidden',
    }}
  >
    {children}
  </BaseBlankLayout>
)

BlankLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

BlankLayout.defaultProps = {
  children: null,
}

export default BlankLayout
