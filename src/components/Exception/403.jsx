import React from 'react'
import { useTranslation } from 'react-i18next'
import Exception from './Exception'
import Img403 from './403.svg'

const Exception403 = () => {
  const { t } = useTranslation()
  return (
    <Exception
      type="403"
      img={Img403}
      title="403"
      desc={t('exception.403')}
    />
  )
}

export default Exception403
