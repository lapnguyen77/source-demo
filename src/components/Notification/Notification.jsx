import React, { useEffect } from 'react'
import { PropTypes as MobxPropTypes } from 'mobx-react'
import { notification } from 'antd'
import { useTranslation } from 'react-i18next'

const Notification = ({
  notifyData,
}) => {
  const { t } = useTranslation()
  const [api, contextHolder] = notification.useNotification()

  useEffect(() => {
    if (!notifyData.type) {
      return
    }
    const notifyObj = {
      ...notifyData,

      message: notifyData.titleTransKey ?
      t(notifyData.titleTransKey) :
      notifyData.title,

      description: notifyData.descriptionTransKey ?
        t(notifyData.descriptionTransKey) :
        notifyData.description,

      placement: 'bottomRight'
    }

    delete notifyObj.type
    delete notifyObj.titleTransKey
    delete notifyObj.descriptionTransKey

    api[notifyData.type](notifyObj)
  }, [notifyData])

  return (
    <>{contextHolder}</>
  )
}

Notification.propTypes = {
  notifyData: MobxPropTypes.objectOrObservableObject.isRequired,
}

export default Notification
