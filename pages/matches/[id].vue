<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import GlobalHeader from '~/components/global/Header.vue';
import GlobalFooter from '~/components/global/Footer.vue';
import { useI18n, useLocalePath, useAsyncData, createError, useHead } from '#imports';
import { ChevronLeft, MapPinLine, CalendarLine, TimeLine, TicketLine, VidiconLine, InformationLine, BarChart2 } from 'lucide-vue-next'; // Import used icons

const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const matchId = computed(() => route.params.id as string);
const activeTab = ref('summary'); // 'summary', 'stats', 'lineups'

// --- Placeholder Data Source (Simulated - Combine match types) ---
const allMatches = ref([
    // Live Match Example
    { id: '101', status: 'finished', competition: 'Champions Cup - Quarter Final', date: 'April 21, 2025', time: 'FT', homeTeam: 'Al-Olympi', homeLogo: 'https://via.placeholder.com/80x80/00439e/ffffff?text=LFC', awayTeam: 'Atletico FC', awayLogo: 'https://via.placeholder.com/80x80/c0392b/ffffff?text=AFC', homeScore: 2, awayScore: 1, venue: 'Olympic Stadium', summaryKey: 'matches.summaryPlaceholder', stats: { possession: {home: 62, away: 38}, shots: {home: 18, away: 9}, onTarget: {home: 7, away: 3}}, lineups: { home: ['Player A', 'Player B'], away: ['Player X', 'Player Y']} },
    // Upcoming Matches
    { id: '102', status: 'upcoming', competition: 'Premier League - Matchday 34', date: 'April 26, 2025', time: '20:00', homeTeam: 'Al-Olympi', homeLogo: 'https://via.placeholder.com/80x80/00439e/ffffff?text=LFC', awayTeam: 'FC Riviera', awayLogo: 'https://via.placeholder.com/80x80/f1c40f/000000?text=FCR', venue: 'Olympic Stadium, Dubai', ticketsAvailable: true, summaryKey: null, stats: null, lineups: null },
    { id: '103', status: 'upcoming', competition: 'National Cup - Semi Final', date: 'May 3, 2025', time: '18:30', homeTeam: 'United SC', homeLogo: 'https://via.placeholder.com/80x80/27ae60/ffffff?text=USC', awayTeam: 'Al-Olympi', awayLogo: 'https://via.placeholder.com/80x80/00439e/ffffff?text=LFC', venue: 'National Stadium', ticketsAvailable: true, summaryKey: null, stats: null, lineups: null },
    // Recent Results
    { id: '105', status: 'finished', competition: 'Premier League - Matchday 33', date: 'April 19, 2025', time: 'FT', homeTeam: 'Al-Olympi', homeLogo: 'https://via.placeholder.com/80x80/00439e/ffffff?text=LFC', awayTeam: 'Sporting Club', awayLogo: 'https://via.placeholder.com/80x80/2ecc71/000000?text=SC', homeScore: 3, awayScore: 1, venue: 'Olympic Stadium', summaryKey: 'matches.summaryPlaceholder', stats: { possession: {home: 55, away: 45}, shots: {home: 15, away: 11}, onTarget: {home: 8, away: 4}}, lineups: { home: ['Player A', 'Player B'], away: ['Player X', 'Player Y']} },
    { id: '106', status: 'finished', competition: 'Champions Cup - Round of 16', date: 'April 16, 2025', time: 'FT', homeTeam: 'Dynamo FC', homeLogo: 'https://via.placeholder.com/80x80/3498db/ffffff?text=DFC', awayTeam: 'Al-Olympi', awayLogo: 'https://via.placeholder.com/80x80/00439e/ffffff?text=LFC', homeScore: 0, awayScore: 2, venue: 'Dynamo Arena', summaryKey: 'matches.summaryPlaceholder', stats: { possession: {home: 48, away: 52}, shots: {home: 8, away: 14}, onTarget: {home: 2, away: 6}}, lineups: { home: ['Player A', 'Player B'], away: ['Player X', 'Player Y']} },
    { id: '107', status: 'finished', competition: 'Premier League - Matchday 32', date: 'April 12, 2025', time: 'FT', homeTeam: 'City FC', homeLogo: 'https://via.placeholder.com/80x80/f39c12/ffffff?text=CFC', awayTeam: 'Al-Olympi', awayLogo: 'https://via.placeholder.com/80x80/00439e/ffffff?text=LFC', homeScore: 1, awayScore: 1, venue: 'City Stadium', summaryKey: 'matches.summaryPlaceholder', stats: { possession: {home: 59, away: 41}, shots: {home: 12, away: 12}, onTarget: {home: 5, away: 5}}, lineups: { home: ['Player A', 'Player B'], away: ['Player X', 'Player Y']} },
]);
// --- End Placeholder ---

