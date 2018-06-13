<template>
	<input 
		type="button"
		value="+1"
		@click="countUp()"
	/>
</template>

<script>
import {mapMutations} from 'vuex';

export default {
	methods: {
		...mapMutations(['countUp'])
	}	
}
</script>

<style>

</style>
