<template>
  <div class="relative h-auto overflow-x-hidden component"  @mouseover="handleMouseOver">
    <div class="waves">
      <div class="w-screen h-[1200px] 4xl:h-[1700px] wave-svg"></div>
    </div>
    <div class="bulls-eye float-right right-4">
      <div class="w-[600px] h-[600px] bulls-eye-svg mr-[-300px]"></div>
    </div>
    <div
      class="mx-auto px-4 py-8 w-full h-auto flex items-center justify-center z-50 absolute top-0 mt-48"

    >
      <div>
        <h2 class="w-full text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 text-center z-10 title animate-fade-up">
          More Insight
        </h2>

        <client-only v-if="isHovered">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-12 pt-20 text-left animate-fade-up">
            <div
              v-for="(item, index) in moreContents"
              :key="index"
              class="flex flex-col mx-auto"
              :class="[getWidthClass(index), index === 0 ? 'ml-auto' : '']"
            >
              <div class="relative overflow-hidden image-container cursor-pointer">
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-full h-full object-cover mb-4 transition-transform duration-300 transform hover:scale-110"
                />
              </div>
              <h3 class="text-xl font-semibold mt-4 4xl:text-3xl">
                {{ item.title }}
              </h3>
              <p class="text-gray-700 mt-4 4xl:text-xl">
                {{ item.description }}
              </p>
            </div>
          </div>
          <div class="flex items-center justify-center all cursor-pointer mt-12">
            <div class="relative w-12 h-12 sphere-svg flex items-center justify-center">
              <div class="icon transition-all duration-300 mb-2 mr-3">
                <svg
                  class="plus-svg absolute"
                  viewBox="0 0 30 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line y1="6.5" x2="13" y2="6.5" stroke="darkred" />
                  <line
                    x1="6.5"
                    y1="0"
                    x2="6.5"
                    y2="13"
                    stroke="darkred"
                  />
                </svg>
                <svg
                  class="arrow-svg absolute opacity-0"
                  viewBox="0 0 20 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM13 3.5H0V4.5H13V3.5Z"
                    fill="darkred"
                  />
                </svg>
              </div>
            </div>

            <span class="label uppercase ml-4">All Insights</span>
          </div>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script setup>
import { moreContents } from '~/assets/text';
import { ref } from 'vue';
const props = defineProps({
  isHoveredMore: Boolean,
});
// Hover durumunu kontrol etmek için bir state
const isHovered = ref(false);

function getWidthClass(index) {
  switch (index % 4) {
    case 0:
      return "w-[400px] 4xl:w-[600px]";
    case 1:
      return "w-[600px] 4xl:w-[900px]";
    case 2:
      return "w-[600px] 4xl:w-[900px]";
    case 3:
      return "w-[400px] 4xl:w-[600px] mt-28";
    default:
      return "w-[400px] 4xl:w-[600px]";
  }
}

// Fare ile üzerine gelindiğinde isHovered durumunu true yap
const handleMouseOver = () => {
  isHovered.value = true;
};


</script>

<style scoped>
/* Sphere SVG */
.sphere-svg {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
  background-image: url("/image/svg/sphere.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.all:hover .sphere-svg {
  transform: scale(1.2) rotate(90deg); 
}

.plus-svg {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.arrow-svg {
  transition: opacity 0.3s ease, transform 0.3s ease;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transform: scale(0.8);
}

.all:hover .arrow-svg {
  opacity: 1;
  transform: scale(0.5) rotate(-90deg);
}

.all:hover .plus-svg {
  opacity: 0; 
  transform: scale(0.8);
}

.wave-svg {
  background-image: url("/image/svg/wave.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.bulls-eye-svg {
  background-image: url("/image/svg/bulls-eye.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.label {
  position: relative;
  display: inline-block;
  font-weight: bold;
  text-transform: uppercase;
}

.label::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: darkred; 
  transition: transform 0.6s ease, width 0.9s ease;
}

.all:hover .label::after {
  width: 0;
  transform: translateX(100%); 
}

</style>
