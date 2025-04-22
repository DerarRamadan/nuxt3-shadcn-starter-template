<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from '#imports';

const { t } = useI18n();

defineProps<{ activeTab: string }>();
const emit = defineEmits(['update:activeTab']);

const tabs = ref([
  { key: 'fixtures', labelKey: 'matches.filters.fixtures' },
  { key: 'results', labelKey: 'matches.filters.results' },
  { key: 'standings', labelKey: 'matches.filters.standings' },
]);

// Mock competition filter data
const competitions = ref([
  { key: 'all', labelKey: 'matches.competitions.all' },
  { key: 'league', labelKey: 'matches.competitions.league' },
  { key: 'cup', labelKey: 'matches.competitions.cup' },
]);
const selectedCompetition = ref('all');

const selectTab = (tabKey: string) => {
  emit('update:activeTab', tabKey);
};
</script>

<template>
  <section class="bg-gray-900 py-4 border-b border-gray-800">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <!-- Main Filter Tabs -->
        <div class="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="selectTab(tab.key)"
            :class="[
              'px-4 py-2 rounded-full text-white hover:bg-primary/80 transition-colors whitespace-nowrap !rounded-full',
              activeTab === tab.key ? 'bg-primary' : 'bg-gray-800'
            ]"
          >
            {{ t(tab.labelKey) }}
          </button>
        </div>

        <!-- Additional Filters (Example: Competition Dropdown) -->
        <div class="flex items-center space-x-3 w-full md:w-auto">
          <div class="competition-selector relative">
            <button class="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-button text-white hover:bg-gray-700 transition-colors !rounded-button whitespace-nowrap">
              <span>{{ t(competitions.find(c => c.key === selectedCompetition)?.labelKey || '') }}</span>
              <div class="w-5 h-5 flex items-center justify-center">
                <i class="ri-arrow-down-s-line"></i>
              </div>
            </button>
            <div class="competition-dropdown absolute top-full right-0 mt-1 bg-gray-800 border border-gray-700 rounded-md overflow-hidden z-50 w-48 shadow-lg hidden">
              <a
                v-for="comp in competitions"
                :key="comp.key"
                href="#"
                @click.prevent="selectedCompetition = comp.key"
                class="block px-4 py-2 text-white hover:bg-primary/80 transition-colors"
                :class="{ 'bg-primary': selectedCompetition === comp.key }"
              >
                {{ t(comp.labelKey) }}
              </a>
            </div>
          </div>
          <!-- Add Date Picker if needed, similar structure -->
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Mimic dropdown visibility from HTML */
.competition-selector:hover .competition-dropdown {
  display: block;
}
.competition-dropdown {
    background-color: #1f2937; /* bg-gray-800 */
    border-color: #374151; /* border-gray-700 */
}
.competition-dropdown a:hover {
    background-color: rgba(49, 118, 255, 0.8); /* bg-primary/80 */
}
.competition-dropdown a.bg-primary {
    background-color: #3176FF; /* bg-primary */
}

/* Ensure horizontal scroll on smaller screens */
.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}
.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #3176FF;
  border-radius: 2px;
}
</style>