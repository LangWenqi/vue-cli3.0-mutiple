<template>
	<textarea rows="1" :style="styleObject" :disabled="disabled" :placeholder="placeholder" ref="txt" @input="change"></textarea>
</template>
<script>
export default {
	props: ['color', 'border', 'placeholder', 'lineHeight', 'fontSize', 'heigth', 'disabled'],
	data() {
		return {

		}
	},
	computed: {
		styleObject: function() {
			return {
				color: this.color,
				border: this.border,
				lineHeight: this.lineHeight,
				fontSize: this.fontSize,
				height: this.heigth
			}
		}
	},
	methods: {
		change() {
			let txt = this.$refs.txt
			txt.style.height = 'auto';
			txt.scrollTop = 0; //防抖动
			txt.style.height = txt.scrollHeight + 'px'
		},
	}
}

</script>
<style lang="scss" scoped>
textarea{
	display: block;
	box-sizing: border-box;
	max-width: 100%;
}
</style>
