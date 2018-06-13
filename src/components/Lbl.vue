<template>
	<p>{{count}}</p>
</template>

<script>
import {mapState} from 'vuex';

export default {
	computed: {
		...mapState(['count']),
	}
}
</script>

<style>

</style>
