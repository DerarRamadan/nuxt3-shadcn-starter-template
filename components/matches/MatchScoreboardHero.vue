<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from '#imports';

const { t } = useI18n();

interface Team {
  name: string;
  logo: string;
}

interface MatchDetails {
  id: string;
  status: 'Finished' | 'Upcoming' | 'Live';
  liveMinute?: number | null;
  homeTeam: Team;
  awayTeam: Team;
  score?: string | null; // e.g., "2 - 1" or null if upcoming
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  competition: string;
}

const props = defineProps<{ match: MatchDetails }>();

const formattedDate = computed(() => {
  try {
    return new Date(props.match.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  } catch (e) {
    return props.match.date;
  }
});

const statusText = computed(() => {
  switch (props.match.status) {
    case 'Finished':
      return t('matches.status.finished');
    case 'Upcoming':
      return t('matches.status.upcoming');
    case 'Live':
      return props.match.liveMinute ? `${t('matches.status.live')} ${props.match.liveMinute}'` : t('matches.status.live');
    default:
      return '';
  }
});

const statusClass = computed(() => {
  switch (props.match.status) {
    case 'Finished': return 'bg-gray-600';
    case 'Upcoming': return 'bg-primary';
    case 'Live': return 'bg-red-600 animate-pulse';
    default: return 'bg-gray-500';
  }
});

</script>

<template>
  <section class="bg-gradient-to-b from-gray-900 to-gray-800 py-12 md:py-20 relative overflow-hidden">
    <!-- Optional: Add background image/graphic here -->
    <!-- <div class="absolute inset-0 bg-[url('https://via.placeholder.com/1920x400/000000/333333?text=Stadium+Blur')] bg-cover bg-center opacity-10"></div> -->

    <div class="container mx-auto px-4 relative z-10">
      <div class="flex flex-col items-center text-center">

        <!-- Teams and Score/Date -->
        <div class="flex items-center justify-center gap-6 md:gap-12 mb-6">
          <!-- Home Team -->
          <div class="flex flex-col items-center w-24 md:w-32">
            <img :src="match.homeTeam.logo" :alt="match.homeTeam.name + ' logo'" class="w-20 h-20 md:w-28 md:h-28 rounded-full p-1 bg-white mb-3 object-contain shadow-lg">
            <h2 class="text-lg md:text-2xl font-bold text-white">{{ match.homeTeam.name }}</h2>
          </div>

          <!-- Score or VS/Time -->
          <div class="flex flex-col items-center mx-4">
            <div v-if="match.status === 'Finished' && match.score" class="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
              {{ match.score }}
            </div>
            <div v-else class="text-center">
              <div class="text-2xl md:text-4xl font-bold text-gray-300 mb-1">{{ match.time }}</div>
              <div class="text-sm md:text-base text-gray-400">{{ formattedDate.split(',')[0] }}</div> <!-- Just weekday -->
            </div>
          </div>

          <!-- Away Team -->
          <div class="flex flex-col items-center w-24 md:w-32">
            <img :src="match.awayTeam.logo" :alt="match.awayTeam.name + ' logo'" class="w-20 h-20 md:w-28 md:h-28 rounded-full p-1 bg-white mb-3 object-contain shadow-lg">
            <h2 class="text-lg md:text-2xl font-bold text-white">{{ match.awayTeam.name }}</h2>
          </div>
        </div>

        <!-- Competition and Status -->
        <div class="flex items-center justify-center space-x-4">
          <span class="text-gray-300 text-sm md:text-base">{{ match.competition }}</span>
          <span :class="['text-white px-3 py-1 rounded-full text-xs md:text-sm font-semibold', statusClass]">
            {{ statusText }}
          </span>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* Add animation if needed */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>