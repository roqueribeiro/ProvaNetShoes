<template>
  <div class="startPage">
    <b-navbar type="dark" variant="dark">
        <b-navbar-nav class="ml-auto">
            <b-button variant="dark" v-on:click="showCartWindow()">
                <icon name="shopping-bag"></icon>
                <b-badge pill variant="warning">{{ Object.values(productsInCart).length }}</b-badge>
            </b-button>
        </b-navbar-nav>
    </b-navbar>
    <transition name="fade">
      <Cart v-if="this.$store.getters.cartWindowState" />
    </transition>
    <Products />
  </div>
</template>

<script>
import Cart from "./Cart";
import Products from "./Products";

export default {
  name: "startPage",
  data() {
    return {
      productsInCart: this.$store.getters.productsInCart
    };
  },
  methods: {
    showCartWindow: function(product) {
      this.$store.commit("showCartWindow");
    }
  },
  components: {
    Cart,
    Products
  }
};
</script>

<style scoped>
.startPage {
  position: relative;
  text-align: center;
}

.startPage button .badge {
  margin-left: 10px;
  font-size: 14px;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.2s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateX(50%);
}
</style>
