<template>
  <header class="main-header">
    <h1>This is a page for beauty product search</h1>
    <img class="main-header--img" alt="Beauty products" src="@/assets/beauty-products.jpg">
  </header>
</template>

<style lang="scss" scoped>
.main-header {
  display: flex;
  background-color: $primary;
  color: $black;
  text-align: center;
  margin-bottom: 2.7rem;
  height: 50vh;

  h1,
  .main-header--img {
    width: 50%;
  }

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    padding: 0 2rem;
    margin: 0;
  }
  
  .main-header--img {
    object-fit: cover;
  }

  @media screen and (max-width: 750px) {
    height: auto;
    flex-direction: column;

    h1,
    .main-header--img {
      width: 100%;
      height: 50vh;
      max-height: 300px;
    }
  }
}
</style>