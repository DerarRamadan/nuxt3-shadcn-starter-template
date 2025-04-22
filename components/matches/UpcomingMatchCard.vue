<script setup lang="ts">
import { computed } from 'vue';
import { useI18n, useLocalePath } from '#imports';
import { Calendar, Clock, MapPin, Ticket } from 'lucide-vue-next'; // Using lucide icons

const { t } = useI18n();
const localePath = useLocalePath();

interface Team {
  name: string;
  logo: string;
}

interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  competition: string;
  venue: string;
}

const props = defineProps<{ match: Match }>();

const formattedDate = computed(() => {
  // Basic date formatting, consider using a library like date-fns for more robust formatting
  try {
    return new Date(props.match.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
  } catch (e) {
    return props.match.date; // Fallback
  }
});

const formattedTime = computed(() => {
  // Basic time formatting
  return props.match.time; // Assuming time is already in desired format
});

</script>

<template>
  <div class="match-card bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
    <div class="bg-gray-900 px-4 py-3 flex justify-between items-center border-b border-gray-700">
      <div class="flex items-center">
        <span class="match-status upcoming bg-primary text-white px-2 py-1 rounded text-xs font-semibold">{{ t('matches.status.upcoming') }}</span>
        <span class="text-white ml-3 text-sm">{{ match.competition }}</span>
      </div>
      <span class="text-gray-400 text-sm">{{ formattedDate }}</span>
    </div>
    <div class="p-6">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- Teams -->
        <div class="flex items-center justify-center flex-grow gap-4 md:gap-8">
          <div class="flex flex-col items-center text-center w-24">
            <img :src="match.homeTeam.logo" :alt="match.homeTeam.name + ' logo'" class="w-16 h-16 rounded-full p-1 bg-white mb-2 object-contain">
            <span class="text-white font-semibold text-sm md:text-base">{{ match.homeTeam.name }}</span>
            <span class="text-gray-400 text-xs">{{ t('matches.location.home') }}</span>
          </div>
          <div class="text-3xl font-bold text-gray-400">VS</div>
          <div class="flex flex-col items-center text-center w-24">
            <img :src="match.awayTeam.logo" :alt="match.awayTeam.name + ' logo'" class="w-16 h-16 rounded-full p-1 bg-white mb-2 object-contain">
            <span class="text-white font-semibold text-sm md:text-base">{{ match.awayTeam.name }}</span>
            <span class="text-gray-400 text-xs">{{ t('matches.location.away') }}</span>
          </div>
        </div>

        <!-- Match Info & Actions -->
        <div class="flex flex-col items-center md:items-end text-center md:text-right space-y-3 md:w-1/3">
          <div class="flex items-center text-sm text-gray-300">
            <Clock class="w-4 h-4 mr-2 text-primary" />
            <span>{{ formattedTime }} ({{ t('matches.time.local') }})</span>
          </div>
          <div class="flex items-center text-sm text-gray-300">
            <MapPin class="w-4 h-4 mr-2 text-primary" />
            <span>{{ match.venue }}</span>
          </div>
          <div class="flex items-center space-x-3 mt-4">
            <NuxtLink :to="localePath(`/matches/${match.id}`)" class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-button !rounded-button text-sm whitespace-nowrap transition-colors">
              {{ t('matches.actions.matchInfo') }}
            </NuxtLink>
            <button class="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-button !rounded-button text-sm whitespace-nowrap transition-colors flex items-center">
              <Ticket class="w-4 h-4 mr-1" />
              {{ t('matches.actions.buyTickets') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any component-specific styles here */
.match-status.upcoming {
  background-color: #3176FF; /* Ensure primary color */
}
</style>