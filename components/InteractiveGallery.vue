<script setup lang="ts">
const images = [
  { src: "https://picsum.photos/id/237/200/300", title: "Image 1" },
  { src: "https://picsum.photos/id/235/200/300", title: "Image 2" },
  { src: "https://picsum.photos/id/234/200/300", title: "Image 3" },
  { src: "https://picsum.photos/id/233/200/300", title: "Image 4" },
  { src: "https://picsum.photos/id/232/200/300", title: "Image 5" },
];

const defaultIndex = 1;
const activeIndex = ref(defaultIndex);
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="flex overflow-hidden w-full max-w-[1280px] space-x-4">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="transition-all duration-500 flex-shrink-0"
        :class="{
          'w-1/3': activeIndex === index,
          'w-1/6': activeIndex !== index
        }"
        @mouseenter="activeIndex = index"
      >
        <div class="relative flex flex-col h-full">
          <img
            :src="image.src"
            alt="Gallery Image"
            class="w-full object-cover transition-all duration-500"
            :class="{
              'h-72': activeIndex === index,
              'h-96': activeIndex !== index
            }"
          />
          <div
            class="absolute bottom-0 w-full bg-opacity-70 text-black p-4 transition-opacity duration-500"
            :class="{
              'opacity-100': activeIndex === index,
              'opacity-0': activeIndex !== index
            }"
          >
            <div class="flex flex-col">
              <div class="text-2xl tracking-wide">{{ image.title }}</div>
              <div class="text-base font-normal underline underline-offset-8 mt-2 flex items-center tracking-widest">
                <span>READ MORE</span>
                <svg class="ml-2 w-4 h-4 animate-ping" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  transition: transform 0.5s ease-in-out;
}
</style>
