/* eslint-disable no-undef */
const base = 'https://vue3-course-api.hexschool.io'
const apiPath = 'sihle'

const app = Vue.createApp({
  data () {
    return {
      products: []
    }
  },
  methods: {
    get_all_products () {
      const api = `${base}/v2/api/${apiPath}/products`
      axios
        .get(api)
        .then((res) => {
          this.products = res.data.products
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.get_all_products()
  }
})

app.mount('#app')
