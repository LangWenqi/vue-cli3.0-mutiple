<template>
    <div class="scroll-container">
        <cube-switch v-model="value">
            Switch
        </cube-switch>
        <div class="wrapper">
            <img src="../../common/images/checkToast.png" alt="">
        </div>
    </div>
</template>
<script type="text/babel">
  export default {
    data () {
      return {
        value:true
      }
    },
    components: {},
    mounted () {
        this.$weChat();
    },
    destroyed () {

    },
    methods: {

    }
  }
</script>
<style scoped lang="stylus">
    .scroll-container{
        .wrapper{
            background yellow
            imgbox(300px,300px)
        }
    }
</style>
