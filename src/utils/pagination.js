export const SetPaginationInfo = (pagination, res) => ({
  ...pagination,
  current: res.page,
  pageSize: res.pageSize,
  total: res.totalCount,
})
