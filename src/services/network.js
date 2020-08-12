import axios from 'axios'
const config = {
  baseURL: process.env.VUE_APP_ROOT_API,
  headers: {
    'Content-Type': 'application/json'
  }
}
const httpClient = axios.create(config)

function getProducts(keyword) {
  return httpClient.get('/product', {
      params: {
        q: keyword
      }
    })
    .then(res => res.data)
    .catch(err => err)
}

export { getProducts }