<template>
  <div class="products">
    <b-form-input v-model="searchText" type="text" placeholder="Pesquisar"></b-form-input>
    <ul v-if="products && products.length">
      <li v-for="product in itemsSearched">
        <img :src="getPicturePath(product)" />
        <div class="productSpecs">
          <p>{{product.title}}</p>
        </div>
        <div class="productBuyOptions">
          <hr />
          <span>
            {{ product.currencyFormat }}
            <strong>{{ (product.price/1).toFixed(2).replace('.', ',').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".").split(',')[0] }}</strong>,{{ product.price.toFixed(2).toString().split('.')[1] }}
          </span>
          <b-button size="sm" variant="outline-dark" @click="addToCart(product)">Adicionar na sacola</b-button>
        </div>
      </li>
    </ul>
    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{error.message}}
      </li>
    </ul>
    <transition name="fade">
      <b-alert :show="dismissCountDown" dismissible variant="warning" @dismissed="dismissCountdown=0" @dismiss-count-down="countDownChanged">
        Produto adicionado na sacola <br /> {{ dismissCountDown }} Segundos...
      </b-alert>
    </transition>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Products",
  data() {
    return {
      dismissSecs: 2,
      dismissCountDown: 0,
      searchText: "",
      products: [],
      errors: [],
      productsInCart: this.$store.getters.productsInCart
    };
  },
  watch: {
    productsInCart: function() {
      this.productsInCart = this.$store.getters.productsInCart;
    }
  },
  created() {
    axios
      .get("http://localhost:3000/products")
      .then(response => {
        this.products = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });

    this.productsInCart = this.$ls.get("productsInCart");
    var _this = this;
    if (this.productsInCart) {
      this.productsInCart.forEach(function(value, key) {
        _this.$store.commit("addToCart", value);
      });
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    addToCart: function(product) {
      this.$store.commit("addToCart", product);
      this.$ls.set(
        "productsInCart",
        this.$store.getters.productsInCart,
        60 * 60 * 1000
      );
      this.showAlert();
    },
    getPicturePath: function(pic) {
      return require("../assets/" + pic.picturePath);
    }
  },
  computed: {
    itemsSearched: function() {
      var self = this;
      if (this.searchText == "") {
        return this.products;
      }
      return this.products.filter(function(product) {
        return product.title.indexOf(self.searchText) >= 0;
      });
    }
  }
};
</script>

<style scoped>
.alert {
  position: fixed;
  min-width: 400px;
  max-width: 400px;
  left: 50%;
  margin-left: -200px;
  bottom: 0;
  background: #ffc107;
  border: none;
  color: #533f02;
  z-index: 1000;
}

.products {
  position: relative;
  max-width: 800px;
  box-sizing: border-box;
  text-align: center;
  margin: 0 auto;
  padding: 20px;
}

.products > input {
  margin: 10px 0 10px 0;
}

.products ul {
  padding: 0;
  margin: 0 auto;
  list-style: none;
}

.products ul li {
  display: inline-block;
  width: 200px;
  height: auto;
  margin: 20px;
  vertical-align: top;
}

.productSpecs {
  min-height: 80px;
  padding: 10px 0px;
  line-height: 20px;
}

.productBuyOptions hr {
  position: relative;
  width: 20px;
  height: 2px;
  border: none;
  margin: 0 auto;
  padding: 0;
  background: #ffc107;
}

.productBuyOptions span {
  position: relative;
  display: block;
  width: 100%;
  padding: 10px 0;
}

.productBuyOptions span strong {
  font-size: 24px;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.2s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(50%);
}

@media (max-width: 480px) {
  .alert {
    width: 100%;
    max-width: 100%;
    box-shadow: none;
    left: 0;
    margin: 0;
    border-radius: 0;
  }
}
</style>