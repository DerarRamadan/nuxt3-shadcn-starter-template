<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from '#imports';

const { t } = useI18n();

interface StatsData {
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
  yellowCards: { home: number; away: number };
  redCards: { home: number; away: number };
}

const props = defineProps<{ stats: StatsData | null | undefined }>();

const statItems = computed(() => {
  if (!props.stats) return [];
  return [
    { labelKey: 'matches.stats.possession', home: props.stats.possession.home, away: props.stats.possession.away, type: 'percentage' },
    { labelKey: 'matches.stats.shots', home: props.stats.shots.home, away: props.stats.shots.away, type: 'number' },
    { labelKey: 'matches.stats.shotsOnTarget', home: props.stats.shotsOnTarget.home, away: props.stats.shotsOnTarget.away, type: 'number' },
    { labelKey: 'matches.stats.corners', home: props.stats.corners.home, away: props.stats.corners.away, type: 'number' },
    { labelKey: 'matches.stats.fouls', home: props.stats.fouls.home, away: props.stats.fouls.away, type: 'number' },
    { labelKey: 'matches.stats.yellowCards', home: props.stats.yellowCards.home, away: props.stats.yellowCards.away, type: 'number' },
    { labelKey: 'matches.stats.redCards', home: props.stats.redCards.home, away: props.stats.redCards.away, type: 'number' },
  ];
});

const calculateWidth = (value: number, total: number): string => {
  if (total === 0) return '50%'; // Avoid division by zero, default to 50%
  return `${(value / total) * 100}%`;
};

</script>

<template>
  <div>
    <h3 class="text-xl font-semibold mb-6">{{ t('matches.stats.title') }}</h3>
    <div v-if="stats" class="space-y-5">
      <div v-for="item in statItems" :key="item.labelKey" class="stat-item">
        <div class="flex justify-between items-center mb-1 px-1">
          <span class="text-white font-medium text-sm">{{ item.home }}{{ item.type === 'percentage' ? '%' : '' }}</span>
          <span class="text-gray-300 text-sm font-medium">{{ t(item.labelKey) }}</span>
          <span class="text-white font-medium text-sm">{{ item.away }}{{ item.type === 'percentage' ? '%' : '' }}</span>
        </div>
        <div class="flex w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            class="bg-primary h-full rounded-l-full transition-all duration-500 ease-out"
            :style="{ width: calculateWidth(item.home, item.home + item.away) }"
          ></div>
          <div
            class="bg-gray-500 h-full rounded-r-full transition-all duration-500 ease-out"
            :style="{ width: calculateWidth(item.away, item.home + item.away) }"
          ></div>
        </div>
      </div>
    </div>
    <p v-else class="text-gray-400">{{ t('matches.stats.unavailable') }}</p>
  </div>
</template>

<style scoped>
/* Add any specific styles for stats if needed */
.stat-item {
  /* Add potential hover effects or subtle animations if desired */
}
</style>