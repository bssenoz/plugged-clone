<template>
    <div class="relative">
        <div
            class="section1 relative  z-10 w-1/3 h-auto mask-container pl-48 ">
            <div v-for="(content, index) in contents" :key="index"
                class="flex-shrink-0 w-[calc(50%-0.5rem)] h-56 flex items-start text-white 4xl:mt-20 cursor-pointer"
                @mouseover="handleMouseOver(content)" @mouseleave="handleMouseLeave(content)" :class="{
                    'opacity-25': hoveredContent && hoveredContent.number !== content.number,
                    'opacity-100': hoveredContent && hoveredContent.number === content.number,
                    'transition-opacity': true
                }">
                <div class="flex items-start cursor-pointer z-50">
                    <span class="text-sm md:text-lg lg:text-2xl font-light mr-4">{{ content.number }}</span>
                    <h3 class="text-lg md:text-4xl lg:text-5xl 4xl:text-8xl font-light" v-html="content.title"></h3>
                </div>
            </div>
            <transition name="fade" mode="out-in">
                <img :key="hoveredContent?.contentImage"
                    :src="hoveredContent?.contentImage || '/image/default-keyvisual.webp'" alt="Default Keyvisual"
                    class="absolute object-cover z-10 mask-image w-[300px] h-[300px] top-[10%] lg:top-0 4xl:top-[-1rem] left-[10%] lg:left-[35%] md:w-[700px] md:h-[700px] 4xl:w-[1200px] 4xl:h-[1200px]"
                    :style="{
                        maskImage: `url(${hoveredContent?.maskImage || '/image/mask-0.webp'})`,
                        WebkitMaskImage: `url(${hoveredContent?.maskImage || '/image/mask-0.webp'})`
                    }" />
            </transition>
    
            <transition name="top-to-bottom" mode="out-in">
                <div v-if="hoveredContent?.secondaryImage"
                    class="absolute right-[5%] top-[200px] lg:right-[25%] top-[100px] w-[700px] h-[700px]  4xl:w-[800px] 4xl:h-[800px] z-20">
                    <img :src="hoveredContent.secondaryImage" :key="hoveredContent?.secondaryImage" alt="Secondary Image"
                        class="object-cover w-full h-full" />
                </div>
            </transition>
    
            <transition name="bottom-to-top" mode="out-in">
                <div v-if="hoveredContent?.tertiaryImage"
                    class="absolute absolute right-[10%] top-[100px] lg:right-[30%] lg:top-[50px] w-[700px] h-[700px] 4xl:right-[45%] 4xl:w-[800px] 4xl:h-[800px] z-20">
                    <img :src="hoveredContent.tertiaryImage" :key="hoveredContent?.tertiaryImage" alt="Tertiary Image"
                        class="object-cover w-full h-full" />
                </div>
            </transition>
    
        </div>
    
        <div class="absolute bottom-48 4xl:bottom-24 w-[400px] px-4 py-6 right-0">
            <transition name="slide-up" mode="out-in">
                <p :style="{ color: hoveredContent?.color || '#5252c6' }"
                    class="font-medium text-sm tracking-wider mb-3 4xl:text-lg"
                    :key="hoveredContent ? `header-${hoveredContent.id}` : 'header-default'">
                    {{ hoveredContent ? 'CORPORATE EVENT' : 'PLUGGED LIVE SHOWS' }}
                </p>
            </transition>
            <transition name="slide-up" mode="out-in">
                <p class="text-gray-200 text-sm tracking-wider 4xl:text-lg"
                    :key="hoveredContent ? `content-${hoveredContent.id}` : 'content-default'">
                    {{ hoveredContent?.text || '26 Shows with over 25M+ visitors across 18 different countries.' }}
                </p>
            </transition>
        </div>

    </div>


</template>

<script setup>
import { ref } from 'vue';
import { contents } from '../assets/text.js'

const emit = defineEmits(['updateColor']);

const hoveredContent = ref(null);

const handleMouseOver = (content) => {
    hoveredContent.value = content;
    emit('hoveredContent', hoveredContent.value);
    const cursor = document.getElementById('cursor');
    cursor?.classList.add('grow');
};

const handleMouseLeave = () => {
    hoveredContent.value = null;
    emit('hoveredContent', hoveredContent.value);
    const cursor = document.getElementById('cursor');
    cursor?.classList.remove('grow');
};

</script>

<style scoped>

.mask-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.mask-image {
    mask-image: url('/image/mask-0.webp');
    -webkit-mask-image: url('/image/mask-0.webp');
    /* For Safari */
    mask-size: cover;
    -webkit-mask-size: cover;
    object-fit: cover;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease, transform 0.2s ease;
}

.fade-enter {
    opacity: 0;
    transform: scale(.9);
}

.fade-leave-to {
    opacity: 0;
    transform: scale(1.1);
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-up-enter-from {
    transform: translateY(20px);
    opacity: 0;
}

.slide-up-enter-to {
    transform: translateY(0);
    opacity: 1;
}

.slide-up-leave-from {
    transform: translateY(0);
    opacity: 1;
}

.slide-up-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}

.top-to-bottom-enter-active,
.top-to-bottom-leave-active {
    transition: transform 0.5s ease, opacity 0.2s ease;
}

.top-to-bottom-enter-from {
    transform: translateY(-50px);
    opacity: 0;
}

.top-to-bottom-enter-to {
    transform: translateY(0);
    opacity: 1;
}

.top-to-bottom-leave-from {
    transform: translateY(0);
    opacity: 1;
}

.top-to-bottom-leave-to {
    transform: translateY(50px);
    opacity: 0;
}

.bottom-to-top-enter-active,
.bottom-to-top-leave-active {
    transition: transform 0.5s ease, opacity 0.5s ease;
}

.bottom-to-top-enter-from {
    transform: translateY(50px);
    opacity: 0;
}

.bottom-to-top-enter-to {
    transform: translateY(0);
    opacity: 1;
}

.bottom-to-top-leave-from {
    transform: translateY(0);
    opacity: 1;
}

.bottom-to-top-leave-to {
    transform: translateY(-50px);
    opacity: 0;
}
</style>