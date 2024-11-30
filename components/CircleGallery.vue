<script setup lang="ts">
import { ref } from 'vue';

const imageSrc1 = ref('https://picsum.photos/id/204/200/300');
const imageSrc2 = ref('https://picsum.photos/id/203/200/300');
const imageSrc3 = ref('https://picsum.photos/id/229/200/300');
const imageSrc4 = ref('https://picsum.photos/id/219/200/300');
</script>

<template>
    <div class="flex justify-center items-center h-screen bg-gray-100">
        <div class="relative w-96 h-96">
            <!-- Resim 1 -->
            <div class="absolute bottom-0 max-sm:left-[200px] lg:right-0 w-64 h-64 bg-cover bg-center top-[270px] image-container image-container-1"
                :style="{ backgroundImage: 'url(' + imageSrc1 + ')' }">
                <!-- Overlay -->
                <div class="absolute inset-0 bg-black opacity-50 transition-opacity"></div>
            </div>

            <!-- Resim 2 -->
            <div class="absolute top-0 max-sm:left-[200px] lg:right-0 w-64 h-64 bg-cover bg-center image-container image-container-2"
                :style="{ backgroundImage: 'url(' + imageSrc2 + ')' }">
                <!-- Overlay -->
                <div class="absolute inset-0 bg-black opacity-50 transition-opacity"></div>
            </div>

            <!-- Resim 3 -->
            <div class="absolute bottom-0 right-[200px] lg:right-[270px] w-64 h-64 bg-cover bg-center top-[270px] image-container image-container-3"
                :style="{ backgroundImage: 'url(' + imageSrc3 + ')' }">
                <!-- Overlay -->
                <div class="absolute inset-0 bg-black opacity-50 transition-opacity"></div>
            </div>

            <!-- Resim 4 -->
            <div class="absolute top-0 right-[200px] lg:right-[270px] w-64 h-64 bg-cover bg-center image-container image-container-4"
                :style="{ backgroundImage: 'url(' + imageSrc4 + ')' }">
                <!-- Overlay -->
                <div class="absolute inset-0 bg-black opacity-50 transition-opacity"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.image-container {
    transition: clip-path 0.3s ease-in-out, width 0.3s ease-in-out, height 0.3s ease-in-out, z-index 0s;
}

.image-container-1:hover {
    clip-path: circle(50%);
    width: 430px;
    height: 430px;
    z-index: 10;
    right: -60px;
}

.image-container-1 {
    clip-path: ellipse(140px 140px at 20% 20%);
    width: 256px;
    height: 256px;
    z-index: 1;
}

.image-container-2:hover {
    clip-path: circle(50%);
    width: 430px;
    height: 430px;
    z-index: 10;
    top: -60px;
    right: -60px;
}

.image-container-2 {
    clip-path: ellipse(140px 140px at 20% 80%);
    width: 256px;
    height: 256px;
    z-index: 1;
}

.image-container-3:hover {
    clip-path: circle(50%);
    width: 430px;
    height: 430px;
    z-index: 10;
}

.image-container-3 {
    clip-path: ellipse(140px 140px at 80% 20%);
    width: 256px;
    height: 256px;
    z-index: 1;
}

.image-container-4:hover {
    clip-path: circle(50%);
    width: 430px;
    height: 430px;
    z-index: 10;
    top: -60px;
}

.image-container-4 {
    clip-path: ellipse(140px 140px at 80% 80%);
    width: 256px;
    height: 256px;
    z-index: 1;
}

.transition-opacity {
    transition: opacity 0.3s ease-in-out;
}

.image-container:hover .absolute.inset-0 {
    opacity: 0;
}

@media (max-width: 768px) {
    .image-container-1:hover,
    .image-container-2:hover,
    .image-container-3:hover,
    .image-container-4:hover {
        clip-path: none;
        width: 256px;
        height: 256px;
        z-index: 1;
        right: 0;
        top: 0;
    }

    .image-container-1,
    .image-container-2,
    .image-container-3,
    .image-container-4 {
        pointer-events: none;
    }
}


</style>
