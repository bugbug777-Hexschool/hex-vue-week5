/* eslint-disable no-undef */
const base = 'https://vue3-course-api.hexschool.io';
const apiPath = 'sihle';

// VeeValidate
VeeValidate.defineRule('email', VeeValidateRules.email);
VeeValidate.defineRule('required', VeeValidateRules.required);
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為輸入字元立即進行驗證
});

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
          this.$emit('update-cart');
          this.modal.hide();
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
      user: {
        name: '',
        email: '',
        tel: '',
        address: '',
      },
      message: '',
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
    add_to_cart (id) {
      const api = `${base}/v2/api/${apiPath}/cart`;
      const data = {
        product_id: id,
        qty: 1,
      };
      axios
        .post(api, { data })
        .then((res) => {
          if (res.data.success) {
            this.get_cart();
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    update_cart (cart) {
      const api = `${base}/v2/api/${apiPath}/cart/${cart.id}`;
      const data = {
        product_id: cart.product.id,
        qty: cart.qty,
      };
      axios
        .put(api, { data })
        .then((res) => {
          if (res.data.success) {
            this.get_cart();
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    remove_from_cart (id) {
      const api = `${base}/v2/api/${apiPath}/cart/${id}`;
      axios
        .delete(api)
        .then((res) => {
          if (res.data.success) {
            this.get_cart();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    remove_all_from_cart () {
      const api = `${base}/v2/api/${apiPath}/carts`;
      axios
        .delete(api)
        .then((res) => {
          if (res.data.success) {
            this.get_cart();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    open_modal (product) {
      this.$refs.productModal.open_modal(product);
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '需要正確的電話號碼';
    },
    send_order () {
      const api = `${base}/v2/api/${apiPath}/order`;
      const order = {
        data: {
          user: this.user,
          message: this.message,
        },
      };
      if (!this.cart.carts.length) {
        alert('購物車目前沒有東西喔');
        return;
      }
      axios
        .post(api, order)
        .then((res) => {
          if (res.data.success) {
            this.get_cart();
            this.$refs.form.resetForm();
            this.message = '';
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  mounted () {
    this.get_all_products();
    this.get_cart();
  },
});

app.component('product-modal', productModal);
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);
app.mount('#app');
