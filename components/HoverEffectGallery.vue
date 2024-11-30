<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const images = [
    { src: 'https://picsum.photos/id/232/200/300' },
    { src: 'https://picsum.photos/id/233/200/300' },
    { src: 'https://picsum.photos/id/234/200/300' },
    { src: 'https://picsum.photos/id/235/200/300' },
    { src: 'https://picsum.photos/id/237/200/300' },
    { src: 'https://picsum.photos/id/236/200/300' },
    { src: 'https://picsum.photos/id/238/200/300' },
    { src: 'https://picsum.photos/id/239/200/300' },
];

const hoverIndex = ref(-1); 
const intervalId = ref(null);
const galleryContainer = ref(null);

const isMobile = ref(false); // Track if device is mobile

// Check if the device is mobile
const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768;
};

const handleMouseEnter = (index) => {
    if (!isMobile.value) {
        hoverIndex.value = index;
    }
};

const handleMouseLeave = () => {
    if (!isMobile.value) {
        hoverIndex.value = -1;
    }
};

const startInterval = () => {
    if (!isMobile.value) {
        intervalId.value = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * images.length);
            hoverIndex.value = randomIndex; 
        }, 1500);
    }
};

const stopInterval = () => {
    if (intervalId.value) {
        clearInterval(intervalId.value);
    }
};

onMounted(() => {
    checkMobile(); // Check for mobile on mount
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                startInterval();
            } else {
                stopInterval();
            }
        },
        { threshold: 0.1 }
    );

    if (galleryContainer.value) {
        observer.observe(galleryContainer.value);
    }

    // Update the device type on window resize
    window.addEventListener('resize', checkMobile);
});

onBeforeUnmount(() => {
    stopInterval();
    window.removeEventListener('resize', checkMobile);
});
</script>


<template>
        <div class="flex justify-center items-center h-screen" ref="galleryContainer">
            <div class="flex overflow-hidden w-full max-w-[1280px] space-x-4 justify-center">
        <div class="gallery  ">
            <img
                v-for="(image, index) in images"
                :key="index"
                :src="image.src"
                :alt="'description of picture ' + (index + 1)"
                :class="index === hoverIndex ? 'hover' : ''"
                @mouseenter="handleMouseEnter(index)"
                @mouseleave="handleMouseLeave"
            />
        </div>
        </div>
    </div>
</template>

<style scoped>
.gallery {
    --size: 100px;
    display: grid;
    grid-template-columns: repeat(6, var(--size));
    grid-auto-rows: var(--size);
    gap: 5px;
    place-items: start center;
    margin-bottom: var(--size);
}

.gallery img {
    width: calc(var(--size) * 2);
    height: calc(var(--size) * 2);
    object-fit: cover;
    grid-column: auto / span 2;
    border-radius: 5px;
    clip-path: path("M90,10 C100,0 100,0 110,10 190,90 190,90 190,90 200,100 200,100 190,110 190,110 110,190 110,190 100,200 100,200 90,190 90,190 10,110 10,110 0,100 0,100 10,90Z");
    transition: transform 0.3s ease, clip-path 0.3s ease;
}

.gallery img.hover {
    transform: scale(1.1);
    clip-path: none;
    z-index: 10;
}

.gallery img:nth-child(5n - 1) {
    grid-column: 2 / span 2;
}
</style>
