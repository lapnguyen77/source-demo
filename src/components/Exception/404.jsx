import React from 'react'
import { useTranslation } from 'react-i18next'
import Exception from './Exception'
import Img404 from './404.svg'

const Exception404 = () => {
  const { t } = useTranslation()
  return (
    <Exception
      type="404"
      img={Img404}
      title="404"
      desc={t('exception.404')}
    />
  )
}

export default Exception404
