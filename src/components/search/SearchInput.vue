<template>
  <div>
    <div class="form-group">
      <input 
        v-model="keyword"
        type="text" 
        placeholder="Enter keyword(s)"
        @keyup.enter="search" />
      <button class="clear-btn" @click="keyword = ''">Clear</button>
      <button class="btn submit-btn" @click="search">Search</button>
    </div>
    
    <div class="error" v-if="error">{{ this.error }}</div>
  </div>
</template>

<script>
import { getProducts } from '@/services/network'

export default {
  data() {
    return {
      keyword: "",
      error: "",
    }
  },
  methods: {
    async search() {
      if (this.keyword == '') {
        this.error = "Please enter a keyword"
        return;
      }

      this.$emit('productsIsLoading', true);
      this.error = '';
      
      try {
        const results = await getProducts(this.keyword.trim())

        this.$emit('productsLoaded', {
          products: this.highlightKeyword(results), 
          usedKeyword: this.keyword
        });
      } catch(e) {
        this.error = "An error has occured"
        console.error(e)
      } finally {
        this.$emit('productsIsLoading', false);
        this.keyword = "";
      }
    },
    highlightKeyword(results) {
      results.forEach((product) => {
        //Highlight typed keyword in search results
        let replaces = this.keyword.trim().split(' ');
        product.ingredient_list = product.ingredient_list.join(", ");

        replaces.forEach((replace) => {
          let re = new RegExp(replace, "g");

          product.name = product.name.replace(re, `<em>${replace}</em>`);
          product.brand = product.brand.replace(re, `<em>${replace}</em>`);

          product.ingredient_list = product.ingredient_list.replace(re, `<em>${replace}</em>`);
        })
      })

      return results;
    }
  }
}
</script>

<style lang="scss" scoped>
.form-group {
  display: flex;
  justify-content: space-between;

  input[type=text] {
    width: 100%;
    border-radius: 5px 0 0 5px;
  }

  .clear-btn {
    border-radius: 0 5px 5px 0px;
    font-size: .9rem;
  }
  
  .submit-btn {
    margin-left: 1.45rem;
  }

  @media screen and (max-width: 500px) {
    flex-wrap: wrap;
    justify-content: center;

    input[type=text] {
      width: 80%;
    }

    .clear-btn {
      width: 20%;
    }

    .submit-btn {
      margin-top: 10px;
      margin-left: 0;
    }
  }
}

.error {
  margin-top: .5rem;
  margin-bottom: 1rem;
  font-weight: bold;
}
</style>