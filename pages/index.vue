<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import GlobalHeader from '~/components/global/Header.vue';
import GlobalFooter from '~/components/global/Footer.vue';
import NewsArticleCard from '~/components/news/NewsArticleCard.vue'; // Reuse the news card
import { useI18n, useLocalePath } from '#imports';

const { t } = useI18n();
const localePath = useLocalePath();

// --- Placeholder Data (Keep consistent or fetch real data) ---
const sampleNews = ref([
  { id: 1, category: 'firstteam', titleKey: 'news.sample1.title', date: '2025-04-20', image: '/club-images/al_olympic_sc_players_18_19_celebrating_training.jpg', summaryKey: 'news.sample1.summary' },
  { id: 2, category: 'transfers', titleKey: 'news.sample2.title', date: '2025-04-19', image: '/club-images/al_olympic_sc_officials_associates_meeting_indoor.jpg', summaryKey: 'news.sample2.summary' },
  { id: 3, category: 'clubnews', titleKey: 'news.sample3.title', date: '2025-04-15', image: '/club-images/al_olympic_sc_2024_2025_squad_photo.jpg', summaryKey: 'news.sample3.summary' },
]);

const upcomingMatches = ref([
  { id: 102, status: 'upcoming', competition: 'Premier League', date: 'April 26', time: '20:00', homeTeam: 'Al-Olympi', homeLogo: 'https://via.placeholder.com/80x80/00439e/ffffff?text=LFC', awayTeam: 'FC Riviera', awayLogo: 'https://via.placeholder.com/80x80/f1c40f/000000?text=FCR' },
  { id: 103, status: 'upcoming', competition: 'National Cup', date: 'May 3', time: '18:30', homeTeam: 'United SC', homeLogo: 'https://via.placeholder.com/80x80/27ae60/ffffff?text=USC', awayTeam: 'Al-Olympi', awayLogo: 'https://via.placeholder.com/80x80/00439e/ffffff?text=LFC' },
]);

const featuredPlayer = ref({
  name: 'Ahmed Al-Farsi', // Match captain section
  position: 'Defensive Midfielder',
  number: 4,
  image: '/club-images/al_olympic_sc_player_portrait_1_blue_jacket.jpg',
  stats: [
      { labelKey: 'team.appearances', value: 32 }, // Use keys from team page
      { labelKey: 'team.tacklesWon', value: '76%' },
      { labelKey: 'team.passCompletion', value: '92%' },
  ]
});

const galleryItems = ref([ // Use items consistent with gallery page
  { id: 1, src: '/club-images/al_olympic_sc_players_running_drill_training.jpg', alt: 'Players running drill' },
  { id: 5, src: '/club-images/al_olympic_sc_player_24_posing_training_cone.jpg', alt: 'Player posing by cone' },
  { id: 3, src: '/club-images/al_olympic_sc_players_18_19_celebrating_training.jpg', alt: 'Players celebrating' },
  { id: 4, src: '/club-images/al_olympic_sc_team_training_session_stadium_view.jpg', alt: 'Team training stadium view' },
  { id: 7, src: '/club-images/al_olympic_sc_team_huddle_rain_training.jpg', alt: 'Team huddle in rain' },
]);

const sponsors = ref([
  { id: 1, name: 'Main Sponsor', logo: 'https://via.placeholder.com/200x80/eeeeee/333333?text=MAIN+SPONSOR+LOGO', link: '#' },
  { id: 2, name: 'Gold Sponsor', logo: 'https://via.placeholder.com/180x70/eeeeee/333333?text=GOLD+SPONSOR', link: '#' },
  { id: 3, name: 'Technical Partner', logo: 'https://via.placeholder.com/160x60/eeeeee/333333?text=KIT+SUPPLIER', link: '#' },
  { id: 4, name: 'Official Partner', logo: 'https://via.placeholder.com/150x50/eeeeee/333333?text=PARTNER', link: '#' },
]);

const showScrollIndicator = ref(true);
onMounted(() => {
  const handleScroll = () => { showScrollIndicator.value = window.scrollY < 50; };
  window.addEventListener('scroll', handleScroll);
  onUnmounted(() => { window.removeEventListener('scroll', handleScroll); });
});

const clubFoundationYear = 1947;
</script>

