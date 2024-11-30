<template>
    <div
        class="overflow-x-auto overflow-y-scroll max-h-[100vh] px-6 py-4 flex justify-center max-w-[1200px] mx-auto 3xl:max-w-[1700px] scrollbar-hidden flex-col">
        <div class="text-6xl 4xl:text-8xl text-gray-300 text-center font-bold lg:mt-48 xl:mt-[60vh] 4xl:mt-[15vh]">All
            Shows</div>
        <table class="min-w-full text-left table-auto mt-16 mb-16">
            <thead class="text-gray-500 border-b border-gray-600 font-extralight text-sm 4xl:text-xl">
                <tr>
                    <th class="px-4 py-2 w-[200px] 4xl:w-[300px]">YEAR</th>
                    <th class="px-4 py-2 w-[270px] 4xl:w-[370px]">SHOW</th>
                    <th class="px-4 py-2 w-[250px] 4xl:w-[350px]">LOCATION</th>
                    <th class="px-4 py-2 w-[200px] 4xl:w-[300px]">TYPE</th>
                    <th class="px-4 py-2"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(event, index) in events" :key="index" class="text-gray-300" @mouseover="hoveredRow = index"
                    @mouseleave="hoveredRow = null" :class="{ 'border-b border-gray-600': isLastInGroup(index) }">

                    <td v-if="index === 0 || events[index].year !== events[index - 1].year"
                        class="px-4 py-2 text-left text-sm 4xl:text-lg">
                        {{ event.year }}
                    </td>
                    <td v-else class="px-4 py-2"></td>
                    <td :class="{
                        'translate-x-8': hoveredRow === index,
                        'border-b border-gray-600': index !== events.length - 1
                    }"
                        class="px-4 py-2 text-left transition-transform duration-300 cursor-pointer text-sm 4xl:text-lg">
                        {{ event.show }}
                    </td>
                    <td :class="{
                        'translate-x-8': hoveredRow === index,
                        'border-b border-gray-600': index !== events.length - 1
                    }"
                        class="px-4 py-2 text-left transition-transform duration-300 cursor-pointer text-sm 4xl:text-lg">
                        {{ event.location }}
                    </td>

                    <td :class="{
                        'translate-x-8': hoveredRow === index,
                        'border-b border-gray-600': index !== events.length - 1
                    }"
                        class="px-4 py-2 text-left transition-transform duration-300 cursor-pointer text-sm 4xl:text-lg">
                        {{ event.type }}
                    </td>

                    <td :class="{
                        'border-b border-gray-600': index !== events.length - 1
                    }"
                        class="px-4 py-2 text-left transition-transform duration-300 cursor-pointer text-sm 4xl:text-lg">
                        <button v-if="event.status"
                            class="px-4 py-2 bg-transparent border border-gray-300 rounded-md cursor-pointer focus:outline-none uppercase text-sm float-right">
                            {{ event.status }}
                        </button>
                    </td>
                </tr>
            </tbody>

        </table>
    </div>
    <div v-show="showCursor" class="custom-cursor" :style="{ top: `${cursorY}px`, left: `${cursorX}px` }"></div>
    <div v-if="hoveredRow !== null" :class="['tooltip-video', { show: hoveredRow !== null }]"
        :style="{ top: `${cursorY - 60}px`, left: `${cursorX + 100}px`, border: '1px solid', borderColor: events[hoveredRow].videoColor }">

        <div v-if="videoLoading"
            :style="{ background: events[hoveredRow].videoColor, border: '1px solid', borderColor: events[hoveredRow].videoColor }"
            class="loading-video"></div>

        <video v-else autoplay muted loop :src="events[hoveredRow].video" @loadeddata="onVideoLoaded"></video>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { events } from '../assets/text.js'

const emit = defineEmits(['updateColor']);

const hoveredRow = ref(null);
const cursorX = ref(0)
const cursorY = ref(0)
const showCursor = ref(true)
const videoLoading = ref(true)

onMounted(() => {
    document.body.style.background = 'radial-gradient(50% 155% at 70% 55%, rgb(1, 1, 126) 0%, rgb(4, 2, 50) 100%)';
    window.addEventListener('mousemove', moveCursor);
});

onUnmounted(() => {
    window.removeEventListener('mousemove', moveCursor);
});

const moveCursor = (event) => {
    cursorX.value = event.clientX + 20;
    cursorY.value = event.clientY - 20;
};

watch(hoveredRow, (newValue) => {
    if (newValue !== null) {
        emit('updateColor', events.value[newValue].videoColor);
        document.body.style.background = events.value[newValue].color;
        setTimeout(() => {
            videoLoading.value = false;
        }, 500);
    } else {
        emit('updateColor', null);
        document.body.style.background = 'radial-gradient(50% 155% at 70% 55%, rgb(1, 1, 126) 0%, rgb(4, 2, 50) 100%)';
        videoLoading.value = true;
    }
});

const onVideoLoaded = () => {
    videoLoading.value = false;
};

const isLastInGroup = (index) => {
    return (
        index !== events.value.length - 1 &&
        events.value[index].year !== events.value[index + 1]?.year
    );
};
</script>

<style scoped>
.scrollbar-hidden::-webkit-scrollbar {
    display: none;
}

.scrollbar-hidden {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.tooltip-video {
    position: absolute;
    width: 200px;
    height: 120px;
    pointer-events: none;
    z-index: 1000;
    transform: translate(-50%, -50%);
    overflow: hidden;
}

@media (min-width: 2048px) {
    .tooltip-video {
        width: 300px;
        height: 220px;
    }
}

.tooltip-video video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.loading-video {
    position: absolute;
    width: 200px;
    height: 120px;
    z-index: 1000;
}

@media (min-width: 2048px) {
    .loading-video {
        width: 300px;
        height: 220px;
    }
}

table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    padding: 1rem;
}

th {
    text-align: left;
}

td {
    text-align: left;
}

.translate-x-8 {
    transform: translateX(32px);
}

.transition-transform {
    transition: transform 0.5s ease-in-out;
}

.overflow-x-auto {
    width: 100%;
    overflow-x: auto;
}

.custom-cursor {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: top 0.1s, left 0.1s;
}
</style>
