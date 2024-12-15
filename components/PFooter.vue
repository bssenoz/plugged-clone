<template>
  <footer class="relative bg-[#040214] text-white py-16 h-screen ">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-32 mt-12">
      <div>
        <ul
          class="space-y-4 text-3xl 4xl:text-6xl animate-fade-up"
        >
          <li>Shows</li>
          <li>About</li>
          <li>Expertise</li>
          <li>Insights</li>
          <li>Contact</li>
        </ul>
      </div>

      <div class="ml-16 animate-fade-up">
        <h3 class="text-md 4xl:text-4xl uppercase text-gray-400 mb-4 ">What We Do</h3>
        <ul class="space-y-2 4xl:text-3xl ">
          <li>Branded Events</li>
          <li>Corporate Events</li>
          <li>Public Events</li>
        </ul>
      </div>

      <div class="animate-fade-up">
        <h3 class="text-md 4xl:text-4xl uppercase text-gray-400 mb-4 ">Contact</h3>
        <p class="4xl:text-2xl">Etnastraat 20<br />4814 AA Breda<br />The Netherlands</p>
        <p class="mt-4 4xl:text-2xl">+31 (0)76 75 11 023</p>
        <p>
          <a href="mailto:hello@pluggedliveshows.com" class="hover:underline 4xl:text-2xl">
            hello@pluggedliveshows.com
          </a>
        </p>

        <div class="flex space-x-4 mt-6">
          <a href="#" class="p-2 hover:bg-gray-700">
            <img
              src="/image/svg/linkedin.svg"
              alt="LinkedIn"
              style="width: 55px; height: 55px"
            />
          </a>
          <a href="#" class="p-2 hover:bg-gray-700">
            <img
              src="/image/svg/facebook.svg"
              alt="Facebook"
              style="width: 55px; height: 55px"
            />
          </a>
          <a href="#" class="p-2 hover:bg-gray-700">
            <img
              src="/image/svg/instagram.svg"
              alt="Instagram"
              style="width: 55px; height: 55px"
            />
          </a>
        </div>
      </div>
    </div>

    <!-- Parallax SVG Arka Planı -->
    <div class="absolute bottom-0 left-0 w-full animate-fade-up">
      <img
        src="/image/svg/waves-footer.svg"
        alt="Footer Background"
        class="w-full h-full object-cover opacity-40"
      />
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";


</script>


<style scoped>

</style>
