<template>
  <div class="mt-1 simple-loader">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.simple-loader {
  margin-bottom: 30px;
  
  &:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;    
    animation: ellipsis steps(4,end) 900ms infinite;
    content: "\2026";
    width: 0px;
  }
}
</style>