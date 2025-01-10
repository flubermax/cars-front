import axios from 'axios'
// import { Author, CarItem, CarProp, Role } from '@/types'
// import { ServerResult } from '@/components/models'

const base_url = 'http://localhost:8088/api/'

type Attributes = {
  [key: string]: unknown
}

// <T extends Attributes>(obj: T, key: keyof T)

class Api {
  baseUrl
  constructor(myUrl: string) {
    this.baseUrl = myUrl
  }

  async get(url?: string, conf?: unknown) {
    const resp = await axios.get(`${this.baseUrl}${url}`, conf ? conf : '').then((res) => res)
    return resp.data
  }

  async post(url: string, req: Attributes, conf?: unknown) {
    const resp = await axios.post(`${this.baseUrl}${url}`, req, conf ? conf : '').then((res) => res)
    return resp.data
  }

  async put(url: string, req: Attributes, conf?: unknown) {
    const resp = await axios.put(`${this.baseUrl}${url}`, req, conf ? conf : '').then((res) => res)
    return resp.data
  }

  async delete(url: string, conf?: unknown) {
    const resp = await axios.delete(`${this.baseUrl}${url}`, conf ? conf : '').then((res) => res)
    return resp.data
  }
}

export default new Api(base_url)
