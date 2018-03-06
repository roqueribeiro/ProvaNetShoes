<template>
    <div class="cart">
        <div class="cartHeader">
            <div class="cartHeaderIcon">
                <icon scale="2" name="shopping-bag"></icon>
                <b-badge pill variant="warning">{{ Object.values(productsInCart).length }}</b-badge>
            </div>
            <div class="cartHeaderTitle">
                <p>SACOLA</p>
            </div>
            <b-button size="sm" variant="link" v-on:click="hideCartWindow()">
                <icon scale="2.2" name="times"></icon>
            </b-button>
        </div>
        <ul v-if="productsInCart && productsInCart.length">
            <li v-for="product of productsInCart">
                <div class="productPicture" v-bind:style="{ background: 'url(' + getPicturePath(product) + ')'  }"></div>
                <div class="productSpecs">
                    <p>{{ product.title }}</p>
                    <span>{{ product.availableSizes[Math.floor(Math.random() * ((product.availableSizes.length-1) - 0 + 1)) + 0] }} | {{ product.style }}</span>
                </div>
                <div class="productBuyOptions">
                    <b-button size="sm" variant="link" @click="removeFromCart(product)">
                        <icon scale="1.3" name="times"></icon>
                    </b-button>
                    <p>{{ product.currencyFormat }} {{ (product.price/1).toFixed(2).replace('.', ',').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }}</p>
                </div>
            </li>
        </ul>
        <div class="cartFooter">
            <div class="cartBuyTotalValue">
                <p>Subtotal</p>
                <p>{{ sumProductsInCart() }}<br /><small>{{ monthsToPay(10) }}</small></p>
            </div>
            <div class="cartBuyButton">
                <b-button variant="dark" @click="showModal=true">COMPRAR</b-button>
            </div>
            <b-modal
                v-model="showModal"
                id="modalFinish" 
                centered 
                title="Compra Finalizada"
                header-text-variant="dark"
                body-text-variant="dark"
                footer-text-variant="dark">
                <b-container fluid>
                    <h3>Total Pago: <strong>{{ sumProductsInCart() }}</strong></h3>
                </b-container>
                <div slot="modal-footer" class="w-100">
                    <b-btn size="sm" class="float-right" variant="outline-dark" @click="showModal=false">Fechar</b-btn>
                </div>
            </b-modal>
        </div>      
    </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      showModal: false,
      productsInCart: this.$store.getters.productsInCart
    };
  },
  methods: {
    removeFromCart: function(product) {
      this.$store.commit("removeFromCart", product);
      this.$ls.set(
        "productsInCart",
        this.$store.getters.productsInCart,
        60 * 60 * 1000
      );
    },
    sumProductsInCart: function() {
      var currencyFormat = "";
      var totalProductsValue = 0;
      this.productsInCart.forEach(function(value, key) {
        currencyFormat = value.currencyFormat;
        totalProductsValue = totalProductsValue + value.price;
      });

      return (
        currencyFormat +
        " " +
        (totalProductsValue / 1)
          .toFixed(2)
          .replace(".", ",")
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      );
    },
    monthsToPay: function(monthsToPay) {
      var currencyFormat = "";
      var totalProductsValue = 0;
      this.productsInCart.forEach(function(value, key) {
        currencyFormat = value.currencyFormat;
        totalProductsValue = totalProductsValue + value.price;
      });
      return (
        "OU EM ATÉ " +
        monthsToPay +
        " X " +
        currencyFormat +
        " " +
        (totalProductsValue / monthsToPay / 1)
          .toFixed(2)
          .replace(".", ",")
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      );
    },
    getPicturePath: function(pic) {
      return require("../assets/" + pic.picturePath);
    },
    hideCartWindow: function(product) {
      this.$store.commit("hideCartWindow");
    }
  }
};
</script>

<style scoped>
.cart {
  position: fixed;
  width: 50%;
  max-width: 500px;
  height: 100%;
  top: 0;
  right: 0;
  background: #202025;
  color: #fff;
  box-shadow: -10px 0 150px rgba(0, 0, 0, 0.6);
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 999;
}

.cartHeader {
  position: relative;
  padding: 40px 0;
  border-bottom: 1px #111 solid;
}

.cartHeader button {
  position: absolute;
  top: 15px;
  right: 20px;
  color: #000;
  padding: 0;
  margin: 0;
}

.cartHeader button:hover {
  color: #fff;
}

.cartHeader div {
  display: inline-block;
  vertical-align: middle;
}

.cartHeaderIcon {
  position: relative;
  width: 40px;
  height: 40px;
}

.cartHeaderIcon .badge {
  position: absolute;
  right: -5px;
  bottom: 0px;
  font-size: 12px;
}

.cartHeaderTitle {
  position: relative;
  padding: 0 20px;
  margin: 0;
  height: 40px;
  line-height: 40px;
}

.cartHeaderTitle p {
  font-size: 24px;
  font-weight: bold;
}

.cart ul {
  max-width: 800px;
  padding: 0;
  margin: 0 auto;
  list-style: none;
  text-align: left;
}

.cart ul li {
  display: block;
  padding: 20px;
  transition: 200ms;
  border-bottom: 1px #111 solid;
}

.cart ul li:hover {
  background: rgba(0, 0, 0, 0.2);
}

.cart ul li div {
  display: inline-block;
  vertical-align: top;
}

.productPicture {
  position: relative;
  width: 60px;
  height: 60px;
  background-position: center !important;
  background-size: cover !important;
}

.productSpecs {
  padding: 0 10px;
}

.productSpecs p {
  margin: 0;
}

.productSpecs span {
  font-size: 12px;
  color: #aaaaaa;
}

.productBuyOptions {
  position: absolute;
  right: 20px;
  text-align: right;
}

.productBuyOptions button {
  color: #000;
  padding: 0;
  margin: 0;
}

.productBuyOptions button:hover {
  color: #fff;
}

.productBuyOptions p {
  margin-top: 10px;
  color: #ffc107;
}

.cartFooter .cartBuyTotalValue {
  padding: 20px;
  height: 90px;
}

.cartFooter .cartBuyTotalValue p {
  display: inline-block;
}

.cartFooter .cartBuyTotalValue p:first-child {
  float: left;
  font-size: 18px;
  color: #aaaaaa;
}

.cartFooter .cartBuyTotalValue p:last-child {
  font-size: 28px;
  font-weight: bold;
  color: #ffc107;
  float: right;
  text-align: right;
}

.cartFooter .cartBuyTotalValue p:last-child small {
  font-size: 14px;
  font-weight: normal;
  color: #aaaaaa;
  float: right;
}

.cartFooter .cartBuyButton {
  padding: 20px;
}

.cartFooter .cartBuyButton button {
  background: black;
  width: 100%;
  padding: 10px 0;
  border-radius: 0;
  font-weight: bold;
}

@media (max-width: 1020px) {
  .cart {
    width: 100%;
    box-shadow: none;
  }
}
</style>