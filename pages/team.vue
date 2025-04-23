<script setup lang="ts">
import { ref, computed } from 'vue';
import GlobalHeader from '~/components/global/Header.vue';
import GlobalFooter from '~/components/global/Footer.vue';
import { useI18n, useLocalePath, useHead } from '#imports';

const { t } = useI18n();
const localePath = useLocalePath();

const activeFilter = ref('firstteam');

const filters = ref([
  { key: 'firstteam', labelKey: 'team.firstTeam' },
  { key: 'reserves', labelKey: 'team.reserves' },
  { key: 'youthTeam', labelKey: 'team.youthTeam' },
]);

const captain = ref({
    name: 'Ahmed Al-Farsi',
    position: 'Defensive Midfielder',
    number: 4,
    image: 'https://readdy.ai/api/search-image?query=professional%2520football%2520player%2520portrait%252C%2520confident%2520male%2520athlete%2520in%2520blue%2520jersey%252C%2520captain%2520armband%252C%2520mid%252030s%252C%2520athletic%2520build%252C%2520determined%2520expression%252C%2520studio%2520lighting%252C%2520dark%2520background%252C%2520professional%2520sports%2520photography&width=400&height=500&seq=123457&orientation=portrait',
    nationality: 'UAE',
    age: 32,
    height: '183 cm',
    since: 2015,
    contractUntil: 2027,
    bioKey: 'team.captainBioPlaceholder',
    stats: {
        appearances: { value: 32, max: 38, labelKey: 'team.appearances' },
        passCompletion: { value: 92, max: 100, labelKey: 'team.passCompletion' },
        tacklesWon: { value: 76, max: 100, labelKey: 'team.tacklesWon' },
        goals: { value: 5, max: 20, labelKey: 'team.goals' },
        assists: { value: 11, max: 20, labelKey: 'team.assists' }
    }
});

