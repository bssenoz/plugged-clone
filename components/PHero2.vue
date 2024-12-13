<template>
    <section class="relative w-full " :style="`background: ${hoveredContent?.gradient || '#040214'}`">
      <div
        class="w-full h-full overflow-hidden video-container"
        @mouseover="isOverVideo = true"
        @mouseout="isOverVideo = false"
      >
        <video autoplay loop muted playsinline class="masked-video">
          <source src="/video/b86b5be5-cc9e187c.mp4" type="video/mp4" />
          Tarayıcınız video etiketini desteklemiyor.
        </video>
      </div>
  
      <div
        class="absolute top-[12%] left-[10%] transform -translate-y-1/2 text-white text-xl 3xl:text-3xl w-[500px] z-20"
      >
        <img src="/image/svg/text.svg" class="animate-fade-left" />
        <p class="mt-8 text-lg text-center animate-fade-left ease-out">
          Extraordinary <br />shows and experiences for <br />one-of-a-kind
          occasions.
        </p>
      </div>
  
      <div class="absolute top-[76vh] w-full z-40">
        <div class="waves">
          <img src="/image/svg/wave-hero.svg" />
        </div>
      </div>
  
  
        <P3Card class="relative " />
        <PShow @hoveredContent="handleHoveredContent" class="relative py-8" />
    </section>
  
    <PMore class="bg-[#ece5db] pb-16" />
    <!-- :class="{ 'animate-fade-up': isHovered }"
        @mouseover="isHovered = true"
        @mouseout="isHovered = false" -->
    <PFooter />
  
    <!-- Custom cursor -->
    <div
      class="custom-cursor"
      :style="{
        top: cursorPosition.y + 'px',
        left: cursorPosition.x + 'px',
        transform: isOverVideo ? 'scale(2)' : 'scale(.7)',
      }"
    >
      <span v-if="isOverVideo" class="play-text">Play</span>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount } from "vue";
  import P3Card from "./P3Card.vue";
  import PShow from "./PShow.vue";
  import PMore from "./PMore.vue";
  import PContact from "./PContact.vue";
  import PFooter from "./PFooter.vue";
  const hoveredContent = ref(null);
  
  // State to track cursor position
  const cursorPosition = ref({ x: 0, y: 0 });
  // State to track if the cursor is over the video
  const isOverVideo = ref(false);
  // State to track if the cursor is over P3Card
  const isHovered = ref(false);
  
  // Update the cursor position on mousemove
  const updateCursorPosition = (event: MouseEvent) => {
    cursorPosition.value = {
      x: event.clientX,
      y: event.clientY,
    };
  };
  const handleHoveredContent = (content) => {
    hoveredContent.value = content;
  };
  
  // Attach the mousemove listener on mount
  onMounted(() => {
    window.addEventListener("mousemove", updateCursorPosition);
  });
  
  // Cleanup the event listener when the component is destroyed
  onBeforeUnmount(() => {
    window.removeEventListener("mousemove", updateCursorPosition);
  });
  
  
  </script>
  
  <style scoped>
  /* Custom cursor styles */
  .custom-cursor {
    position: fixed;
    width: 50px; /* Larger Circle size */
    height: 50px;
    background-color: rgba(255, 255, 255, 0.2); /* White with transparency */
    border-radius: 50%;
    pointer-events: none; /* Ensure it doesn't interfere with clicks */
    transform: translate(-50%, -50%); /* Center the circle around the cursor */
    transition: all 0.3s ease-out; /* Smooth transition for size */
  }
  
  .play-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 10px; /* Smaller Play text */
    color: #fff;
    opacity: 0; /* Initially hidden */
    pointer-events: none;
    transition: opacity 0.3s ease-out; /* Smooth fade-in */
  }
  
  /* Play text visible when hovering over the video */
  .custom-cursor span {
    opacity: 1; /* Show play text when hovering */
  }
  
  .video-container {
    position: relative;
    width: 100%;
    height: 120vh;
    overflow: hidden;
  }
  
  .video-container video {
    top: 0;
    left: 50%;
    width: 100%;
    object-fit: cover;
    z-index: 10;
  }
  
  .masked-video {
    width: 100%;
    object-fit: cover;
    mask-image: url("/image/hero-mask.png");
    -webkit-mask-image: url("/image/hero-mask.png");
    mask-size: cover;
    -webkit-mask-size: cover;
    margin-top: -10rem;
  }
  
  /* Animation for fading up */
  .animate-fade-up {
    animation: fadeUp 1s ease-out;
  }
  
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(100px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  body {
    overflow: hidden; /* Scroll çubuğunu gizler */
    margin: 0;
    padding: 0;
  }
  
  /* Yumuşak kayma animasyonu için */
  html {
    transition: transform 0.6s ease-out; /* Yumuşak geçiş efekti */
  }
  
  </style>
  