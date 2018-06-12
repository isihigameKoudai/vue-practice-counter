<template>
  <div>
    <p>counter</p>
    <input 
      @click="coutnUp()"
      type="button"
      value="+1"
    />
    <p>{{count}}</p>
  </div>
</template>

<script>

export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    coutnUp() {
      this.count++;
    }
  }
}
</script>

<style>

</style>
