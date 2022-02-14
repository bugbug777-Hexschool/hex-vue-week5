/* eslint-disable no-undef */
const base = 'https://vue3-course-api.hexschool.io';
const apiPath = 'sihle';

// Components
const productModal = {
  template: '#userProductModal',
  data () {
    return {
      modal: {},
    };
  },
  methods: {
    open_modal () {
      this.modal.show();
    },
  },
  mounted () {
    this.modal = new bootstrap.Modal(this.$refs.modal);
  },
};

// App
const app = Vue.createApp({
  data () {
    return {
      products: [],
    };
  },
  methods: {
    get_all_products () {
      const api = `${base}/v2/api/${apiPath}/products`;
      axios
        .get(api)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    open_modal () {
      this.$refs.productModal.open_modal();
    },
  },
  mounted () {
    this.get_all_products();
  },
});

app.component('product-modal', productModal);
app.mount('#app');
