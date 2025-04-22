<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from '#imports';

const { t } = useI18n();

defineProps<{ activeTab: string }>();
const emit = defineEmits(['update:activeTab']);

const tabs = ref([
  { key: 'summary', labelKey: 'matches.tabs.summary' },
  { key: 'stats', labelKey: 'matches.tabs.stats' },
  { key: 'lineups', labelKey: 'matches.tabs.lineups' },
  { key: 'highlights', labelKey: 'matches.tabs.highlights' },
]);

const selectTab = (tabKey: string) => {
  emit('update:activeTab', tabKey);
};
</script>

<template>
  <div class="border-b border-gray-700 mb-8">
    <nav class="-mb-px flex space-x-6 overflow-x-auto px-1" aria-label="Tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="selectTab(tab.key)"
        :class="[
          'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors',
          activeTab === tab.key
            ? 'border-primary text-primary'
            : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500',
        ]"
      >
        {{ t(tab.labelKey) }}
      </button>
    </nav>
  </div>
</template>

<style scoped>
/* Custom scrollbar for tabs if needed */
.overflow-x-auto::-webkit-scrollbar {
  height: 2px;
}
.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #3176FF; /* primary color */
  border-radius: 1px;
}
</style>