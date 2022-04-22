import React from 'react'
import { Spin } from 'antd'
import styled from 'styled-components'

import { LoadingOutlined } from '@ant-design/icons'

const OverlayStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1000;
  background: transparent;
`

const LoadingWrapperStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
`
const antIcon = <LoadingOutlined style={{ fontSize: 32 }} spin />

const Loading = () => (
  <OverlayStyled>
    <LoadingWrapperStyled>
      <Spin size="large" tip="Đang tải trang..." indicator={antIcon} />
    </LoadingWrapperStyled>
  </OverlayStyled>
)

export default Loading
