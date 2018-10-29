<template>
  <div class="mf-loading-container" flex="main:center cross:center">
    <img src="./loading.gif">
    <span>努力加载中...</span>
  </div>
</template>
<script type="text/ecmascript-6">
const COMPONENT_NAME = 'loading'

export default {
  name: COMPONENT_NAME
}

</script>
<style lang="scss" scoped>
.mf-loading-container {
  font-size: 0.14rem;
  img {
    width: 0.2rem;
    height: 0.2rem;
    display: block;
    margin-right: 0.1rem;
  }
}

</style>
