import React from 'react'
import loadable from '@loadable/component'
import Loading from '../../components/Shared/Loading'

const DemoFormUIContainer = loadable(() => import('../../containers/DemoFormUI/DemoFormUIContainer'), {
  fallback: <Loading />,
})

const AddDemoFormUIContainer = loadable(() => import('../../containers/DemoFormUI/AddDemoFormUIContainer'), {
  fallback: <Loading />,
})

export default [
  {
    path: '/demo-form-ui',
    component: DemoFormUIContainer,
    title: 'UI Demo',
  },
  {
    path: '/demo-form-ui/add',
    component: AddDemoFormUIContainer,
    title: 'Thêm mới thông tin',
  }
]
