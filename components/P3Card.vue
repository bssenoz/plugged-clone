<template>
  <section class="flex flex-col justify-center space-y-4 animate-fade-up ">

    <!-- Mobil Slider -->
    <div class="lg:hidden">
      <swiper
        :slides-per-view="1.2"
        :space-between="16"
        class="swiper-container"
        pagination

      >
        <swiper-slide v-for="(card, index) in cards" :key="index">
          <div class="rounded-lg shadow-lg overflow-hidden h-[500px]">
            <img
            :src="card.imageUrl"
            alt="Card Image"
            class="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 transform"
          />

          <div class="absolute left-2 right-0 text-white text-3xl 4xl:text-5xl p-4 title">
            <h2>{{ card.title }}</h2>
            <p class="text-lg mt-4">{{ card.description }}</p>
    
          </div>

          <div class="mask-overlay"></div>
          </div>
          
        </swiper-slide>
        
      </swiper>
    </div>
    <!-- Cards section -->
    <div class="hidden lg:flex flex flex-wrap justify-center space-x-4 ">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="flex-1 max-w-xs lg:max-w-sm 4xl:max-w-xl card-1"
      >
        <div
          class="relative rounded-lg shadow-lg overflow-hidden h-[500px] 4xl:h-[700px] card cursor-pointer"
          :class="{ 'mt-8': index !== 1 }"
        >
          <!-- Resim -->
          <img
            :src="card.imageUrl"
            alt="Card Image"
            class="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 transform"
          />

          <!-- Başlık -->
          <div class="absolute left-2 right-0 text-white text-3xl 4xl:text-5xl p-4 title">
            <h2>{{ card.title }}</h2>
          </div>

          <!-- Mask Overlay -->
          <div class="mask-overlay"></div>
        </div>

        <!-- Content outside the card -->
        <div class="content p-4">
          <div class="mt-4 text-lg 4xl:text-2xl text-gray-300 opacity-0 transform transition-all duration-500">
            <p>{{ card.description }}</p>
            <p class="text-sm 4xl:text-lg text-gray-400 uppercase mt-4">
              <span v-for="(event, i) in card.events" :key="i">
                {{ event }}<br />
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { cards } from '../assets/text.js';
</script>

<style scoped>
.masked {
  width: 100%;

  object-fit: cover;
  mask-image: url("/image/hero-mask.png");
  -webkit-mask-image: url("/image/hero-mask.png");
  mask-size: cover;
  -webkit-mask-size: cover;
  z-index: 999;
  background-color: transparent;
}


.card-1 {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
}

.card img {
  transition: transform 0.3s ease-in-out;
}

.card-1:hover img {
  transform: scale(1.1);
}

.mask-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
  transition: background 0.3s ease;
  z-index: 2;
}

.card-1:hover .mask-overlay {
  background: linear-gradient(to bottom, rgba(5, 2, 29, 0.1), rgba(5, 2, 29, 1));
  transition: background 0.3s ease;
}

.title {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 0;
  padding: 1rem;
  z-index: 3;
  transition: bottom 0.5s ease-in-out;
}

.card-1:hover .title {
  bottom: 7rem;
}

.content {
  position: relative;
  z-index: 3;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease;
  transform: translateY(100%);
  opacity: 0;
  padding-left: 3rem;
}

.card:hover + .content {
  transform: translateY(0);
  opacity: 1;
  bottom: 7rem;
}

.content > div {
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease,
    visibility 0.5s ease;
}

.card:hover + .content > div {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
</style>
