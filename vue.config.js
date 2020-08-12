module.exports = {
  devServer: {
    proxy: {
      '/product' : {
        target: 'https://skincare-api.herokuapp.com',
        secure: false
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/scss/app.scss";`
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/jolimoi/'
    : '/'
}