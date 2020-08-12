<template>
  <div>
    <div 
      class="mt-1" 
      v-if="usedKeyword">
      <span v-if="countProducts == 0">No result for "{{ this.usedKeyword }}"</span>
      <span v-else-if="countProducts == 1">{{ countProducts }} result for "{{ this.usedKeyword }}"</span>
      <span v-else-if="countProducts > 1">{{ countProducts }} results for "{{ this.usedKeyword }}"</span>
    </div>

    <ul>
      <li 
        v-for="(product, index) in products" 
        :key="product.id">
        <strong 
          class="product-name"
          @click="selectedProduct == index ? selectedProduct = null : selectedProduct = index" 
          :inner-html.prop="product.brand | capitalize"></strong> - 
        <span :inner-html.prop="product.name | capitalize"></span>

        <transition name="slide" mode="out-in">
          <div 
            class="ingredient-list" 
            v-show="index == selectedProduct">
            Ingredients: <span v-html="product.ingredient_list"></span>
          </div>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true
    },
    usedKeyword: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedProduct: null,
    }
  },
  computed: {
    countProducts() {
      return this.products.length
    }
  },
  watch: {
    products() {
      this.selectedProduct = null;
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  padding-left: 0;
  list-style-position: inside;

  li {
    margin-bottom: .3em;

    /deep/ em {
      text-decoration: underline;
      font-style: normal;
    }

    .product-name {
      cursor: pointer;
    }

    .ingredient-list {
      font-size: .9rem;
    }
  }
}
</style>