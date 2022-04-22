import React from 'react'
import PropTypes from 'prop-types'

import BaseBackgroundLayout from './base/BaseBackgroundLayout'
import Background from '../images/bgC.jpg'

const BackgroundLayout = ({ children }) => (
  <BaseBackgroundLayout
    backgroundImg={Background}
    style={{
      backgroundImage: `linear-gradient(
        rgba(20, 30, 48, 0.2),
        rgba(36, 59, 85, 0.2)
      ),
      url(${Background})`,
    }}
  >
    {children}
  </BaseBackgroundLayout>
)

BackgroundLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

BackgroundLayout.defaultProps = {
  children: null,
}

export default BackgroundLayout