const players = ref({
    goalkeepers: [
        { id: 1, number: 1, name: 'Carlos Mendoza', position: 'Goalkeeper', nation: 'Colombia', age: 29, stats: [{ labelKey: 'team.cleanSheets', value: 14 }, { labelKey: 'team.saves', value: 87 }, { labelKey: 'team.appearances', value: 32}], image: 'https://readdy.ai/api/search-image?query=professional%2520football%2520goalkeeper%2520portrait%252C%2520athletic%2520male%2520in%2520blue%2520goalkeeper%2520kit%252C%2520gloves%252C%2520confident%2520pose%252C%2520studio%2520lighting%252C%2520dark%2520background%252C%2520sports%2520photography&width=300&height=350&seq=123458&orientation=portrait' },
        { id: 13, number: 13, name: 'Khalid Al-Shamsi', position: 'Goalkeeper', nation: 'UAE', age: 25, stats: [{ labelKey: 'team.cleanSheets', value: 3 }, { labelKey: 'team.saves', value: 24 }, { labelKey: 'team.appearances', value: 6}], image: 'https://readdy.ai/api/search-image?query=professional%2520football%2520goalkeeper%2520portrait%252C%2520young%2520athletic%2520male%2520in%2520blue%2520goalkeeper%2520kit%252C%2520gloves%252C%2520confident%2520pose%252C%2520studio%2520lighting%252C%2520dark%2520background%252C%2520sports%2520photography&width=300&height=350&seq=123459&orientation=portrait' }
    ],
    defenders: [
         { id: 2, number: 2, name: 'Sergio Ramirez', position: 'Center Back', nation: 'Spain', age: 31, stats: [{ labelKey: 'team.tackles', value: 76 }, { labelKey: 'team.goals', value: 3 }, { labelKey: 'team.appearances', value: 34}], image: 'https://readdy.ai/api/search-image?query=professional%2520football%2520defender%2520portrait%252C%2520athletic%2520male%2520in%2520blue%2520kit%252C%2520strong%2520build%252C%2520confident%2520pose%252C%2520studio%2520lighting%252C%2520dark%2520background%252C%2520sports%2520photography&width=300&height=350&seq=123460&orientation=portrait' },
         { id: 5, number: 5, name: 'Marcus Johnson', position: 'Center Back', nation: 'England', age: 28, stats: [{ labelKey: 'team.tackles', value: 64 }, { labelKey: 'team.goals', value: 2 }, { labelKey: 'team.appearances', value: 30}], image: 'https://readdy.ai/api/search-image?query=professional%2520football%2520defender%2520portrait%252C%2520tall%2520athletic%2520male%2520in%2520blue%2520kit%252C%2520strong%2520build%252C%2520confident%2520pose%252C%2520studio%2520lighting%252C%2520dark%2520background%252C%2520sports%2520photography&width=300&height=350&seq=123461&orientation=portrait' },
         { id: 3, number: 3, name: 'Mohammed Al-Jabri', position: 'Left Back', nation: 'UAE', age: 24, stats: [{ labelKey: 'team.assists', value: 7 }, { labelKey: 'team.goals', value: 1 }, { labelKey: 'team.appearances', value: 33}], image: 'https://readdy.ai/api/search-image?query=professional%2520football%2520fullback%2520portrait%252C%2520athletic%2520male%2520in%2520blue%2520kit%252C%2520fast%2520build%252C%2520confident%2520pose%252C%2520studio%2520lighting%252C%2520dark%2520background%252C%2520sports%2520photography&width=300&height=350&seq=123462&orientation=portrait' },
         { id: 22, number: 22, name: 'Lucas Ferreira', position: 'Right Back', nation: 'Brazil', age: 26, stats: [{ labelKey: 'team.assists', value: 9 }, { labelKey: 'team.goals', value: 2 }, { labelKey: 'team.appearances', value: 31}], image: 'https://readdy.ai/api/search-image?query=professional%2520football%2520fullback%2520portrait%252C%2520athletic%2520male%2520in%2520blue%2520kit%252C%2520fast%2520build%252C%2520confident%2520pose%252C%2520studio%2520lighting%252C%2520dark%2520background%252C%2520sports%2520photography&width=300&height=350&seq=123463&orientation=portrait' }
    ],
    midfielders: [
         { id: 8, number: 8, name: 'Takashi Nakamura', position: 'Central Midfielder', nation: 'Japan', age: 27, stats: [{ labelKey: 'team.assists', value: 12 }, { labelKey: 'team.goals', value: 6 }, { labelKey: 'team.appearances', value: 36}], image: 'https://readdy.ai/api/search-image?query=professional%2520football%2520midfielder%2520portrait%252C%2520athletic%2520male%2520in%2520blue%2520kit%252C%2520technical%2520player%252C%2520confident%2520pose%252C%2520studio%2520lighting%252C%2520dark%2520background%252C%2520sports%2520photography&width=300&height=350&seq=123464&orientation=portrait' },
         { id: 10, number: 10, name: 'Kevin De Santos', position: 'Attacking Midfielder', nation: 'Portugal', age: 28, stats: [{ labelKey: 'team.assists', value: 18 }, { labelKey: 'team.goals', value: 14 }, { labelKey: 'team.appearances', value: 35}], image: 'https://readdy.ai/api/search-image?query=professional%2520football%2520midfielder%2520portrait%252C%2520athletic%2520male%2520in%2520blue%2520kit%252C%2520creative%2520player%252C%2520confident%2520pose%252C%2520studio%2520lighting%252C%2520dark%2520background%252C%2520sports%2520photography&width=300&height=350&seq=123465&orientation=portrait' },
         { id: 6, number: 6, name: 'Omar Al-Mansouri', position: 'Defensive Midfielder', nation: 'UAE', age: 25, stats: [{ labelKey: 'team.tackles', value: 92 }, { labelKey: 'team.goals', value: 2 }, { labelKey: 'team.appearances', value: 34}], image: 'https://readdy.ai/api/search-image?query=professional%2520football%2520midfielder%2520portrait%252C%2520athletic%2520male%2520in%2520blue%2520kit%252C%2520defensive%2520player%252C%2520confident%2520pose%252C%2520studio%2520lighting%252C%2520dark%2520background%252C%2520sports%2520photography&width=300&height=350&seq=123466&orientation=portrait' }
    ],
    forwards: [
        { id: 9, number: 9, name: 'Ibrahim Diallo', position: 'Striker', nation: 'Senegal', age: 27, stats: [{ labelKey: 'team.goals', value: 24 }, { labelKey: 'team.assists', value: 7 }, { labelKey: 'team.appearances', value: 33}], image: 'https://readdy.ai/api/search-image?query=professional%2520football%2520striker%2520portrait%252C%2520athletic%2520male%2520in%2520blue%2520kit%252C%2520powerful%2520build%252C%2520confident%2520pose%252C%2520studio%2520lighting%252C%2520dark%2520background%252C%2520sports%2520photography&width=300&height=350&seq=123467&orientation=portrait' },
        { id: 7, number: 7, name: 'Alejandro Reyes', position: 'Left Winger', nation: 'Mexico', age: 24, stats: [{ labelKey: 'team.goals', value: 16 }, { labelKey: 'team.assists', value: 14 }, { labelKey: 'team.appearances', value: 35}], image: 'https://readdy.ai/api/search-image?query=professional%2520football%2520winger%2520portrait%252C%2520athletic%2520male%2520in%2520blue%2520kit%252C%2520fast%2520build%252C%2520confident%2520pose%252C%2520studio%2520lighting%252C%2520dark%2520background%252C%2520sports%2520photography&width=300&height=350&seq=123468&orientation=portrait' },
        { id: 11, number: 11, name: 'Daniel Kim', position: 'Right Winger', nation: 'South Korea', age: 26, stats: [{ labelKey: 'team.goals', value: 13 }, { labelKey: 'team.assists', value: 16 }, { labelKey: 'team.appearances', value: 34}], image: 'https://readdy.ai/api/search-image?query=professional%2520football%2520winger%2520portrait%252C%2520athletic%2520male%2520in%2520blue%2520kit%252C%2520fast%2520build%252C%2520confident%2520pose%252C%2520studio%2520lighting%252C%2520dark%2520background%252C%2520sports%2520photography&width=300&height=350&seq=123469&orientation=portrait' }
    ]
});

