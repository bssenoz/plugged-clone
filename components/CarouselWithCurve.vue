<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { ref, onMounted } from "vue";
import { EffectCoverflow } from "swiper/modules";
import { useWindowSize } from "@vueuse/core";

const modules = [EffectCoverflow];
const { width } = useWindowSize();

const isMobile = ref(width.value <= 768)
const slides = ref(Array.from({ length: 5 }));
const activeSlide = ref(isMobile.value ? 0 : 1);
const pathLength = ref(0);
const slidePositions = ref([]);
const activePosition = ref({ x: 0, y: 100 });
const isDragging = ref(false);
const svgWidth = isMobile.value ? 300 : 600;

// SVG yolunun uzunluğunu al ve slayt pozisyonlarını hesapla
onMounted(() => {
    const path = document.getElementById("curve");
    pathLength.value = path.getTotalLength();
    calculateSlidePositions();
});

// Slayt pozisyonlarını hesapla
const calculateSlidePositions = () => {
    const step = pathLength.value / (slides.value.length - 1);
    slidePositions.value = slides.value.map((_, i) => {
        const position = i * step;
        const path = document.getElementById("curve");
        const point = path.getPointAtLength(position);
        return { x: point.x, y: point.y };
    });

    activePosition.value = slidePositions.value[activeSlide.value];
};

// Drag işlemleri
const startDrag = (event) => {
    isDragging.value = true;
    const initialX = event.clientX;
    const initialY = event.clientY;
    const initialPosition = { ...activePosition.value };

    const onMouseMove = (moveEvent) => {
        console.log("busee",)
        if (isDragging.value) {
            const deltaX = moveEvent.clientX - initialX;
            const deltaY = moveEvent.clientY - initialY;
            const newX = initialPosition.x + deltaX;
            const newY = initialPosition.y + deltaY;

            const path = document.getElementById("curve");
            const pathProgress = Math.min(
                Math.max(0, (newX / svgWidth) * pathLength.value),
                pathLength.value
            );
            const newPosition = path.getPointAtLength(pathProgress);

            activePosition.value = { x: newPosition.x, y: newPosition.y };

            const newSlideIndex = Math.round(
                (activePosition.value.x / svgWidth) * (slides.value.length - 1)
            );
            activeSlide.value = newSlideIndex;

            const swiperInstance = document.querySelector(".mySwiper").swiper;
            swiperInstance.slideTo(newSlideIndex);
        }
    };

    const onMouseUp = () => {
        isDragging.value = false;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
};

// Slayt değişiminde pozisyon güncelle
const onSlideChange = () => {
    const swiperInstance = document.querySelector(".mySwiper").swiper;
    activeSlide.value = swiperInstance.activeIndex;
    activePosition.value = slidePositions.value[activeSlide.value];
};
</script>

<template>
    <div class="flex flex-col justify-center items-center  max-sm:px-8">
        <div class="flex overflow-hidden w-full max-w-[960px] space-x-4">
            <swiper ref="swiperRef" :effect="isMobile ? '' : 'coverflow'" :grabCursor="isMobile ? false : true"
                :centeredSlides="isMobile ? false : true" :initial-slide="activeSlide"
                :slides-per-view="isMobile ? 1 : 3" :coverflow-effect="{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true
                }" :modules="modules" @slideChange="onSlideChange" class="mySwiper">
                <swiper-slide v-for="(slide, index) in slides" :key="index"
                    :class="{ 'swiper-slide-active': activeSlide === index }">
                    <div class="relative rounded-lg overflow-hidden">
                        <img :src="'https://swiperjs.com/demos/images/nature-' + (index + 1) + '.jpg'"
                            class="w-full h-auto rounded-lg" />
                        <div
                            :class="{ 'absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-lg': activeSlide !== index }">
                        </div>
                        <div v-if="activeSlide === index"
                            class="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white p-4">
                            <p>Active Slide Text: {{ index + 1 }}</p>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>

        <!-- Eğri ve Daire -->
        <div class="relative w-[300px] lg:w-[600px] h-[200px] mt-[-100px] ">
            <svg class="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 200">
                <path id="curve" d="M0,100 Q300,200 600,100" fill="none" stroke="url(#gradient)" stroke-width="6"
                    stroke-linecap="round" stroke-linejoin="round" />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="0%" stop-color="#f59e0b" stop-opacity="0" />
                        <stop offset="25%" stop-color="#f59e0b" stop-opacity="0.4" />
                        <stop offset="50%" stop-color="#f59e0b" stop-opacity="1" />
                        <stop offset="75%" stop-color="#f59e0b" stop-opacity="0.4" />
                        <stop offset="100%" stop-color="#f59e0b" stop-opacity="0" />
                    </linearGradient>
                </defs>
            </svg>

            <div class="absolute w-[40px] h-[40px] bg-blue-500 border-4 border-amber-400 rounded-full cursor-pointer transition-all duration-300 animate-pulse"
                :style="{
                    left: `${activePosition.x}px`,
                    top: `${activePosition.y}px`,
                    transform: 'translate(-50%, -50%)'
                }" @mousedown="startDrag"></div>
        </div>
    </div>
</template>

<style scoped>
.swiper {
    padding-top: 50px;
    padding-bottom: 50px;
}

.swiper-slide {
    @apply transition-shadow ease-in-out duration-300 rounded-lg;
    width: 310px !important;
    height: 310px !important;
}

.swiper-slide-active {
    @apply opacity-100 shadow-lg;
    width: 340px !important;
    height: 340px !important;
}

@media (max-width: 768px) {
    .swiper-slide {
        @apply w-full !important;
    }
}

@media (max-width: 768px) {
    .swiper-slide-active {
        @apply w-full h-full shadow-none;
    }
}
</style>