<script setup lang="ts">
import { ref, computed } from 'vue';
import GlobalHeader from '~/components/global/Header.vue';
import GlobalFooter from '~/components/global/Footer.vue';
import { useI18n, useLocalePath } from '#imports';

const { t } = useI18n();
const localePath = useLocalePath();

const activeTab = ref('fixtures'); // 'fixtures', 'results', 'standings'

// --- Placeholder Data ---
const upcomingFixtures = ref([
    { id: 102, status: 'upcoming', competition: 'Premier League - Matchday 34', date: 'April 26, 2025', time: '20:00', homeTeam: 'Al-Olympi', homeLogo: 'https://via.placeholder.com/80x80/00439e/ffffff?text=LFC', awayTeam: 'FC Riviera', awayLogo: 'https://www.transfermarkt.us/images/logo/verein/110838.png', venue: 'Olympic Stadium, Dubai', ticketsAvailable: true },
    { id: 103, status: 'upcoming', competition: 'National Cup - Semi Final', date: 'May 3, 2025', time: '18:30', homeTeam: 'United SC', homeLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/United_SC_logo.png/150px-United_SC_logo.png', awayTeam: 'Al-Olympi', awayLogo: 'https://via.placeholder.com/80x80/00439e/ffffff?text=LFC', venue: 'National Stadium', ticketsAvailable: true },
    { id: 104, status: 'upcoming', competition: 'Premier League - Matchday 35', date: 'May 10, 2025', time: '19:45', homeTeam: 'Royal FC', homeLogo: 'https://www.royalfc.club/wp-content/uploads/2021/12/royal-fc-logo.png', awayTeam: 'Al-Olympi', awayLogo: 'https://via.placeholder.com/80x80/00439e/ffffff?text=LFC', venue: 'Royal Arena', ticketsAvailable: false, remindMe: true },
]);

const recentResults = ref([
     { id: 101, status: 'finished', competition: 'Champions Cup - Quarter Final', date: 'April 21, 2025', homeTeam: 'Al-Olympi', homeLogo: 'https://via.placeholder.com/80x80/00439e/ffffff?text=LFC', awayTeam: 'Atletico FC', awayLogo: 'https://via.placeholder.com/80x80/c0392b/ffffff?text=AFC', homeScore: 2, awayScore: 1, highlightsAvailable: true }, // Example live becomes finished
    { id: 105, status: 'finished', competition: 'Premier League - Matchday 33', date: 'April 19, 2025', homeTeam: 'Al-Olympi', homeLogo: 'https://via.placeholder.com/80x80/00439e/ffffff?text=LFC', awayTeam: 'Sporting Club', awayLogo: 'https://via.placeholder.com/80x80/2ecc71/000000?text=SC', homeScore: 3, awayScore: 1, highlightsAvailable: true },
    { id: 106, status: 'finished', competition: 'Champions Cup - Round of 16', date: 'April 16, 2025', homeTeam: 'Dynamo FC', homeLogo: 'https://via.placeholder.com/80x80/3498db/ffffff?text=DFC', awayTeam: 'Al-Olympi', awayLogo: 'https://via.placeholder.com/80x80/00439e/ffffff?text=LFC', homeScore: 0, awayScore: 2, highlightsAvailable: true },
    { id: 107, status: 'finished', competition: 'Premier League - Matchday 32', date: 'April 12, 2025', homeTeam: 'City FC', homeLogo: 'https://via.placeholder.com/80x80/f39c12/ffffff?text=CFC', awayTeam: 'Al-Olympi', awayLogo: 'https://via.placeholder.com/80x80/00439e/ffffff?text=LFC', homeScore: 1, awayScore: 1, highlightsAvailable: true },
]);

const standings = ref([
    { rank: 1, team: 'Al-Olympi', P: 33, W: 24, D: 5, L: 4, GF: 72, GA: 25, GD: '+47', PTS: 77, form: ['W','W','D','W','W'], isOlympi: true },
    { rank: 2, team: 'United SC', P: 33, W: 23, D: 6, L: 4, GF: 68, GA: 30, GD: '+38', PTS: 75, form: ['W','W','W','D','L'] },
    { rank: 3, team: 'City FC', P: 33, W: 21, D: 5, L: 7, GF: 59, GA: 32, GD: '+27', PTS: 68, form: ['L','W','W','W','L'] },
    { rank: 4, team: 'Sporting Club', P: 33, W: 19, D: 8, L: 6, GF: 52, GA: 28, GD: '+24', PTS: 65, form: ['D','W','W','D','W'] },
    { rank: 5, team: 'FC Riviera', P: 33, W: 18, D: 7, L: 8, GF: 48, GA: 35, GD: '+13', PTS: 61, form: ['L','D','W','W','L'] },
    { rank: 6, team: 'Royal FC', P: 33, W: 15, D: 9, L: 9, GF: 45, GA: 40, GD: '+5', PTS: 54, form: ['W','D','L','W','D'] },
    { rank: 7, team: 'Atletico FC', P: 33, W: 14, D: 8, L: 11, GF: 41, GA: 38, GD: '+3', PTS: 50, form: ['L','W','D','L','W'] },
    // Add more teams
]);

function setActiveTab(tabName: string) {
  activeTab.value = tabName;
}
</script>

<template>
  <div class="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
    <GlobalHeader />

    <main class="flex-grow">
      <!-- Page Title/Hero Section -->
      <section class="bg-gradient-to-br from-secondary via-primary to-gray-900 py-16 lg:py-20">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-white uppercase tracking-tight drop-shadow-lg">
            {{ $t('matches.pageTitle') }}
          </h1>
           <p class="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">Fixtures, Results & Live Standings</p>
        </div>
      </section>

       <!-- Tab/Filter Bar -->
       <section class="bg-gray-800 sticky top-[80px] z-40 shadow-md border-b border-gray-700">
        <div class="container mx-auto px-4">
          <div class="flex justify-center border-b-0">
            <button
              @click="setActiveTab('fixtures')"
              :class="[
                'flex-1 sm:flex-none px-4 sm:px-6 py-4 text-sm font-semibold uppercase tracking-wider border-b-4 transition-colors duration-200 ease-in-out focus:outline-none',
                 activeTab === 'fixtures' ? 'text-primary border-primary' : 'text-gray-400 border-transparent hover:text-white hover:border-gray-500'
              ]">
               {{ $t('matches.filter.upcoming') }}
            </button>
             <button
              @click="setActiveTab('results')"
              :class="[
                 'flex-1 sm:flex-none px-4 sm:px-6 py-4 text-sm font-semibold uppercase tracking-wider border-b-4 transition-colors duration-200 ease-in-out focus:outline-none',
                 activeTab === 'results' ? 'text-primary border-primary' : 'text-gray-400 border-transparent hover:text-white hover:border-gray-500'
              ]">
               {{ $t('matches.filter.results') }}
            </button>
             <button
              @click="setActiveTab('standings')"
              :class="[
                 'flex-1 sm:flex-none px-4 sm:px-6 py-4 text-sm font-semibold uppercase tracking-wider border-b-4 transition-colors duration-200 ease-in-out focus:outline-none',
                 activeTab === 'standings' ? 'text-primary border-primary' : 'text-gray-400 border-transparent hover:text-white hover:border-gray-500'
              ]">
                {{ $t('matches.standings') }}
            </button>
          </div>
        </div>
      </section>

      <!-- Main Content Area -->
      <section class="py-12 lg:py-16 bg-gray-900">
        <div class="container mx-auto px-4">

           <!-- Fixtures View -->
           <transition name="fade">
              <div v-if="activeTab === 'fixtures'" class="space-y-8 max-w-4xl mx-auto">
                <div v-for="match in upcomingFixtures" :key="'fixture-'+match.id"
                    class="match-card bg-gray-800/70 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 border border-gray-700/50 hover:border-primary/50 backdrop-blur-sm">
                  <div class="bg-gray-700/50 px-4 py-2 flex justify-between items-center text-xs">
                     <span class="text-primary font-semibold">{{ match.competition }}</span>
                     <span class="text-gray-400">{{ match.date }}</span>
                  </div>
                   <div class="p-5 md:p-6">
                    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                       <div class="flex items-center justify-between md:justify-start w-full md:w-auto md:flex-1">
                           <div class="flex items-center gap-3 md:gap-4 flex-1 justify-end md:justify-end text-end">
                               <span class="text-white font-bold text-base md:text-lg truncate">{{ match.homeTeamKey ? t(match.homeTeamKey) : match.homeTeam }}</span>
                               <img :src="match.homeLogo" :alt="match.homeTeamKey ? t(match.homeTeamKey) : match.homeTeam" class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white p-0.5">
                           </div>
                            <div class="px-3 md:px-4 text-center">
                                <div class="text-lg md:text-xl font-bold text-accent-yellow py-2 md:py-4">
                                    {{ match.time }}
                                </div>
                            </div>
                           <div class="flex items-center gap-3 md:gap-4 flex-1 justify-start text-start">
                               <img :src="match.awayLogo" :alt="match.awayTeamKey ? t(match.awayTeamKey) : match.awayTeam" class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white p-0.5">
                               <span class="text-white font-bold text-base md:text-lg truncate">{{ match.awayTeamKey ? t(match.awayTeamKey) : match.awayTeam }}</span>
                           </div>
                       </div>

                      <div class="flex items-center justify-center md:justify-end space-x-2 rtl:space-x-reverse rtl:space-x-reverse mt-4 md:mt-0 w-full md:w-auto flex-shrink-0">
                         <button v-if="match.ticketsAvailable" class="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-3 rounded-lg text-xs uppercase tracking-wider transition-colors flex items-center">
                           <TicketLine class="w-4 h-4 me-1 rtl:me-0 rtl:ms-1"/>
                          {{ $t('matches.buyTickets') }}
                        </button>
                        <NuxtLink :to="localePath(`/matches/${match.id}`)" class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded-lg text-xs uppercase tracking-wider transition-colors flex items-center">
                           <InformationLine class="w-4 h-4 me-1 rtl:me-0 rtl:ms-1"/>
                           {{ $t('matches.matchInfo') }}
                         </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-center mt-8">
                  <button class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors whitespace-nowrap text-sm">
                     {{ $t('matches.loadMore') }}
                  </button>
                </div>
              </div>
           </transition>

            <!-- Results View -->
            <transition name="fade">
              <div v-if="activeTab === 'results'" class="space-y-8 max-w-4xl mx-auto">
                 <div v-for="match in recentResults" :key="'result-'+match.id"
                     class="match-card bg-gray-800/70 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 border border-gray-700/50 hover:border-primary/50 backdrop-blur-sm">
                  <div class="bg-gray-700/50 px-4 py-2 flex justify-between items-center text-xs">
                     <span class="text-gray-400 font-semibold">{{ match.competition }}</span>
                     <span class="text-gray-400">{{ match.date }}</span>
                  </div>
                   <div class="p-5 md:p-6">
                    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                       <div class="flex items-center justify-between md:justify-start w-full md:w-auto md:flex-1">
                           <div class="flex items-center gap-3 md:gap-4 flex-1 justify-end md:justify-end text-end">
                               <span class="text-white font-bold text-base md:text-lg truncate">{{ match.homeTeamKey ? t(match.homeTeamKey) : match.homeTeam }}</span>
                               <img :src="match.homeLogo" :alt="match.homeTeamKey ? t(match.homeTeamKey) : match.homeTeam" class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white p-0.5">
                           </div>
                            <div class="px-3 md:px-4 text-center">
                                <div class="text-3xl md:text-4xl font-bold text-white py-1 md:py-2">
                                    <span>{{ match.homeScore }}</span> - <span>{{ match.awayScore }}</span>
                                </div>
                            </div>
                           <div class="flex items-center gap-3 md:gap-4 flex-1 justify-start text-start">
                               <img :src="match.awayLogo" :alt="match.awayTeamKey ? t(match.awayTeamKey) : match.awayTeam" class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white p-0.5">
                               <span class="text-white font-bold text-base md:text-lg truncate">{{ match.awayTeamKey ? t(match.awayTeamKey) : match.awayTeam }}</span>
                           </div>
                       </div>

                      <div class="flex items-center justify-center md:justify-end space-x-2 rtl:space-x-reverse rtl:space-x-reverse mt-4 md:mt-0 w-full md:w-auto flex-shrink-0">
                        <button v-if="match.highlightsAvailable" class="bg-accent-orange hover:bg-accent-orange/90 text-white font-bold py-2 px-3 rounded-lg text-xs uppercase tracking-wider transition-colors flex items-center">
                            <VidiconLine class="w-4 h-4 me-1 rtl:me-0 rtl:ms-1"/>
                           {{ $t('matches.highlights') }}
                         </button>
                        <NuxtLink :to="localePath(`/matches/${match.id}`)" class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded-lg text-xs uppercase tracking-wider transition-colors flex items-center">
                           <InformationLine class="w-4 h-4 me-1 rtl:me-0 rtl:ms-1"/>
                           {{ $t('matches.matchReport') }}
                         </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-center mt-8">
                  <button class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors whitespace-nowrap text-sm">
                     {{ $t('matches.loadMore') }}
                  </button>
                </div>
              </div>
            </transition>

             <!-- Standings View -->
            <transition name="fade">
               <div v-if="activeTab === 'standings'">
                    <div class="bg-gray-800 rounded-xl overflow-hidden">
                        <div class="bg-primary px-4 py-3">
                        <h3 class="text-white font-bold">{{ $t('matches.standings') }} - Premier League</h3>
                        </div>
                        <div class="overflow-x-auto custom-scrollbar">
                        <table class="w-full text-xs whitespace-nowrap">
                            <thead>
                                <tr class="bg-gray-700/50 text-gray-400 uppercase tracking-wider">
                                    <th class="px-3 py-3 text-start font-semibold">#</th>
                                    <th class="px-3 py-3 text-start font-semibold min-w-[150px]">Team</th>
                                    <th class="px-3 py-3 text-center font-semibold">P</th>
                                    <th class="px-3 py-3 text-center font-semibold">W</th>
                                    <th class="px-3 py-3 text-center font-semibold">D</th>
                                    <th class="px-3 py-3 text-center font-semibold">L</th>
                                    <th class="px-3 py-3 text-center font-semibold hidden md:table-cell">GF</th>
                                    <th class="px-3 py-3 text-center font-semibold hidden md:table-cell">GA</th>
                                    <th class="px-3 py-3 text-center font-semibold">GD</th>
                                    <th class="px-3 py-3 text-center font-semibold">Pts</th>
                                    <th class="px-3 py-3 text-center font-semibold hidden sm:table-cell">Form</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-700/50">
                                <tr v-for="team in standings" :key="team.rank"
                                    class="hover:bg-gray-700/40 transition-colors"
                                    :class="{ 'bg-primary/10 border-s-2 rtl:border-s-0 rtl:border-e-2 border-primary': team.isOlympi }">
                                    <td class="px-3 py-3 text-start">{{ team.rank }}</td>
                                    <td class="px-3 py-3 text-start">
                                        <div class="flex items-center">
                                            <img v-if="team.isOlympi" src="https://via.placeholder.com/24x24/00439e/ffffff?text=L" alt="logo" class="w-5 h-5 me-2 rtl:me-0 rtl:ms-2 rounded-full bg-white p-0.5">
                                            <span v-else class="w-5 h-5 me-2 rtl:me-0 rtl:ms-2 rounded-full bg-gray-600"></span>
                                            <span class="font-medium text-white">{{ team.team }}</span>
                                        </div>
                                    </td>
                                    <td class="px-3 py-3 text-center">{{ team.P }}</td>
                                    <td class="px-3 py-3 text-center">{{ team.W }}</td>
                                    <td class="px-3 py-3 text-center">{{ team.D }}</td>
                                    <td class="px-3 py-3 text-center">{{ team.L }}</td>
                                    <td class="px-3 py-3 text-center hidden md:table-cell">{{ team.GF }}</td>
                                    <td class="px-3 py-3 text-center hidden md:table-cell">{{ team.GA }}</td>
                                    <td class="px-3 py-3 text-center font-medium" :class="team.GD.startsWith('+') ? 'text-green-400' : 'text-red-400'">{{ team.GD }}</td>
                                    <td class="px-3 py-3 text-center font-bold text-white">{{ team.PTS }}</td>
                                    <td class="px-3 py-3 hidden sm:table-cell">
                                        <div class="flex justify-center space-x-0.5 rtl:space-x-reverse">
                                        <span v-for="(f, idx) in team.form" :key="idx" class="team-form-indicator"
                                                :class="{'win': f==='W', 'draw': f==='D', 'loss': f==='L'}">{{ f }}</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        <div class="p-4 text-center border-t border-gray-700/50">
                            <NuxtLink :to="localePath('/standings')" class="text-primary hover:text-accent-yellow transition-colors flex items-center justify-center font-medium text-sm">
                                {{ $t('matches.fullTable') }}
                                <i class="ri-arrow-right-line text-base ms-1 rtl:ms-0 rtl:me-1"></i>
                            </NuxtLink>
                        </div>
                    </div>
               </div>
            </transition>

        </div>
      </section>
    </main>

    <GlobalFooter />
  </div>
</template>

<style scoped>
.match-card:hover {
    transform: translateY(-4px);
}
.team-form-indicator {
    display: inline-block;
    width: 1.125rem;
    height: 1.125rem;
    border-radius: 9999px;
    font-size: 0.625rem;
    font-weight: bold;
    text-align: center;
    line-height: 1.125rem;
    margin-right: 0.125rem;
    color: white;
}
.team-form-indicator.win { background-color: #22c55e; }
.team-form-indicator.draw { background-color: #a1a1aa; }
.team-form-indicator.loss { background-color: #ef4444; }

.competition-selector:hover .competition-dropdown { display: block; }

/* Fade transition for tabs */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: theme('colors.primary.DEFAULT');
  border-radius: 4px;
}
</style>