import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:8080/stackcase/',
})

export function install (Vue) {
  Vue.prototype.$http = http
}

export default http
