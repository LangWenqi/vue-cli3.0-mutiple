<template>
	<div class="fixed" @click.stop.prevent="close">
		<img src="../../common/images/share.png" height="118" width="94">
		<div>点击右上角喊小伙伴来帮忙吧!</div>
	</div>
</template>
<script>
export default {
	data() {
		return {

		}
	},
	methods:{
		close() {
			this.$emit('close')
		}
	}
}

</script>
<style lang="scss" scoped>
.fixed {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 1000;
	font-size: 0.16rem;
	color: #FFFFFF;
	font-weight: 900;
	text-align: center;
	img{
		height: 0.59rem;
		width: 0.47rem;
		display: block;
		margin: 0.2rem 0 0.1rem 3.1rem;
	}
}

</style>