const coachingStaff = ref([
    { id: 'hc', name: 'Roberto Mancini', roleKey: 'team.headCoach', image: 'https://readdy.ai/api/search-image?query=professional%2520football%2520coach%2520portrait%252C%2520confident%2520middle-aged%2520man%2520in%2520blue%2520tracksuit%252C%2520serious%2520expression%252C%2520studio%2520lighting%252C%2520dark%2520background%252C%2520sports%2520photography&width=300&height=300&seq=123470&orientation=squarish', bioKey: 'team.coachBioMancini', accolades: '2 League Titles, 1 Cup with Al-Olympi' },
    { id: 'ac', name: 'Marco Rossi', roleKey: 'team.assistantCoach', image: 'https://readdy.ai/api/search-image?query=professional%2520football%2520assistant%2520coach%2520portrait%252C%2520man%2520in%2520blue%2520tracksuit%252C%2520studio%2520lighting%252C%2520dark%2520background%252C%2520sports%2520photography&width=100&height=100&seq=123471&orientation=squarish', bioKey: 'team.coachBioRossi' },
    { id: 'gk', name: 'David Wilson', roleKey: 'team.goalkeeperCoach', image: 'https://readdy.ai/api/search-image?query=professional%2520football%2520goalkeeper%2520coach%2520portrait%252C%2520man%2520in%2520blue%2520tracksuit%252C%2520studio%2520lighting%252C%2520dark%2520background%252C%2520sports%2520photography&width=100&height=100&seq=123472&orientation=squarish', bioKey: 'team.coachBioWilson' },
    { id: 'fc', name: 'Carlos Mendez', roleKey: 'team.fitnessCoach', image: 'https://readdy.ai/api/search-image?query=professional%2520football%2520fitness%2520coach%2520portrait%252C%2520athletic%2520man%2520in%2520blue%2520tracksuit%252C%2520studio%2520lighting%252C%2520dark%2520background%252C%2520sports%2520photography&width=100&height=100&seq=123473&orientation=squarish', bioKey: 'team.coachBioMendez' },
    { id: 'ta', name: 'Sami Al-Nouri', roleKey: 'team.tacticalAnalyst', image: 'https://readdy.ai/api/search-image?query=professional%2520football%2520analyst%2520coach%2520portrait%252C%2520man%2520with%2520glasses%2520in%2520blue%2520tracksuit%252C%2520studio%2520lighting%252C%2520dark%2520background%252C%2520sports%2520photography&width=100&height=100&seq=123474&orientation=squarish', bioKey: 'team.coachBioAlNouri' }
]);

