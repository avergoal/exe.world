<template>
	<LoaderAnimation />
</template>

<script>
export default {
	name: 'LogInTempModal',
	created() {
		this.regGuest()
	},
	computed: {
		modal() {
			return this.$store.getters['app/modal']
		}
	},
	methods: {
		async regGuest() {
			await this.$store.dispatch('auth/regGuest')
			this.goGame()
		},
		goGame() {
			this.$router.push('/g/' + this.modal.game_id)
			this.$root.$emit('toggleModal', {})
		}
	}
}
</script>