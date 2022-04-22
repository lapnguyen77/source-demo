import React from 'react'
import { useTranslation } from 'react-i18next'
import Exception from './Exception'
import Img500 from './500.svg'

const Exception500 = () => {
  const { t } = useTranslation()
  return (
    <Exception
      type="500"
      img={Img500}
      title="500"
      desc={t('exception.500')}
    />
  )
}

export default Exception500
