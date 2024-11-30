<template>
  <div class="section-spacing px-3 px-md-4 px-xxl-5 bg-image parallax border-radius-2 h-96" :style="{
    backgroundImage: 'url(/image/866-536x354.jpg)',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  }">
    <div>
      <div class="bg-overlay">
        <div class="section-spacing-lg text-center">

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const bgImageSrc = ref('../assets/image/866-536x354.jpg');
</script>

<style scoped>
.bg-image {
  position: relative;
  overflow: hidden;
}

.bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
}

.parallax {
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  transition: transform 0.2s ease-out;
}

.section-spacing-lg {
  padding: 4rem 2rem;
}
</style>