<template>
  <div class="bg-black text-gray-100">
    <GlobalHeader />

    <main>
      <section class="relative min-h-[80vh] md:min-h-screen flex items-center justify-center text-center overflow-hidden">
        <div class="absolute inset-0 z-0">
           <img src="/club-images/al_olympic_sc_team_training_session_stadium_view.jpg" alt="Hero background - Al-Olympi team training" class="w-full h-full object-cover object-center scale-105 opacity-40">
           <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-gray-900/60 to-black/95"></div>
        </div>

        <div class="relative z-10 container mx-auto px-4 py-24">
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-extrabold font-heading mb-4 uppercase tracking-tight text-white drop-shadow-lg">
             {{ $t('home.hero.title') }}
          </h1>
          <p class="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-sans text-gray-300 drop-shadow-md">
             {{ $t('home.hero.subtitle') }}
          </p>
          <div class="space-x-4 rtl:space-x-reverse">
            <NuxtLink
              :to="localePath('/news')"
              class="inline-flex items-center justify-center px-8 py-4 border-2 border-transparent text-base font-bold rounded-xl shadow-lg text-gray-900 bg-accent-yellow hover:bg-white focus:outline-none focus:ring-4 focus:ring-accent-yellow/50 transition-all duration-300 transform hover:scale-105 uppercase tracking-wider"
            >
              {{ $t('home.hero.buttonNews') }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/matches')"
              class="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-base font-bold rounded-xl shadow-lg text-white bg-primary hover:bg-accent hover:border-accent focus:outline-none focus:ring-4 focus:ring-primary/50 transition-all duration-300 transform hover:scale-105 uppercase tracking-wider"
            >
              {{ $t('home.hero.buttonMatches') }}
            </NuxtLink>
          </div>
        </div>

         <div v-if="showScrollIndicator" class="absolute bottom-10 inset-x-0 z-10 animate-bounce flex justify-center">
            <span class="text-gray-400 text-4xl">↓</span>
         </div>
      </section>

      <section class="py-20 lg:py-28 bg-gray-900">
        <div class="container mx-auto px-4">
          <h2 class="text-4xl md:text-5xl font-bold font-heading text-center mb-16 text-white uppercase tracking-wide">{{ $t('home.latestUpdates.title') }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <NewsArticleCard v-for="item in sampleNews" :key="item.id" :article="item" />
          </div>
           <div class="text-center mt-16">
               <NuxtLink
                 :to="localePath('/news')"
                 class="inline-flex items-center justify-center px-10 py-4 border-2 border-gray-600 text-base font-bold rounded-xl text-gray-300 bg-transparent hover:bg-gray-800 hover:border-gray-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-700 transition-colors duration-300 uppercase tracking-wider"
               >
                 {{ $t('home.latestUpdates.viewAll') }}
               </NuxtLink>
           </div>
        </div>
      </section>

      <section class="py-20 lg:py-28 bg-secondary/10">
        <div class="container mx-auto px-4">
          <h2 class="text-4xl md:text-5xl font-bold font-heading text-center mb-16 text-white uppercase tracking-wide">{{ $t('home.upcomingMatches.title') }}</h2>
          <div class="max-w-4xl mx-auto space-y-6">
             <div v-for="(match, index) in upcomingMatches" :key="match.id"
                  class="bg-gray-800/70 p-5 rounded-2xl shadow-lg flex flex-col sm:flex-row justify-between items-center border border-gray-700/50 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm">
                 <span class="absolute top-2 right-2 rtl:right-auto rtl:left-2 text-xs uppercase font-bold bg-primary/80 text-white px-2 py-0.5 rounded-md">{{ match.competition }}</span>
                 <div class="flex items-center justify-center space-x-4 rtl:space-x-reverse mb-4 sm:mb-0 flex-grow">
                     <div class="text-end rtl:text-start">
                         <img :src="match.homeLogo" :alt="(match.homeTeamKey ? t(match.homeTeamKey) : match.homeTeam) + ' Logo'" class="h-14 w-14 md:h-16 md:w-16 mx-auto mb-1 rounded-full shadow-md bg-white p-0.5">
                         <span class="text-sm md:text-base font-semibold text-white block truncate max-w-[100px] sm:max-w-[150px]">{{ match.homeTeamKey ? t(match.homeTeamKey) : match.homeTeam }}</span>
                     </div>
                     <span class="text-xl md:text-2xl font-bold text-gray-400 mt-8">vs</span>
                     <div class="text-start rtl:text-end">
                          <img :src="match.awayLogo" :alt="(match.awayTeamKey ? t(match.awayTeamKey) : match.awayTeam) + ' Logo'" class="h-14 w-14 md:h-16 md:w-16 mx-auto mb-1 rounded-full shadow-md bg-white p-0.5">
                          <span class="text-sm md:text-base font-semibold text-white block truncate max-w-[100px] sm:max-w-[150px]">{{ match.awayTeamKey ? t(match.awayTeamKey) : match.awayTeam }}</span>
                     </div>
                 </div>
                 <div class="text-center sm:border-s rtl:sm:border-s-0 rtl:sm:border-e border-gray-700 sm:ps-5 rtl:sm:ps-0 rtl:sm:pe-5 sm:ms-5 rtl:sm:ms-0 rtl:sm:me-5 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-700 w-full sm:w-auto flex-shrink-0">
                    <p class="text-base md:text-lg font-bold text-accent-yellow uppercase">{{ match.date }}</p>
                    <p class="text-xl md:text-2xl font-bold text-white mb-1">{{ match.time }}</p>
                    <NuxtLink :to="localePath(`/matches/${match.id}`)" class="inline-block mt-2 px-4 py-1.5 text-xs font-bold rounded-full text-gray-900 bg-accent-yellow hover:bg-white focus:outline-none transition-colors duration-300 uppercase">
                         {{ $t('home.upcomingMatches.details') }}
                     </NuxtLink>
                 </div>
             </div>
          </div>
           <div class="text-center mt-16">
                <NuxtLink
                  :to="localePath('/matches')"
                  class="inline-flex items-center justify-center px-10 py-4 border-2 border-accent-orange text-base font-bold rounded-xl text-accent-orange bg-transparent hover:bg-accent-orange/10 hover:border-accent-yellow hover:text-accent-yellow focus:outline-none focus:ring-4 focus:ring-accent-orange/50 transition-colors duration-300 uppercase tracking-wider"
                >
                  {{ $t('home.upcomingMatches.viewAll') }}
                </NuxtLink>
           </div>
        </div>
      </section>

       <section class="relative py-20 lg:py-32 bg-gray-900 overflow-hidden">
          <div class="absolute inset-y-0 end-0 w-1/2 opacity-10">
              <img src="/club-images/al_olympic_sc_team_training_session_stadium_view.jpg" alt="background pattern - stadium view" class="h-full w-full object-cover">
          </div>
         <div class="container mx-auto px-4 text-center relative z-10">
           <h2 class="text-4xl md:text-5xl font-bold font-heading mb-16 text-white uppercase tracking-wide">{{ $t('home.playerSpotlight.title') }}</h2>
           <div class="max-w-md mx-auto bg-gradient-to-br from-primary via-secondary to-gray-900 p-1 rounded-3xl shadow-2xl">
               <NuxtLink :to="localePath('/team')" class="block bg-secondary rounded-[22px] p-8 relative overflow-hidden group transition-transform duration-300 hover:scale-[1.02]">
                    <img :src="featuredPlayer.image" :alt="featuredPlayer.name" class="w-full h-auto rounded-xl mb-6 shadow-lg object-cover max-h-[400px] group-hover:scale-105 transition-transform duration-500 ease-out">
                    <div class="absolute top-8 start-8 rtl:start-auto rtl:end-8 bg-black/50 p-3 rounded-lg backdrop-blur-sm">
                        <span class="text-5xl font-bold font-heading text-accent-yellow">{{ featuredPlayer.number }}</span>
                    </div>
                    <h3 class="text-3xl font-extrabold font-heading mb-1 text-white uppercase tracking-tight">{{ featuredPlayer.name }}</h3>
                    <p class="text-lg font-semibold text-primary mb-6 uppercase tracking-wide">{{ featuredPlayer.position }}</p>
                    <div class="flex justify-center space-x-6 rtl:space-x-reverse border-t border-gray-700 pt-6">
                        <div v-for="stat in featuredPlayer.stats" :key="stat.labelKey" class="text-center">
                            <p class="text-3xl font-bold font-heading text-accent-yellow">{{ stat.value }}</p>
                            <p class="text-xs text-gray-400 uppercase tracking-wider">{{ $t(stat.labelKey) }}</p>
                        </div>
                    </div>
               </NuxtLink>
           </div>
            <div class="mt-16">
               <NuxtLink
                 :to="localePath('/team')"
                 class="inline-flex items-center justify-center px-10 py-4 border-2 border-gray-600 text-base font-bold rounded-xl text-gray-300 bg-transparent hover:bg-gray-800 hover:border-gray-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-700 transition-colors duration-300 uppercase tracking-wider"
               >
                 {{ $t('home.playerSpotlight.viewTeam') }}
               </NuxtLink>
           </div>
         </div>
       </section>

      <section class="py-20 lg:py-28 bg-secondary text-gray-200">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div class="md:pe-8 rtl:pe-0 rtl:ps-8">
              <h2 class="text-4xl md:text-5xl font-bold font-heading mb-6 text-white uppercase tracking-wide">{{ $t('home.clubLegacy.title') }}</h2>
              <p class="font-sans text-lg mb-8 leading-relaxed text-gray-300">
                {{ $t('home.clubLegacy.description', { year: clubFoundationYear }) }}
              </p>
              <NuxtLink
                :to="localePath('/history')"
                class="inline-flex items-center justify-center px-8 py-4 border-2 border-transparent text-base font-bold rounded-xl shadow-lg text-gray-900 bg-accent-yellow hover:bg-white focus:outline-none focus:ring-4 focus:ring-accent-yellow/50 transition-colors duration-300 transform hover:scale-105 uppercase tracking-wider"
              >
                {{ $t('home.clubLegacy.button') }}
              </NuxtLink>
            </div>
            <div class="relative aspect-w-4 aspect-h-3">
              <img src="https://via.placeholder.com/600x450/cccccc/000000?text=Vintage+Team+Photo+or+Trophy+Win" alt="Club History Snippet" class="rounded-2xl shadow-xl w-full h-full object-cover border-4 border-gray-700">
            </div>
          </div>
        </div>
      </section>

       <section class="py-20 lg:py-28 bg-gray-900">
         <div class="container mx-auto px-4">
           <h2 class="text-4xl md:text-5xl font-bold font-heading text-center mb-16 text-white uppercase tracking-wide">{{ $t('home.mediaHub.title') }}</h2>
           <div class="relative">
             <div class="flex space-x-8 rtl:space-x-reverse overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory -mx-4 px-4 custom-scrollbar">
                <div v-for="item in galleryItems" :key="item.id" class="flex-shrink-0 w-5/6 sm:w-2/3 md:w-1/2 lg:w-2/5 snap-center">
                  <NuxtLink :to="localePath('/gallery')" class="block bg-secondary rounded-2xl overflow-hidden shadow-lg group aspect-video border-2 border-transparent hover:border-primary transition-all duration-300">
                      <img :src="item.src" :alt="item.alt" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
                  </NuxtLink>
                </div>
             </div>
             <div class="absolute inset-y-0 start-0 hidden md:flex items-center pointer-events-none">
                  <div class="w-16 h-full bg-gradient-to-r rtl:bg-gradient-to-l from-gray-900 to-transparent"></div>
             </div>
              <div class="absolute inset-y-0 end-0 hidden md:flex items-center pointer-events-none">
                  <div class="w-16 h-full bg-gradient-to-l rtl:bg-gradient-to-r from-gray-900 to-transparent"></div>
             </div>
           </div>
            <div class="text-center mt-16">
               <NuxtLink
                 :to="localePath('/gallery')"
                 class="inline-flex items-center justify-center px-10 py-4 border-2 border-primary text-base font-bold rounded-xl text-primary-foreground bg-primary hover:bg-accent hover:border-accent focus:outline-none focus:ring-4 focus:ring-primary/50 transition-colors duration-300 uppercase tracking-wider"
               >
                 {{ $t('home.mediaHub.viewAll') }}
               </NuxtLink>
           </div>
         </div>
       </section>

      <section class="py-20 lg:py-24 bg-gray-100">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl md:text-4xl font-bold font-heading text-center mb-12 text-gray-800 uppercase tracking-wide">{{ $t('home.sponsors.title') }}</h2>
          <div class="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            <a v-for="sponsor in sponsors" :key="sponsor.id" :href="sponsor.link" target="_blank" rel="noopener noreferrer" class="opacity-70 hover:opacity-100 transition-opacity duration-300 transform hover:scale-110">
              <img :src="sponsor.logo" :alt="sponsor.name" class="max-h-14 md:max-h-16 object-contain">
            </a>
          </div>
           <div class="text-center mt-16">
               <NuxtLink
                 :to="localePath('/sponsors')"
                 class="inline-flex items-center justify-center px-8 py-3 border-2 border-accent-orange text-base font-medium rounded-xl text-accent-orange bg-transparent hover:bg-accent-orange/10 hover:text-accent-orange/90 focus:outline-none focus:ring-4 focus:ring-accent-orange/30 transition-colors duration-300 uppercase tracking-wider"
               >
                 {{ $t('home.sponsors.button') }}
               </NuxtLink>
           </div>
        </div>
      </section>
    </main>

    <GlobalFooter />
  </div>
</template>

<style>
.scroll-smooth { scroll-behavior: smooth; }
.snap-x { scroll-snap-type: x mandatory; }
.snap-center { scroll-snap-align: center; }
.line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.line-clamp-3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}
.aspect-video { position: relative; padding-bottom: 56.25%; }
.aspect-video > * { position: absolute; height: 100%; width: 100%; inset: 0px; object-fit: cover; }
.aspect-w-4 { position: relative; padding-bottom: 75%; }
.aspect-h-3 { position: relative; }
.aspect-w-4 > *, .aspect-h-3 > * { position: absolute; height: 100%; width: 100%; inset: 0px; object-fit: cover; }


.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: theme('colors.primary.DEFAULT / 0.6');
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
   background-color: theme('colors.primary.DEFAULT');
}
</style>