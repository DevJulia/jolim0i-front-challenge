<template>
  <div>
    <div 
      class="mt-1" 
      v-if="usedKeyword"
      data-testid="results-data">
      <span v-if="countProducts == 0">No result for "{{ this.usedKeyword }}"</span>
      <span v-else-if="countProducts == 1">{{ countProducts }} result for "{{ this.usedKeyword }}"</span>
      <span v-else-if="countProducts > 1">{{ countProducts }} results for "{{ this.usedKeyword }}"</span>
    </div>

    <ul class="products-list">
      <li 
        class="product"
        v-for="(product, index) in products" 
        :key="product.id">
        <strong 
          class="product-name"
          @click="toggleProduct(index)" 
          :inner-html.prop="product.brand | capitalize"
          data-testid="product-name"></strong> - 
        <span :inner-html.prop="product.name | capitalize"></span>

        <transition name="slide" mode="out-in">
          <div 
            class="ingredient-list" 
            v-show="index == selectedProduct"
            data-testid="ingredient-list">
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
  methods: {
    toggleProduct(index) {
      this.selectedProduct == index ? this.selectedProduct = null : this.selectedProduct = index;
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
ul.products-list {
  padding-left: 0;
  list-style-position: inside;

  li.product {
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