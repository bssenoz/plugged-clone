<template>
  <div class="overflow-x-auto overflow-y-scroll max-h-[100vh] px-6 py-4 flex justify-center scrollbar-hidden flex-col">
    <div class="text-3xl text-gray-300 text-center font-bold mt-[700px]">All Shows</div>

    <div v-for="(groupedEvents, year) in groupedEventsByYear" :key="year" class="mt-6" >
      <div class="text-lg text-gray-600 font-bold">{{ year }}</div>

      <table class="min-w-full text-left table-auto mb-8">
        <tbody>
          <tr v-for="(event, index) in groupedEvents" :key="index" class="text-gray-300" @mouseover="hoveredRow = index"
            @mouseleave="hoveredRow = null">
            <td :class="{
              'border-b border-gray-600': index !== groupedEvents.length - 1
            }" class="px-4 py-2 text-left transition-transform duration-300 cursor-pointer text-sm">
              {{ event.show }}
            </td>
            <td :class="{
              'border-b border-gray-600': index !== groupedEvents.length - 1
            }" class="px-4 py-2 text-left transition-transform duration-300 cursor-pointer text-sm">
              <button v-if="event.status"
                class="px-4 py-2 bg-transparent border border-gray-300 rounded-md cursor-pointer focus:outline-none uppercase text-sm float-right">
                {{ event.status }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { events } from '../assets/text.js';

const hoveredRow = ref(null);

const groupedEventsByYear = computed(() => {
  const grouped = {};

  events.value.forEach((event) => {
    if (!grouped[event.year]) {
      grouped[event.year] = [];
    }
    grouped[event.year].push(event);
  });

  const sortedYears = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a);

  const sortedGroupedEvents = {};
  sortedYears.forEach((year) => {
    sortedGroupedEvents[year] = grouped[year];
  });

  return sortedGroupedEvents;
});
</script>

<style scoped>
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.table-auto {
  width: 100%;
  border-collapse: collapse;
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

.transition-transform {
  transition: transform 0.5s ease-in-out;
}

.overflow-x-auto {
  width: 100%;
  overflow-x: auto;
}
</style>