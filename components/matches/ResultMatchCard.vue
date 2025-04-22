<script setup lang="ts">
import { computed } from 'vue';
import { useI18n, useLocalePath } from '#imports';
import { CalendarDays, Film, FileText } from 'lucide-vue-next'; // Using lucide icons

const { t } = useI18n();
const localePath = useLocalePath();

interface Team {
  name: string;
  logo: string;
}

interface Result {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  score: string; // e.g., "2 - 1"
  competition: string;
  date: string; // YYYY-MM-DD
}

const props = defineProps<{ result: Result }>();

const formattedDate = computed(() => {
  try {
    return new Date(props.result.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  } catch (e) {
    return props.result.date;
  }
});

</script>

<template>
  <div class="match-card bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
    <div class="bg-gray-900 px-4 py-3 flex justify-between items-center border-b border-gray-700">
      <div class="flex items-center">
        <span class="match-status finished bg-gray-600 text-white px-2 py-1 rounded text-xs font-semibold">{{ t('matches.status.finished') }}</span>
        <span class="text-white ml-3 text-sm">{{ result.competition }}</span>
      </div>
      <span class="text-gray-400 text-sm flex items-center">
        <CalendarDays class="w-4 h-4 mr-1.5" />
        {{ formattedDate }}
      </span>
    </div>
    <div class="p-6">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- Score -->
        <div class="flex items-center justify-center flex-grow gap-4 md:gap-6">
          <div class="flex flex-col items-center text-center w-20 md:w-24">
            <img :src="result.homeTeam.logo" :alt="result.homeTeam.name + ' logo'" class="w-14 h-14 md:w-16 md:h-16 rounded-full p-1 bg-white mb-2 object-contain">
            <span class="text-white font-semibold text-sm md:text-base">{{ result.homeTeam.name }}</span>
          </div>
          <div class="text-3xl md:text-4xl font-bold text-white px-2">{{ result.score }}</div>
          <div class="flex flex-col items-center text-center w-20 md:w-24">
            <img :src="result.awayTeam.logo" :alt="result.awayTeam.name + ' logo'" class="w-14 h-14 md:w-16 md:h-16 rounded-full p-1 bg-white mb-2 object-contain">
            <span class="text-white font-semibold text-sm md:text-base">{{ result.awayTeam.name }}</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center space-x-3 mt-4 md:mt-0">
          <button class="bg-secondary hover:bg-secondary/90 text-white font-bold py-2 px-4 rounded-button !rounded-button text-sm whitespace-nowrap transition-colors flex items-center">
            <Film class="w-4 h-4 mr-1" />
            {{ t('matches.actions.highlights') }}
          </button>
          <NuxtLink :to="localePath(`/matches/${result.id}?tab=summary`)" class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-button !rounded-button text-sm whitespace-nowrap transition-colors flex items-center">
            <FileText class="w-4 h-4 mr-1" />
            {{ t('matches.actions.matchReport') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.match-status.finished {
  background-color: #4b5563; /* bg-gray-600 */
}
</style>