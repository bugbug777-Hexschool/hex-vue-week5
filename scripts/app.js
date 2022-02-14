/* eslint-disable no-undef */
const base = 'https://vue3-course-api.hexschool.io';
const apiPath = 'sihle';

// Components
const productModal = {
  template: '#userProductModal',
  data () {
    return {
      product: {},
      qty: 1,
      modal: {},
    };
  },
  methods: {
    get_product (id) {
      const api = `${base}/v2/api/${apiPath}/product/${id}`;
      axios
        .get(api)
        .then((res) => {
          this.product = res.data.product;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    add_to_cart (id) {
      const api = `${base}/v2/api/${apiPath}/cart`;
      const data = {
        product_id: id,
        qty: this.qty,
      };
      axios
        .post(api, { data })
        .then((res) => {
          this.modal.hide();
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    open_modal (product) {
      this.modal.show();
      this.get_product(product.id);
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
      cart: {},
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
    get_cart () {
      const api = `${base}/v2/api/${apiPath}/cart`;
      axios
        .get(api)
        .then((res) => {
          this.cart = res.data.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    open_modal (product) {
      this.$refs.productModal.open_modal(product);
    },
  },
  mounted () {
    this.get_all_products();
    this.get_cart();
  },
});

app.component('product-modal', productModal);
app.mount('#app');