const sidebarNews = ref([
    { id: 'tn1', image: 'https://readdy.ai/api/search-image?query=football%2520team%2520training%2520session%252C%2520players%2520in%2520blue%2520training%2520kit%252C%2520professional%2520sports%2520photography%252C%2520high%2520quality%252C%2520no%2520text%2520or%2520watermarks&width=400&height=200&seq=123475&orientation=landscape', date: 'April 19, 2025', titleKey: 'news.sample4.title', link: '/news/4' },
    { id: 'tn2', image: 'https://readdy.ai/api/search-image?query=football%2520player%2520medical%2520examination%252C%2520sports%2520medicine%252C%2520professional%2520sports%2520photography%252C%2520high%2520quality%252C%2520no%2520text%2520or%2520watermarks&width=400&height=200&seq=123476&orientation=landscape', date: 'April 17, 2025', titleKey: 'news.sample6.title', link: '/news/6' }
]);

const currentSeason = '2024/25';

function setActiveFilter(filterKey: string) {
  activeFilter.value = filterKey;
}

useHead({
    title: `${t('header.team')} | ${t('clubName')}`
})
</script>

<template>
  <div class="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
    <GlobalHeader />

    <main class="flex-grow">
      <section class="bg-gray-900 py-4 border-b border-gray-800 sticky top-[80px] z-40 shadow-md">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="flex items-center space-x-2 rtl:space-x-reverse rtl:space-x-reverse overflow-x-auto pb-2 md:pb-0 w-full md:w-auto custom-scrollbar">
              <NuxtLink :to="localePath('/matches')" class="flex items-center px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors whitespace-nowrap text-sm">
                <span class="me-1 rtl:me-0 rtl:ms-1">←</span>
                <span>{{ $t('team.backToMatches') }}</span>
              </NuxtLink>
              <button
                v-for="filter in filters"
                :key="filter.key"
                @click="setActiveFilter(filter.key)"
                :class="[
                  'px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-200 ease-in-out whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-primary',
                  activeFilter === filter.key
                    ? 'bg-primary text-white shadow-md scale-105'
                    : 'bg-gray-800 text-gray-300 hover:bg-primary/80 hover:text-white'
                ]"
              >
                {{ $t(filter.labelKey) }}
              </button>
            </div>
            <div class="relative w-full md:w-64">
              <input type="text" :placeholder="t('team.searchPlayers')" class="search-input w-full bg-gray-800 text-white px-4 py-2 ps-10 rtl:pe-10 rtl:ps-4 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 border-none text-sm">
              <div class="search-icon absolute start-3 rtl:start-auto rtl:end-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400 pointer-events-none">
                <span class="text-lg">🔍</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-12 bg-black">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row items-center justify-between gap-8">
            <div class="md:w-1/2">
              <h1 class="text-4xl md:text-5xl font-bold mb-4 text-white">{{ t('clubName') }} <span class="text-primary">{{ $t('team.pageTitle') }}</span></h1>
              <p class="text-gray-400 text-lg mb-6">{{ $t('team.heroDesc') }}</p>
              <div class="flex flex-wrap gap-4">
                <div class="bg-gray-900 rounded-lg px-5 py-3 flex items-center">
                  <div class="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full me-3 rtl:me-0 rtl:ms-3 text-primary text-2xl">
                    <span>👥</span>
                  </div>
                  <div>
                    <div class="text-sm text-gray-400">{{ $t('team.squadSize') }}</div>
                    <div class="text-xl font-bold text-white">28 Players</div>
                  </div>
                </div>
                 <div class="bg-gray-900 rounded-lg px-5 py-3 flex items-center">
                  <div class="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full me-3 rtl:me-0 rtl:ms-3 text-primary text-2xl">
                     <span>🌍</span>
                  </div>
                  <div>
                    <div class="text-sm text-gray-400">{{ $t('team.nationalities') }}</div>
                    <div class="text-xl font-bold text-white">12 Countries</div>
                  </div>
                </div>
                 <div class="bg-gray-900 rounded-lg px-5 py-3 flex items-center">
                  <div class="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full me-3 rtl:me-0 rtl:ms-3 text-primary text-2xl">
                     <span>🎂</span>
                  </div>
                  <div>
                    <div class="text-sm text-gray-400">{{ $t('team.avgAge') }}</div>
                    <div class="text-xl font-bold text-white">26.3 Years</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md:w-1/2">
              <img src="https://readdy.ai/api/search-image?query=professional%2520football%2520team%2520photo%2520on%2520pitch%252C%2520diverse%2520group%2520of%2520players%2520in%2520blue%2520kit%252C%2520stadium%2520background%252C%2520professional%2520sports%2520photography%252C%2520team%2520portrait%252C%2520high%2520quality%252C%2520no%2520text%2520or%2520watermarks&width=600&height=400&seq=123456&orientation=landscape" alt="Al-Olympi Club Team" class="w-full h-auto rounded-lg shadow-2xl">
            </div>
          </div>
        </div>
      </section>

       <section class="py-12 bg-gradient-to-b from-black to-gray-900">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold mb-8 text-white">{{ $t('team.teamCaptain') }}</h2>
          <div class="bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-primary/30">
            <div class="flex flex-col md:flex-row">
              <div class="md:w-1/3 relative">
                <img :src="captain.image" :alt="captain.name" class="w-full h-full object-cover object-top min-h-[400px] md:min-h-[500px]">
                <div class="absolute bottom-0 start-0 end-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent py-4 px-6">
                  <div class="flex items-center">
                    <div class="w-10 h-10 flex items-center justify-center text-lg bg-primary rounded-full me-3 rtl:me-0 rtl:ms-3 text-white font-bold">
                      {{ captain.number }}
                    </div>
                    <div>
                      <h3 class="text-2xl font-bold text-white">{{ captain.name }}</h3>
                      <p class="text-gray-300">{{ captain.position }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="md:w-2/3 p-6 md:p-8">
                <div class="flex items-center mb-6">
                   <span class="text-primary text-2xl me-3 rtl:me-0 rtl:ms-3">⭐</span>
                  <h3 class="text-2xl font-bold text-white">{{ $t('team.captainsProfile') }}</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p class="text-gray-300 mb-6 leading-relaxed">{{ t(captain.bioKey, { league_titles: 3, cup_victories: 2, seasons: 5 }) }}</p>
                    <div class="space-y-3 text-sm">
                      <div class="flex items-center justify-between">
                        <span class="text-gray-400">{{ $t('team.nationality') }}:</span>
                        <span class="flex items-center font-medium text-white">
                          <span class="text-lg me-1 rtl:me-0 rtl:ms-1">🇦🇪</span>
                          {{ captain.nationality }}
                        </span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-gray-400">{{ $t('team.age') }}:</span>
                        <span class="font-medium text-white">{{ captain.age }} Years</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-gray-400">{{ $t('team.height') }}:</span>
                        <span class="font-medium text-white">{{ captain.height }}</span>
                      </div>
                       <div class="flex items-center justify-between">
                        <span class="text-gray-400">{{ $t('team.clubSince') }}:</span>
                        <span class="font-medium text-white">{{ captain.since }}</span>
                      </div>
                       <div class="flex items-center justify-between">
                        <span class="text-gray-400">{{ $t('team.contractUntil') }}:</span>
                        <span class="font-medium text-white">{{ captain.contractUntil }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 class="text-lg font-bold mb-4 text-white">{{ $t('team.seasonStats', { year: currentSeason }) }}</h4>
                    <div class="space-y-4">
                      <div v-for="(stat, key) in captain.stats" :key="key">
                        <div class="flex justify-between mb-1">
                          <span class="text-sm text-gray-300">{{ t(stat.labelKey) }}</span>
                          <span class="text-sm font-bold text-white">{{ stat.value }}{{ stat.max === 100 ? '%' : '' }}</span>
                        </div>
                        <div class="team-stats-item bg-gray-700 rounded-full h-1.5">
                          <div class="team-stats-item-fill bg-primary h-1.5 rounded-full" :style="{ width: `${(stat.value / stat.max) * 100}%` }"></div>
                        </div>
                      </div>
                    </div>
                     <div class="mt-6">
                       <NuxtLink :to="localePath(`/team/player/${captain.id || captain.name.toLowerCase().replace(' ','-')}`)" class="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg transition-all transform hover:scale-105 whitespace-nowrap text-sm">
                            <span>{{ $t('team.fullPlayerProfile') }}</span>
                             <span class="ms-1 rtl:ms-0 rtl:me-1">→</span>
                       </NuxtLink>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-12 bg-gray-900">
        <div class="container mx-auto px-4">
          <div class="flex flex-col lg:flex-row gap-8">
            <div class="lg:w-2/3">
              <h2 class="text-2xl font-bold mb-6 text-white">{{ $t('team.squadList') }}</h2>

              <div v-if="players.goalkeepers.length > 0" class="mb-12">
                <div class="flex items-center mb-6">
                   <span class="text-primary text-2xl me-3 rtl:me-0 rtl:ms-3">🧤</span>
                  <h3 class="text-xl font-bold text-white">{{ $t('team.goalkeepers') }}</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div v-for="player in players.goalkeepers" :key="player.id" class="player-card bg-gray-800 rounded-xl overflow-hidden border border-transparent hover:border-primary/50 transition-all duration-300">
                    <div class="relative">
                      <img :src="player.image" :alt="player.name" class="w-full h-64 object-cover object-top">
                      <div class="absolute bottom-0 start-0 end-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <div class="flex items-center">
                          <div class="w-8 h-8 flex items-center justify-center bg-primary rounded-full me-2 rtl:me-0 rtl:ms-2 text-white font-bold text-sm">
                            {{ player.number }}
                          </div>
                          <div>
                            <h4 class="text-lg font-bold text-white">{{ player.name }}</h4>
                            <p class="text-sm text-gray-300">{{ player.position }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="p-4">
                      <div class="flex justify-between mb-3 text-xs">
                        <div class="flex items-center text-gray-300">
                          <span class="text-base me-1 rtl:me-0 rtl:ms-1">🌍</span>
                          <span>{{ player.nation }}</span>
                        </div>
                        <span class="text-gray-300">{{ $t('team.age') }}: {{ player.age }}</span>
                      </div>
                      <div class="space-y-1.5">
                        <div v-for="stat in player.stats" :key="stat.labelKey" class="flex justify-between text-xs">
                          <span class="text-gray-400">{{ t(stat.labelKey) }}:</span>
                          <span class="text-white font-medium">{{ stat.value }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

               <div v-if="players.defenders.length > 0" class="mb-12">
                <div class="flex items-center mb-6">
                   <span class="text-primary text-2xl me-3 rtl:me-0 rtl:ms-3">🛡️</span>
                  <h3 class="text-xl font-bold text-white">{{ $t('team.defenders') }}</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div v-for="player in players.defenders" :key="player.id" class="player-card bg-gray-800 rounded-xl overflow-hidden border border-transparent hover:border-primary/50 transition-all duration-300">
                     <div class="relative">
                       <img :src="player.image" :alt="player.name" class="w-full h-64 object-cover object-top">
                       <div class="absolute bottom-0 start-0 end-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                         <div class="flex items-center">
                           <div class="w-8 h-8 flex items-center justify-center bg-primary rounded-full me-2 rtl:me-0 rtl:ms-2 text-white font-bold text-sm">
                             {{ player.number }}
                           </div>
                           <div>
                             <h4 class="text-lg font-bold text-white">{{ player.name }}</h4>
                             <p class="text-sm text-gray-300">{{ player.position }}</p>
                           </div>
                         </div>
                       </div>
                     </div>
                     <div class="p-4">
                       <div class="flex justify-between mb-3 text-xs">
                         <div class="flex items-center text-gray-300">
                            <span class="text-base me-1 rtl:me-0 rtl:ms-1">🌍</span>
                           <span>{{ player.nation }}</span>
                         </div>
                         <span class="text-gray-300">{{ $t('team.age') }}: {{ player.age }}</span>
                       </div>
                       <div class="space-y-1.5">
                         <div v-for="stat in player.stats" :key="stat.labelKey" class="flex justify-between text-xs">
                           <span class="text-gray-400">{{ t(stat.labelKey) }}:</span>
                           <span class="text-white font-medium">{{ stat.value }}</span>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
              </div>

                <div v-if="players.midfielders.length > 0" class="mb-12">
                <div class="flex items-center mb-6">
                   <span class="text-primary text-2xl me-3 rtl:me-0 rtl:ms-3">⚙️</span>
                  <h3 class="text-xl font-bold text-white">{{ $t('team.midfielders') }}</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div v-for="player in players.midfielders" :key="player.id" class="player-card bg-gray-800 rounded-xl overflow-hidden border border-transparent hover:border-primary/50 transition-all duration-300">
                     <div class="relative">
                       <img :src="player.image" :alt="player.name" class="w-full h-64 object-cover object-top">
                       <div class="absolute bottom-0 start-0 end-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                         <div class="flex items-center">
                           <div class="w-8 h-8 flex items-center justify-center bg-primary rounded-full me-2 rtl:me-0 rtl:ms-2 text-white font-bold text-sm">
                             {{ player.number }}
                           </div>
                           <div>
                             <h4 class="text-lg font-bold text-white">{{ player.name }}</h4>
                             <p class="text-sm text-gray-300">{{ player.position }}</p>
                           </div>
                         </div>
                       </div>
                     </div>
                     <div class="p-4">
                       <div class="flex justify-between mb-3 text-xs">
                         <div class="flex items-center text-gray-300">
                           <span class="text-base me-1 rtl:me-0 rtl:ms-1">🌍</span>
                           <span>{{ player.nation }}</span>
                         </div>
                         <span class="text-gray-300">{{ $t('team.age') }}: {{ player.age }}</span>
                       </div>
                       <div class="space-y-1.5">
                         <div v-for="stat in player.stats" :key="stat.labelKey" class="flex justify-between text-xs">
                           <span class="text-gray-400">{{ t(stat.labelKey) }}:</span>
                           <span class="text-white font-medium">{{ stat.value }}</span>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
              </div>

              <div v-if="players.forwards.length > 0" class="mb-12">
                <div class="flex items-center mb-6">
                  <span class="text-primary text-2xl me-3 rtl:me-0 rtl:ms-3">⚡</span>
                  <h3 class="text-xl font-bold text-white">{{ $t('team.forwards') }}</h3>
                </div>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div v-for="player in players.forwards" :key="player.id" class="player-card bg-gray-800 rounded-xl overflow-hidden border border-transparent hover:border-primary/50 transition-all duration-300">
                     <div class="relative">
                       <img :src="player.image" :alt="player.name" class="w-full h-64 object-cover object-top">
                       <div class="absolute bottom-0 start-0 end-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                         <div class="flex items-center">
                           <div class="w-8 h-8 flex items-center justify-center bg-primary rounded-full me-2 rtl:me-0 rtl:ms-2 text-white font-bold text-sm">
                             {{ player.number }}
                           </div>
                           <div>
                             <h4 class="text-lg font-bold text-white">{{ player.name }}</h4>
                             <p class="text-sm text-gray-300">{{ player.position }}</p>
                           </div>
                         </div>
                       </div>
                     </div>
                     <div class="p-4">
                       <div class="flex justify-between mb-3 text-xs">
                         <div class="flex items-center text-gray-300">
                            <span class="text-base me-1 rtl:me-0 rtl:ms-1">🌍</span>
                           <span>{{ player.nation }}</span>
                         </div>
                         <span class="text-gray-300">{{ $t('team.age') }}: {{ player.age }}</span>
                       </div>
                       <div class="space-y-1.5">
                         <div v-for="stat in player.stats" :key="stat.labelKey" class="flex justify-between text-xs">
                           <span class="text-gray-400">{{ t(stat.labelKey) }}:</span>
                           <span class="text-white font-medium">{{ stat.value }}</span>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
              </div>

            </div>

             <aside class="lg:w-1/3 space-y-8 lg:sticky lg:top-[140px] h-fit">
                 <div class="bg-gray-800 rounded-xl overflow-hidden">
                    <div class="bg-primary px-4 py-3">
                    <h3 class="text-white font-bold">{{ $t('team.coachingStaff') }}</h3>
                    </div>
                    <div class="p-4 space-y-4">
                    <div v-for="staff in coachingStaff" :key="staff.id" class="staff-card bg-gray-900 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
                        <div class="flex items-center p-3">
                           <div class="w-16 h-16 rounded-full overflow-hidden me-4 rtl:me-0 rtl:ms-4 flex-shrink-0">
                             <img :src="staff.image" :alt="staff.name" class="w-full h-full object-cover object-top">
                           </div>
                            <div>
                                <h4 class="font-bold text-white text-base leading-tight">{{ staff.name }}</h4>
                                <p class="text-xs text-primary mt-1">{{ t(staff.roleKey) }}</p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="bg-gray-800 rounded-xl overflow-hidden">
                    <div class="bg-primary px-4 py-3">
                      <h3 class="text-white font-bold">{{ $t('team.teamNews') }}</h3>
                    </div>
                    <div class="p-4">
                        <div class="space-y-4">
                            <div v-for="news in sidebarNews" :key="news.id" class="bg-gray-900 rounded-lg overflow-hidden group">
                                <NuxtLink :to="localePath(news.link)">
                                    <img :src="news.image" :alt="t(news.titleKey)" class="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300">
                                    <div class="p-3">
                                        <span class="text-xs text-primary">{{ news.date }}</span>
                                        <h4 class="text-white font-bold text-sm mt-1 mb-1 line-clamp-2 group-hover:text-accent-yellow transition-colors">{{ t(news.titleKey) }}</h4>
                                        <span class="text-xs text-accent-orange group-hover:text-accent-yellow transition-colors flex items-center">
                                           {{ $t('news.readMore') }} <span class="ms-1 rtl:ms-0 rtl:me-1">→</span>
                                        </span>
                                    </div>
                                </NuxtLink>
                            </div>
                        </div>
                        <div class="mt-4 text-center">
                            <NuxtLink :to="localePath('/news')" class="text-primary hover:text-accent-yellow transition-colors flex items-center justify-center font-medium text-sm">
                            {{ $t('team.viewAllTeamNews') }}
                            <span class="ms-1 rtl:ms-0 rtl:me-1">→</span>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </aside>
          </div>
        </div>
      </section>
    </main>

    <GlobalFooter />
  </div>
</template>

<style scoped>
.player-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 15px -3px rgba(0, 67, 158, 0.2), 0 4px 6px -4px rgba(0, 67, 158, 0.1); /* Adjusted shadow to primary blue */
}
.team-stats-item {
    position: relative;
}
.team-stats-item-fill {
    position: absolute;
    top: 0;
    left: 0; /* LTR default */
    [dir='rtl'] & { /* RTL specific */
        left: auto;
        right: 0;
    }
    height: 100%;
    border-radius: inherit;
    transition: width 0.5s ease-in-out;
}
.line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: theme('colors.primary.DEFAULT');
  border-radius: 4px;
}
</style>