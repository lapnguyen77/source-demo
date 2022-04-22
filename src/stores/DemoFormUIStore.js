import { action, observable, runInAction, makeObservable } from 'mobx'

import BaseStore from './BaseStore'
import { DEFAULT_PAGINATION } from '../constants'
import { SetPaginationInfo } from '../utils/pagination'

class DemoFormUIStore extends BaseStore {
  list = []
  detail = {}
  pagination = DEFAULT_PAGINATION
  getListLoading = false
  getDetailLoading = false
  updateDetailLoading = false

  constructor(args) {
    super(args)
    makeObservable(this, {
      list: observable,
      detail: observable,
      pagination: observable,

      getListLoading: observable,
      getDetailLoading: observable,
      updateDetailLoading: observable,

      getList: action.bound,
      getDetail: action.bound,
      addDetail: action.bound,
      updateDetail: action.bound,

      clearList: action.bound,
      clearDetail: action.bound,

      setPagination: action.bound,
    })
  }

  async getList(params = {
    page: this.pagination.current,
    pageSize: this.pagination.pageSize
  }) {
    this.getListLoading = true

    try {
      const paramsApi = {
        RequireTotalCount: true,
        RequireGroupCount: true,
        IsSummaryQuery: true,
        Skip: params.page > 0 ? (params.page - 1) * params.pageSize : 0,
        Take: params.pageSize
      }

      const res = await this.rootAPI.demoFormUIAPI.getList(paramsApi)

      // console.log("Test data 1: ", res, params)

      const { data } = res

      if (data) {
        runInAction(() => {
          // Get data
          this.list = data

          // Set pafination
          const resetPagination = {
            page: this.pagination.current,
            pageSize: this.pagination.pageSize,
            totalCount: res.totalCount
          }
          // console.log("Check param pagination: ", resetPagination)
          this.pagination = SetPaginationInfo(this.pagination, resetPagination)
        })
      }
    } catch (err) {
      // console.log("check err: ", err)
      this.notifyError(err)
    } finally {
      this.getListLoading = false
    }
  }

  setPagination(pagination) {
    this.pagination = pagination
  }

  clearList() {
    this.list = []
  }

  async getDetail(id) {
    this.getDetailLoading = true

    try {
      const res = await this.rootAPI.demoFormUIAPI.getDetail(id)

      console.log("Get detail data: ", res)

      if (res) {
        runInAction(() => {
          this.detail = {
            ...res,
          }
        })
      }
    } catch (err) {
      this.notifyError(err)
    } finally {
      this.getDetailLoading = false
    }
  }

  clearDetail() {
    this.detail = {}
  }

  // Add new item
  async addDetail(data) {
    try {
      const response = await this.rootAPI.demoFormUIAPI.add(data)

      this.notifySuccess({
        descriptionTransKey: 'notification.addDone',
      })

      this.navigateTo(`/demo-form-ui/${response.payload}/edit`)
    } catch (err) {
      this.notifyError(err)
    }
  }

  // Update new item
  async updateDetail(data) {
    this.updateDetailLoading = true

    try {
      const detail = { ...this.detail }
      await this.rootAPI.demoFormUIAPI.update(data)

      runInAction(() => {
        const updatedDetail = { ...detail, ...data }

        this.detail = updatedDetail

        this.notifySuccess({
          descriptionTransKey: 'notification.updateDone',
        })
      })
    } catch (error) {
      this.notifyError(error)
    } finally {
      this.updateDetailLoading = false
    }
  }
}

export default DemoFormUIStore
