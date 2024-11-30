<template>
  <div class="animation-container">
    <!-- Bouncing Ball -->
    <svg
      class="ball"
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 100 100"
      fill="orange"
    >
      <circle cx="50" cy="50" r="50" />
    </svg>

    <!-- Rotating Star -->
    <svg
      class="star"
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 24 24"
      fill="yellow"
    >
      <path
        d="M12 2.5l3.09 6.26 6.91 1-5 4.87 1.18 6.87L12 17.77 6.82 21.5 8 14.63 3 9.76l6.91-1L12 2.5z"
      />
    </svg>
  </div>
</template>

<style>
.animation-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  background: #f0f0f0;
  overflow: hidden;
}

.ball {
  animation: bounce 3s ease-in-out infinite;
}

.star {
  animation: rotate 5s linear infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(300px);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
