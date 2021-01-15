<template>
  <img 
    :src="imagePath"
    class="backdrop-image"
    />
</template>

<script>
export default {
  props: {
    imageName: {
      type: String,
      required: true,
    },
  },
  computed: {
    imagePath() {
      return `http://image.tmdb.org/t/p/w1280${this.imageName}`;
    }
  },
}
</script>

<style>
.backdrop-image {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  filter: blur(20px);
}
</style>