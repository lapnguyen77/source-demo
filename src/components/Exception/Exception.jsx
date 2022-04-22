import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Col, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

const { Title, Paragraph } = Typography

const Exception = ({
  desc, img, showAction, title, type,
}) => {
  const { t } = useTranslation()
  return (
    <div className="message-page-wrapper">
      <div className="error-page-inner-container">
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={12}>
            <img className="full-width" src={img} alt={type} />
          </Col>
          <Col xs={24} sm={12}>
            <Title className="error-page-title">{title}</Title>
            <Paragraph className="error-page-description">{desc}</Paragraph>
            {showAction && (
              <Link to="/">
                <Button type="primary">
                  {t('exception.back-btn')}
                </Button>
              </Link>
            )}
          </Col>
        </Row>
      </div>
    </div>
  )
}

Exception.propTypes = {
  desc: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  showAction: PropTypes.bool,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

Exception.defaultProps = {
  showAction: true,
}

export default Exception
