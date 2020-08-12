<template>
  <header>
    <h1>This is a page for beauty product search</h1>
    <img alt="Beauty products" src="@/assets/beauty-products.jpg">
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  background-color: $primary;
  color: $black;
  text-align: center;
  margin-bottom: 50px;
  height: 50vh;

  h1,
  img {
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
  
  img {
    object-fit: cover;
  }

  @media screen and (max-width: 750px) {
    height: auto;
    flex-direction: column;

    h1,
    img {
      width: 100%;
      height: 50vh;
      max-height: 300px;
    }
  }
}
</style>