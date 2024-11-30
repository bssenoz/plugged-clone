<template>
    <div class="section1 relative z-10 w-full h-auto mask-container overflow-y-scroll">
        <div class="text-4xl text-gray-200 text-bold text-center mt-20">Featured Shows</div>


        <div class="content-container flex flex-col  space-y-8">
            <div v-for="(content, index) in contents" :key="index" class="w-full px-4 flex flex-col "
            @touchstart="setActiveIndex(content)">
                <img :key="content.contentImage" :src="content.contentImage || '/image/default-keyvisual.webp'"
                    alt="Default Keyvisual" class=" object-cover z-10 mask-image w-[350px] h-[350px]" :style="{
                        maskImage: `url(${content.maskImage || '/image/mask-0.webp'})`,
                        WebkitMaskImage: `url(${content.maskImage || '/image/mask-0.webp'})`
                    }" />

                <p :style="{ color: content.mobileColor || '#5252c6' }"
                    class="font-medium text-sm tracking-wider mb-3"
                    :key="hoveredContent ? `header-${content.id}` : 'header-default'">
                    CORPORATE EVENT
                </p>

                <div class="flex float-left text-left text-gray-200">
                    <h3 class="text-3xl font-light" v-html="content.title"></h3>
                </div>

                <p class="text-gray-200 text-sm tracking-wider mt-6 w-5/6">
                    {{ content?.text }}
                </p>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { contents } from '../assets/text.js'

const emit = defineEmits(['updateColor']);
const activeIndex = ref(null);

const setActiveIndex = (index) => {
    activeIndex.value = index;
    emit('hoveredContent', activeIndex.value );
};
</script>

<style scoped>
#cursor {
    position: fixed;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    pointer-events: none;
    z-index: 1000;
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease, transform 0.1s ease-out, background-color 0.3s;
}

#cursor .cursor-arrow {
    font-size: 1.5rem;
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
}

#cursor.grow {
    width: 50px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.4);
}

#cursor.grow .cursor-arrow {
    opacity: 1;
}

.content-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 2rem;
}

.mask-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.mask-image {
    mask-image: url('/image/mask-0.webp');
    -webkit-mask-image: url('/image/mask-0.webp');
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
</style>
