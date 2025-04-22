<script setup lang="ts">
import { useI18n } from '#imports';

const { t } = useI18n();

interface LineupData {
  home: { starting: string[]; subs: string[] };
  away: { starting: string[]; subs: string[] };
}

defineProps<{ lineups: LineupData | null | undefined }>();

</script>

<template>
  <div>
    <h3 class="text-xl font-semibold mb-6">{{ t('matches.lineups.title') }}</h3>
    <div v-if="lineups" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Home Team Lineup -->
      <div>
        <h4 class="text-lg font-medium mb-4 text-white border-b border-gray-700 pb-2">{{ t('matches.location.home') }} {{ t('matches.lineups.startingXI') }}</h4>
        <ul class="space-y-2 text-gray-300">
          <li v-for="(player, index) in lineups.home.starting" :key="`home-start-${index}`" class="flex items-center">
            <!-- Extract number if present, e.g., "1. GK Name" -->
            <span class="w-6 text-right mr-3 text-gray-400">{{ player.split('.')[0] }}.</span>
            <span>{{ player.split('.').slice(1).join('.').trim() }}</span>
          </li>
        </ul>
        <h5 class="text-md font-medium mt-6 mb-3 text-gray-200">{{ t('matches.lineups.substitutes') }}</h5>
        <ul class="space-y-1 text-gray-400 text-sm">
          <li v-for="(player, index) in lineups.home.subs" :key="`home-sub-${index}`" class="flex items-center">
            <span class="w-6 text-right mr-3">{{ player.split('.')[0] }}.</span>
            <span>{{ player.split('.').slice(1).join('.').trim() }}</span>
          </li>
        </ul>
      </div>

      <!-- Away Team Lineup -->
      <div>
        <h4 class="text-lg font-medium mb-4 text-white border-b border-gray-700 pb-2">{{ t('matches.location.away') }} {{ t('matches.lineups.startingXI') }}</h4>
        <ul class="space-y-2 text-gray-300">
          <li v-for="(player, index) in lineups.away.starting" :key="`away-start-${index}`" class="flex items-center">
            <span class="w-6 text-right mr-3 text-gray-400">{{ player.split('.')[0] }}.</span>
            <span>{{ player.split('.').slice(1).join('.').trim() }}</span>
          </li>
        </ul>
        <h5 class="text-md font-medium mt-6 mb-3 text-gray-200">{{ t('matches.lineups.substitutes') }}</h5>
        <ul class="space-y-1 text-gray-400 text-sm">
          <li v-for="(player, index) in lineups.away.subs" :key="`away-sub-${index}`" class="flex items-center">
            <span class="w-6 text-right mr-3">{{ player.split('.')[0] }}.</span>
            <span>{{ player.split('.').slice(1).join('.').trim() }}</span>
          </li>
        </ul>
      </div>
    </div>
    <p v-else class="text-gray-400">{{ t('matches.lineups.unavailable') }}</p>
  </div>
</template>

<style scoped>
.text-xl {
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.grid {
  gap: 2rem;
}

.text-lg {
  color: #ffffff;
  font-weight: 500;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #2d3748;
  margin-bottom: 1rem;
}

.text-md {
  color: #e2e8f0;
  font-weight: 500;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.text-gray-300 {
  color: #e2e8f0;
}

.text-gray-400 {
  color: #a0aec0;
}

.text-gray-200 {
  color: #edf2f7;
}

.space-y-2 > li {
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(45, 55, 72, 0.5);
}

.space-y-1 > li {
  padding: 0.25rem 0;
}

.w-6 {
  min-width: 1.5rem;
  text-align: right;
  margin-right: 0.75rem;
}
</style>