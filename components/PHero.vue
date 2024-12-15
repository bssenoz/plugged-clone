<template>
  <section
    class="relative w-full"
    :style="`background: ${hoveredContent?.gradient || '#040214'}`"
  >
    <div
      class="w-full h-full overflow-hidden video-container"
      @mouseover="isOverVideo = true"
      @mouseout="isOverVideo = false"
    >
      <video autoplay loop muted playsinline class="masked-video">
        <source src="/video/20230612124128957_org.mp4" type="video/mp4" />
        Tarayıcınız video etiketini desteklemiyor.
      </video>
    </div>

    <div
      class="absolute top-[40%] left-[10%] transform -translate-y-1/2 text-white text-xl 3xl:text-3xl md:w-[500px] z-20"
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
  </section>
  <div
    :style="`background: ${hoveredContent?.gradient || '#040214'}`"
    class="bg-sections relative"
  >
    <P3Card class="relative z-50" />
    <PShow @hoveredContent="handleHoveredContent" class="relative py-8" />
  </div>

  <PMore class="bg-[#ece5db] pb-16" />
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

const cursorPosition = ref({ x: 0, y: 0 });

const isOverVideo = ref(false);

const isHovered = ref(false);

const updateCursorPosition = (event: MouseEvent) => {
  cursorPosition.value = {
    x: event.clientX,
    y: event.clientY,
  };
};
const handleHoveredContent = (content) => {
  hoveredContent.value = content;
};

onMounted(() => {
  window.addEventListener("mousemove", updateCursorPosition);
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", updateCursorPosition);
});
const onScroll = () => {
  const scrollY = window.scrollY; // Scroll mesafesini al
  const maxScroll = 2500; // Yavaşlatma için daha büyük bir değer kullanıyoruz
  const minScroll = 0; // Min scroll değeri

  // Kaydırma mesafesinin yavaşlatılması için yeni marginTop değeri
  const marginTop = Math.min(Math.max((scrollY / maxScroll) * -90, -100), -10); // Hızı yavaşlatmak için factor kullanılıyor

  const maskedVideo = document.querySelector(".masked-video");

  if (maskedVideo) {
    maskedVideo.style.transform = `translateY(${marginTop}rem)`; // Video için yavaş hareket efekti
    maskedVideo.style.marginTop = `${marginTop}rem`; // Yeni marginTop'u uygula
  }
};

onMounted(() => {
  window.addEventListener("scroll", onScroll); // Scroll eventini dinle
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll); // Scroll event dinleyicisini temizle
});
</script>

<style scoped>
.custom-cursor {
  position: fixed;
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease-out;
  z-index: 50;
}

.play-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
  color: #fff;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-out;
}

.custom-cursor span {
  opacity: 1;
}

.video-container {
  position: relative;
  width: 100%;
  height: 120vh;
  overflow: hidden;
}

.video-container video {
  top: 0;
  /* left: 50%; */
  width: 100%;
  object-fit: cover;
  z-index: 0;
  position: fixed;
}

.masked-video {
  width: 100%;
  object-fit: cover;
  mask-image: url("/image/hero-mask.png");
  -webkit-mask-image: url("/image/hero-mask.png");
  mask-size: cover;
  -webkit-mask-size: cover;
  margin-top: -10rem;
  position: fixed; /* Sabit pozisyon */
  top: 0;
  left: 0;
  z-index: -1; /* Video arka planda kalsın */
  pointer-events: none; /* Fareyle etkileşime girmesin */
  transition: transform 0.3s ease-out; /* Kaydırma hareketi için geçiş efekti */
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

html {
  scroll-behavior: smooth; /* Sayfa kaydırma hareketini yumuşat */
}
</style>
