<template>
  <img :src="posterPath" class="poster"/>
</template>

<script>
export default {
  props: {
    posterName: {
      type: String,
      required: true,
      },
  },
  computed: {
    posterPath() {
      return `http://image.tmdb.org/t/p/w500/${this.posterName}`;
    }
  },
}
</script>

<style scoped>
  .poster {
    width: 100%;
  }
</style>