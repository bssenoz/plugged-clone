<template>
    <div class="relative">
      <!-- Sticky Navbar -->
      <nav 
        class="fixed top-0 left-0 w-full bg-black text-white z-50 transition-all duration-300"
        :class="{ 'h-16': scrolled, 'h-0': !scrolled }"
      >
        <div class="container mx-auto flex items-center justify-between h-full px-4">
          <div class="font-bold text-xl">Lorem</div>
          <div v-if="scrolled" class="font-bold text-lg">LOREM</div>
          <ul class="flex space-x-4">
            <li><a href="#about" class="hover:text-gray-400">About</a></li>
            <li><a href="#services" class="hover:text-gray-400">Services</a></li>
            <li><a href="#contact" class="hover:text-gray-400">Contact</a></li>
          </ul>
        </div>
      </nav>
  
      <!-- Hero Section -->
      <div class="relative h-screen bg-black overflow-hidden">
        <!-- Video Background -->
        <video 
          autoplay 
          loop 
          muted 
          class="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/video/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
  
        <!-- Shrinking Text -->
        <div
          class="absolute text-white font-bold transition-all duration-100"
          :style="{
            transform: `translate(-50%, calc(-50% - ${scrollOffset}px))`,
            fontSize: `${Math.max(5, 10 - scrollOffset / 50)}vw`,
            marginTop: `50vh`,
            marginLeft: `50%`
          }"
        >
          LOREM
        </div>
      </div>
  
      <!-- Dummy Content -->
      <!-- <section id="about" class="h-screen bg-gray-100">
        <h1 class="text-center text-3xl font-bold py-20">About Us</h1>
      </section>
      <section id="services" class="h-screen bg-gray-200">
        <h1 class="text-center text-3xl font-bold py-20">Services</h1>
      </section>
      <section id="contact" class="h-screen bg-gray-300">
        <h1 class="text-center text-3xl font-bold py-20">Contact</h1>
      </section> -->
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from "vue";
  
  const scrollOffset = ref(0);
  const scrolled = ref(false);
  
  onMounted(() => {
    const handleScroll = () => {
      scrollOffset.value = Math.min(window.scrollY, 400); // Maksimum hareket limiti: 400px
      scrolled.value = window.scrollY > 200; // Navbar'a sabitlenecek yazı limiti
    };
  
    window.addEventListener("scroll", handleScroll);
  
    // Scroll dinleyicisini temizle
    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
    });
  });
  </script>
  
  <style>
  /* Navbar boyut geçişi için */
  nav {
    overflow: hidden; /* Scroll efektinde içerik akmasını engeller */
  }
  </style>
  