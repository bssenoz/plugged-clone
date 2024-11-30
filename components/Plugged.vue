<template>
    <header class="text-white p-4 fixed top-0 left-0 w-full z-10">
        <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-2xl font-bold">My Website</h1>
            <nav>
                <ul class="flex space-x-4">
                    <li><a href="#" class="hover:underline">Home</a></li>
                    <li><a href="#" class="hover:underline">About</a></li>
                    <li><a href="#" class="hover:underline">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <swiper :navigation="true" @swiper="onSwiper" class="mySwiper">
        <swiper-slide
            :style="`background: ${hoveredContent?.gradient || 'radial-gradient(50% 155% at 70% 55%, rgb(1, 1, 126) 0%, rgb(4, 2, 50) 100%)'}`">
            <ContentMobile v-if="isMobile && selectedTab == 1" @hoveredContent="handleHoveredContent" />
            <Content v-if="!isMobile && selectedTab == 1" @hoveredContent="handleHoveredContent" />
        </swiper-slide>
        <swiper-slide class="section2">
            <TableMobile v-if="isMobile" />
            <Table @updateColor="handleColorUpdate" v-if="!isMobile" />
        </swiper-slide>

    </swiper>

    <div class="absolute bottom-6 4xl:bottom-12 left-0 w-full flex justify-center py-4 z-10">
        <div class="flex rounded-full border-1 border-blue-600 p-1 hover:border-gray-200 hover:border-2 transition-all duration-300"
            :style="{
                background: selectedTab === 1 ? (hoveredContent?.color || '#01017e') :
                    selectedTab === 2 ? (currentColor || '#01017e') :
                        '#01017e'
            }">
            <button v-for="tab in tabs" :key="tab.id" @click="selectTabs(tab.id)" :class="[
                'px-6 py-2 text-sm 4xl:text-2xl tracking-wider rounded-full transition-all duration-500 ease-in-out ',
                selectedTab === tab.id
                    ? 'bg-gray-100 text-black shadow-lg'
                    : 'text-white hover:bg-blue-700',
            ]">
                {{ tab.name }}
            </button>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import Table from './Table.vue'
import TableMobile from './TableMobile.vue'
import Content from './Content.vue';
import ContentMobile from './ContentMobile.vue';

const selectedTab = ref(1);
const swiperApp = ref(null);
const currentColor = ref('');
const hoveredContent = ref(null);
const isMobile = ref(false);

const tabs = [
    {
        id: 1,
        name: "FEATURED",
    },
    {
        id: 2,
        name: "ALL",
    },
];


const checkScreenWidth = () => {
    isMobile.value = window.innerWidth <= 768;
};
const handleColorUpdate = (color) => {
    currentColor.value = color;
};

const handleHoveredContent = (content) => {
    hoveredContent.value = content;
};

const onSwiper = (swiper) => {
    swiperApp.value = swiper;
};
const selectTabs = (id) => {
    selectedTab.value = id;
    swiperApp.value.slideTo(id - 1);
};

onMounted(() => {
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreenWidth);
});

</script>

<style scoped>
.swiper {
    width: 100%;
    height: 100%;
}

.swiper-slide {
    height: 100vh;
}

::v-deep(.swiper-button-next) {
    display: none;
}

::v-deep(.swiper-button-prev) {
    display: none;
}
</style>