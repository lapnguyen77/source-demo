import axios from 'axios'
import FileSaver from 'file-saver'

axios.interceptors.response.use(response => response.data, error => Promise.reject(error.response))

export default class Request {
  constructor(args) {
    this.rootStore = args.rootStore
  }

  getHeaders = () => {
    const { authStore } = this.rootStore

    let headers = {
      'Content-Type': 'application/json',
    }

    const { auth } = authStore

    if (auth && auth.accessToken) {
      headers = {
        ...headers,
        Authorization: `${auth.tokenType || 'Bearer'} ${auth.accessToken}`,
      }
    }

    return headers
  }

  requestFactory = (url, method, config = {}) => new Promise((resolve, reject) => {
    this.rootStore.authStore.checkTokenValid().then((valid) => {
      if (valid) {
        axios({
          baseURL: `${this.rootStore.configStore.apiEndpoint}`,
          url,
          method,
          headers: this.getHeaders(),
          withCredentials: window.env.REACT_APP_IS_WITH_CREDENTIALS,
          ...config,
        })
          .then((data) => {
            if (data.isOk !== undefined && !data.isOk) {
              const error = {
                title: 'Error',
                description: data.message || 'An unknown error occurred',
              }
              reject(error)
            } else {
              resolve(data)
            }
          })
          .catch((err) => {
            if (err) {
              if (err.data) {
                const {
                  data: { error: errorTitle, error_description: errorDescription },
                } = err
                if (errorTitle && errorDescription) {
                  const errorMessage = {
                    status: err.status,
                    title: errorTitle,
                    description: errorDescription,
                  }
                  reject(errorMessage)
                }
              }

              const error = {
                status: err.status,
                title: 'Error',
                description: err.message,
              }
              reject(error)
            }

            const defaultError = {
              title: 'Error',
              description: 'An unknown error occurred',
            }
            reject(defaultError)
          })
      }
    })
  })

  get = (url, config) => this.requestFactory(url, 'get', config)

  search = (url, searchObj, config = {}) => {
    const { params, ...rest } = config
    return this.requestFactory(url, 'get', {
      params: { filter: searchObj, ...params },
      ...rest,
    })
  }

  post = (url, data = {}, config) => this.requestFactory(url, 'post', { data, ...config })

  put = (url, data = {}, config) => this.requestFactory(url, 'put', { data, ...config })

  patch = (url, data = {}, config) => this.requestFactory(url, 'patch', { data, ...config })

  del = (url, config) => this.requestFactory(url, 'delete', config)

  downloadCsv = (url, fileName, config = {}) => {
    const headers = this.getHeaders()
    headers['Content-Type'] = 'text/csv'
    return new Promise((resolve, reject) => {
      axios
        .create({ headers: { Accept: 'text/csv' } })({
          url: `${this.rootStore.configStore.apiEndpoint}/${this.rootStore.configStore.version}${url}`,
          ...config,
          headers,
        })
        .then(({ data }) => {
          if (data.type <= 0) {
            reject(data)
          } else {
            const blob = new Blob([data], { type: 'text/csv;charset=utf-8' })
            FileSaver.saveAs(blob, fileName || 'dowload.csv')
            resolve(data)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  uploadToS3 = (presignedUrl, fileContent) => {
    const options = {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    }
    return axios.put(presignedUrl, fileContent, options)
  }
}
