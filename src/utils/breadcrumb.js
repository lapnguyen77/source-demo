export const getNameMap = (entityId, entityDisplay) => (
  {
    '/dashboard': { displayName: 'Bảng điều khiển', isNavigable: true },
    '/demo-form-ui': { displayName: 'Demo UI', isNavigable: true },
    '/demo-form-ui/add': { displayName: 'Thêm mới', isNavigable: true },
    [`/demo-form-ui/${entityId}`]: { displayName: entityDisplay ?? entityId, isNavigable: false },
    [`/demo-form-ui/${entityId}/edit`]: { displayName: 'Sửa', isNavigable: true },
  }
)