// --- Fetch Match Data (Simulated) ---
const { data: match, pending, error } = useAsyncData(
  `match-detail-${matchId.value}`,
  async () => {
    console.log(`[id].vue: Fetching match data for ID: ${matchId.value}`);
    await new Promise(resolve => setTimeout(resolve, 50));

    const foundMatch = allMatches.value.find(m => m.id === matchId.value);

    if (!foundMatch) {
      console.error(`[id].vue: Match with ID ${matchId.value} not found.`);
      throw createError({ statusCode: 404, statusMessage: 'Match Not Found', fatal: true });
    }
    console.log(`[id].vue: Found match data for ${matchId.value}:`, foundMatch);
    return foundMatch;
  },
  { watch: [matchId] }
);

const pageTitle = computed(() => {
    if (pending.value || error.value || !match.value) return t('matches.pageTitle') + ' | ' + t('clubName');
    const home = match.value.homeTeamKey ? t(match.value.homeTeamKey) : match.value.homeTeam;
    const away = match.value.awayTeamKey ? t(match.value.awayTeamKey) : match.value.awayTeam;
    return `${home} vs ${away} | ${t('matches.pageTitle')} | ${t('clubName')}`;
});

useHead({ title: pageTitle });

function setActiveTab(tabName: string) {
    activeTab.value = tabName;
}

</script>

