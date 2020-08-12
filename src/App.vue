<template>
  <div id="app">
    <app-header />

    <div class="container">
      <app-search-form />
    </div>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue'
import AppSearchForm from './components/search/SearchForm.vue'

export default {
  name: 'app',
  components: {
    AppHeader,
    AppSearchForm
  },
}
</script>

<style lang="scss">
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $white;
}
</style>