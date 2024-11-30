<template>
  <div class="space-container">
    <!-- Yıldızlar -->
    <div
      v-for="n in starCount"
      :key="'star-' + n"
      class="star"
      :class="getStarClass()"
      :style="getRandomStarPosition(n)"
    ></div>

    <!-- Card Örneği -->
      <CarouselWithCurve />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CarouselWithCurve from "./CarouselWithCurve.vue"

const starCount = 200; // Yıldız sayısı

// Yıldızların rastgele pozisyonu ve parlama efekti
const getRandomStarPosition = (index) => {
  const top = Math.random() * 100; // Yıldızın yukarıdan ne kadar yükseğe yerleşeceğini belirler
  const left = Math.random() * 100; // Yıldızın soldan ne kadar uzak olacağını belirler
  const size = Math.random() * 2 + 1; // Yıldızın boyutu
  const opacity = Math.random() * 0.5 + 0.5; // Yıldızın opaklık (parlaklık)
  const animationDelay = `${Math.random() * 3}s`; // Animasyon gecikmesi
  const twinkleDelay = `${Math.random() * 2}s`; // Yıldız titremesi gecikmesi

  return {
    top: `${top}%`,
    left: `${left}%`,
    fontSize: `${size}px`,
    opacity,
    animationDelay,
    'animation-delay': twinkleDelay,
  };
};

const getStarClass = () => {
  const isBright = Math.random() > 0.9; // %10 parlama ihtimali
  return isBright ? 'star-bright' : '';
};
</script>

<style scoped>
.space-container {
  position: relative;
  height: 100vh;
  background: radial-gradient(circle, #000 60%, #1a1a1a);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Yıldızlar */
.star {
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  position: absolute;
  animation: twinkle 2s infinite ease-in-out;
}

.star-bright {
  background: #fff; /* Parlayan yıldızlar için beyaz */
  box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.8);
}

@keyframes twinkle {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

/* Card için stiller */
.card {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  z-index: 1;
}

.card-header {
  margin-bottom: 20px;
}

.card-body {
  margin-top: 10px;
}

/* Yıldızların animasyonu */
@keyframes twinkle {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}
</style>