<template>
  <div class="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
    <GlobalHeader />

    <main class="flex-grow">
      <div v-if="pending" class="flex justify-center items-center min-h-[50vh]">
         <svg class="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="ms-4 rtl:ms-0 rtl:me-4 text-xl text-gray-400">Loading Match...</span>
      </div>

       <div v-else-if="error || !match" class="container mx-auto px-4 py-20 text-center">
           <h1 class="text-4xl text-red-500 mb-4">Error Loading Match</h1>
           <p class="text-xl text-gray-400 mb-6">Could not load the requested match details.</p>
            <pre v-if="error" class="text-sm text-red-300 bg-red-900/20 p-4 rounded text-start overflow-auto my-4 max-w-xl mx-auto">{{ error }}</pre>
           <NuxtLink :to="localePath('/matches')" class="text-accent-yellow hover:underline font-semibold">Return to Match Center</NuxtLink>
       </div>

      <template v-else>
        <!-- Match Scoreboard Hero -->
        <section class="relative bg-gradient-to-br from-secondary via-primary to-gray-900 py-12 md:py-16 overflow-hidden">
          <div class="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=abstract%20stadium%20lights%20pattern%20dark%20blue%20background&width=1000&height=600&seq=1')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
           <div class="container mx-auto px-4 relative z-10">
              <div class="mb-6">
                 <NuxtLink :to="localePath('/matches')" class="inline-flex items-center text-gray-300 hover:text-white text-sm transition-colors">
                    <ChevronLeft class="w-4 h-4 me-1 rtl:me-0 rtl:ms-1"/> {{ t('team.backToMatches') }}
                 </NuxtLink>
              </div>
              <div class="flex flex-col items-center">
                <div class="flex items-center justify-center gap-4 sm:gap-8 md:gap-12 w-full mb-4">
                   <div class="flex-1 flex flex-col sm:flex-row items-center justify-end gap-3 text-end rtl:text-start">
                       <span class="text-white font-bold text-xl sm:text-2xl md:text-3xl order-last sm:order-first">{{ match.homeTeamKey ? t(match.homeTeamKey) : match.homeTeam }}</span>
                       <img :src="match.homeLogo" :alt="match.homeTeamKey ? t(match.homeTeamKey) : match.homeTeam" class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white p-1 shadow-lg order-first sm:order-last">
                   </div>
                    <div class="text-center px-2">
                        <div v-if="match.status === 'finished' || match.status === 'live'" class="text-4xl sm:text-5xl md:text-6xl font-bold text-white tabular-nums">
                             <span>{{ match.homeScore ?? '-' }}</span> : <span>{{ match.awayScore ?? '-' }}</span>
                         </div>
                         <div v-else class="text-3xl sm:text-4xl md:text-5xl font-bold text-white tabular-nums py-2 md:py-3">
                             {{ match.time }}
                         </div>
                         <div class="text-xs sm:text-sm font-semibold uppercase tracking-wider" :class="match.status === 'live' ? 'text-red-500 animate-pulse' : 'text-gray-400'">
                            {{ match.status === 'live' ? `${match.timeOrMinute}'` : (match.status === 'finished' ? 'FT' : match.date ) }}
                         </div>
                    </div>
                   <div class="flex-1 flex flex-col sm:flex-row items-center justify-start gap-3 text-start rtl:text-end">
                       <img :src="match.awayLogo" :alt="match.awayTeamKey ? t(match.awayTeamKey) : match.awayTeam" class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white p-1 shadow-lg">
                       <span class="text-white font-bold text-xl sm:text-2xl md:text-3xl">{{ match.awayTeamKey ? t(match.awayTeamKey) : match.awayTeam }}</span>
                   </div>
                </div>
                 <div class="text-sm text-gray-300 mt-3 text-center">{{ match.competition }}</div>
              </div>
           </div>
        </section>

         <!-- Tabs for Content -->
        <section class="bg-gray-800 border-b border-t border-gray-700">
            <div class="container mx-auto px-4">
                <div class="flex justify-center">
                    <button @click="setActiveTab('summary')" :class="['px-4 sm:px-6 py-4 text-sm font-semibold uppercase tracking-wider border-b-4 transition-colors duration-200', activeTab === 'summary' ? 'text-primary border-primary' : 'text-gray-400 hover:text-white border-transparent']">Summary</button>
                    <button @click="setActiveTab('stats')" :disabled="!match.stats" :class="['px-4 sm:px-6 py-4 text-sm font-semibold uppercase tracking-wider border-b-4 transition-colors duration-200', activeTab === 'stats' ? 'text-primary border-primary' : 'text-gray-400 border-transparent', !match.stats ? 'opacity-50 cursor-not-allowed' : 'hover:text-white hover:border-gray-500']">Stats</button>
                    <button @click="setActiveTab('lineups')" :disabled="!match.lineups" :class="['px-4 sm:px-6 py-4 text-sm font-semibold uppercase tracking-wider border-b-4 transition-colors duration-200', activeTab === 'lineups' ? 'text-primary border-primary' : 'text-gray-400 border-transparent', !match.lineups ? 'opacity-50 cursor-not-allowed' : 'hover:text-white hover:border-gray-500']">Lineups</button>
                    <!-- Add Highlights Tab if needed -->
                </div>
            </div>
        </section>

        <!-- Main Content Area -->
        <section class="py-12 lg:py-16 bg-gray-900">
          <div class="container mx-auto px-4 max-w-4xl">
             <transition name="fade" mode="out-in">
                 <!-- Summary Content -->
                 <div v-if="activeTab === 'summary'" key="summary">
                    <h2 class="text-2xl font-bold font-heading mb-6 text-white">Match Summary</h2>
                    <div v-if="match.summaryKey" class="prose prose-invert prose-lg max-w-none prose-p:text-gray-300">
                        <p>{{ t(match.summaryKey) }}</p>
                        <p>More detailed summary would go here, potentially fetched as markdown or structured data.</p>
                    </div>
                    <p v-else class="text-gray-400 italic">Match summary is not available for this fixture yet.</p>
                 </div>

                 <!-- Stats Content -->
                 <div v-else-if="activeTab === 'stats'" key="stats">
                    <h2 class="text-2xl font-bold font-heading mb-6 text-white">Match Statistics</h2>
                     <div v-if="match.stats" class="bg-gray-800 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div v-for="(statValue, statKey) in match.stats" :key="statKey" class="space-y-2">
                            <h3 class="text-center text-gray-300 font-semibold uppercase text-sm tracking-wider">{{ statKey }}</h3>
                             <div class="flex items-center gap-2">
                                <span class="text-sm font-medium text-white w-10 text-end">{{ statValue.home }}%</span>
                                <div class="flex-1 bg-gray-700 rounded-full h-2.5">
                                    <div class="bg-primary h-2.5 rounded-s-full" :style="{ width: statValue.home + '%' }"></div>
                                </div>
                                 <div class="flex-1 bg-gray-700 rounded-full h-2.5">
                                     <div class="bg-accent-orange h-2.5 rounded-e-full" :style="{ width: statValue.away + '%' }" style="float: right;"></div>
                                </div>
                                <span class="text-sm font-medium text-white w-10 text-start">{{ statValue.away }}%</span>
                             </div>
                             <div class="flex justify-between px-12 text-xs text-gray-400">
                                 <span>{{ match.homeTeam }}</span>
                                 <span>{{ match.awayTeam }}</span>
                             </div>
                         </div>
                     </div>
                     <p v-else class="text-gray-400 italic">Detailed match statistics are not available.</p>
                 </div>

                 <!-- Lineups Content -->
                  <div v-else-if="activeTab === 'lineups'" key="lineups">
                    <h2 class="text-2xl font-bold font-heading mb-6 text-white">Lineups</h2>
                     <div v-if="match.lineups" class="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div>
                             <h3 class="text-lg font-semibold text-white mb-3 border-b border-gray-700 pb-2">{{ match.homeTeam }} Starting XI</h3>
                              <ul class="space-y-1 text-gray-300 text-sm">
                                 <li v-for="(player, idx) in match.lineups.home" :key="'home-'+idx">{{ player }}</li>
                             </ul>
                         </div>
                         <div>
                             <h3 class="text-lg font-semibold text-white mb-3 border-b border-gray-700 pb-2">{{ match.awayTeam }} Starting XI</h3>
                              <ul class="space-y-1 text-gray-300 text-sm">
                                 <li v-for="(player, idx) in match.lineups.away" :key="'away-'+idx">{{ player }}</li>
                             </ul>
                         </div>
                     </div>
                     <p v-else class="text-gray-400 italic">Lineups are not available for this fixture yet.</p>
                 </div>
             </transition>
          </div>
        </section>

      </template>
    </main>

    <GlobalFooter />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>