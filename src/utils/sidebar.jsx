import React from 'react'
import {
  FundProjectionScreenOutlined,
  PartitionOutlined,
  DeploymentUnitOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  AliwangwangOutlined,
} from '@ant-design/icons'

import { MENU_TYPES } from '../constants'

const getGeneralSidebarMenu = () => (
  [
    {
      key: 'dashboard',
      transKey: 'sidebar.dashboard',
      type: MENU_TYPES.MenuItem,
      icon: props => <FundProjectionScreenOutlined {...props} />
    },
    {
      key: 'demo-ui',
      transKey: 'demoUI.demoFormUI',
      type: MENU_TYPES.SubMenu,
      items: [
        { key: 'demo-form-ui', transKey: 'demoUI.demoFormUIComp.formUIList', icon: props => <AliwangwangOutlined {...props} /> },
      ],
      icon: props => <AliwangwangOutlined {...props} />,
    },
    {
      key: 'system',
      transKey: 'sidebar.system.menu',
      type: MENU_TYPES.SubMenu,
      items: [
        { key: 'users', transKey: 'sidebar.system.users', icon: props => <UsergroupAddOutlined {...props} /> },
        { key: 'roles', transKey: 'sidebar.system.roles', icon: props => <DeploymentUnitOutlined {...props} /> },
        { key: 'permissions', transKey: 'sidebar.system.permissions', icon: props => <PartitionOutlined {...props} /> },
      ],
      icon: props => <SettingOutlined {...props} />,
    },
  ]
)

export const getSidebarMenu = () => {
  return getGeneralSidebarMenu()
}
