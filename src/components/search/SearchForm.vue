<template>
  <div>
    <app-search-input 
      @productsIsLoading="isLoading = $event"
      @productsLoaded="products = $event.products; usedKeyword = $event.usedKeyword;" />

    <app-loader v-show="isLoading">Loading</app-loader>

    <app-search-results 
      :usedKeyword="usedKeyword"
      :products="products"
      v-show="!isLoading" />
  </div>
</template>

<script>
import AppSearchInput from './SearchInput.vue'
import AppSearchResults from './SearchResults.vue'
import AppLoader from '@/components/Loader.vue'

export default {
  components: {
    AppSearchInput,
    AppSearchResults,
    AppLoader,
  },
  data() {
    return {
      products: [],
      usedKeyword: "",
      isLoading: false,
    }
  }
}
</script>

