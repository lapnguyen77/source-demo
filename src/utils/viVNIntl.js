import viVNIntl from 'antd/lib/locale/vi_VN'

export default {
  ...viVNIntl,
  Table: {
    ...viVNIntl.Table,
    emptyText: 'Không có dữ liệu',
  },
  Empty: {
    description: 'Không có dữ liệu',
  },
  Popconfirm: {
    cancelText: 'Huỷ',
    okText: 'OK',
  },
}
