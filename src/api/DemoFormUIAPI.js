export default class DemoFormUIAPI {
  constructor(args) {
    this.request = args.request
  }

    getList = data => this.request.get('/api/Todo/GetList', {
      params: data,
    })

    getDetail = id => this.request.get(`/api/Todo/${id}`)

    add = data => this.request.post('/api/Todo', data)

    update = data => this.request.put('/api/Todo', data)

    deleteDetail = id => this.request.del(`/api/Todo/${id}`)
}
