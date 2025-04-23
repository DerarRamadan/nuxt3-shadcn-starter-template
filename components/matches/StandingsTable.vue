<script setup lang="ts">
import { useI18n } from '#imports';

const { t } = useI18n();

interface StandingRow {
  rank: number;
  team: string;
  p: number; // Played
  w: number; // Wins
  d: number; // Draws
  l: number; // Losses
  gd: number; // Goal Difference
  pts: number; // Points
}

defineProps<{ standings: StandingRow[] }>();

// Assuming 'Al-Olympi' is the name to highlight
const clubNameToHighlight = 'Al-Olympi';

</script>

<template>
  <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
    <h3 class="text-xl font-semibold p-4 border-b border-gray-700">{{ t('matches.standings.title') }}</h3>
    <div class="overflow-x-auto">
      <table class="w-full min-w-[600px] text-sm text-start text-gray-300">
        <thead class="text-xs text-gray-400 uppercase bg-gray-700">
          <tr>
            <th scope="col" class="px-4 py-3 text-center">#</th>
            <th scope="col" class="px-6 py-3">{{ t('matches.standings.team') }}</th>
            <th scope="col" class="px-3 py-3 text-center">{{ t('matches.standings.played') }}</th>
            <th scope="col" class="px-3 py-3 text-center">{{ t('matches.standings.won') }}</th>
            <th scope="col" class="px-3 py-3 text-center">{{ t('matches.standings.drawn') }}</th>
            <th scope="col" class="px-3 py-3 text-center">{{ t('matches.standings.lost') }}</th>
            <th scope="col" class="px-3 py-3 text-center">{{ t('matches.standings.goalDifference') }}</th>
            <th scope="col" class="px-4 py-3 text-center font-bold">{{ t('matches.standings.points') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in standings"
            :key="row.rank"
            class="border-b border-gray-700 hover:bg-gray-700/50"
            :class="{ 'bg-primary/10 font-semibold text-white': row.team === clubNameToHighlight }"
          >
            <td class="px-4 py-3 text-center">{{ row.rank }}</td>
            <td class="px-6 py-3 whitespace-nowrap">
              <!-- Add team logo here if available -->
              {{ row.team }}
            </td>
            <td class="px-3 py-3 text-center">{{ row.p }}</td>
            <td class="px-3 py-3 text-center">{{ row.w }}</td>
            <td class="px-3 py-3 text-center">{{ row.d }}</td>
            <td class="px-3 py-3 text-center">{{ row.l }}</td>
            <td class="px-3 py-3 text-center">{{ row.gd > 0 ? '+' : '' }}{{ row.gd }}</td>
            <td class="px-4 py-3 text-center font-bold">{{ row.pts }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="p-4 text-center border-t border-gray-700">
      <a href="#" class="text-primary hover:underline text-sm font-medium">{{ t('matches.standings.viewFull') }}</a>
    </div>
  </div>
</template>

<style scoped>
/* Highlight row style */
.bg-primary\/10 {
  background-color: rgba(49, 118, 255, 0.1);
}
</style>