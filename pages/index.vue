<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import GlobalHeader from '~/components/global/Header.vue';
import GlobalFooter from '~/components/global/Footer.vue';
// Correct imports from #imports provided by Nuxt and i18n module
import { useI18n, useLocalePath } from '#imports';

const { t } = useI18n();
const localePath = useLocalePath(); // For generating links within the current locale

const sampleNews = ref([
  { id: 1, titleKey: 'home.latestUpdates.sample1.title', summaryKey: 'home.latestUpdates.sample1.summary', image: 'https://via.placeholder.com/600x400/00439e/ffffff?text=Dynamic+Goal+Celebration+Shot', link: '/news/1' },
  { id: 2, titleKey: 'home.latestUpdates.sample2.title', summaryKey: 'home.latestUpdates.sample2.summary', image: 'https://via.placeholder.com/600x400/ff7f00/ffffff?text=Player+Holding+Jersey+Shot', link: '/news/2' },
  { id: 3, titleKey: 'home.latestUpdates.sample3.title', summaryKey: 'home.latestUpdates.sample3.summary', image: 'https://via.placeholder.com/600x400/0066cc/ffffff?text=Youth+Team+Celebrating+with+Trophy', link: '/news/3' },
])

const upcomingMatches = ref([
  { id: 1, date: 'OCT 28', time: '19:00', homeTeamKey: 'clubName', homeLogo: 'https://via.placeholder.com/50x50/00439e/ffffff?text=LFC', awayTeam: 'Rival FC', awayLogo: 'https://via.placeholder.com/50x50/c0392b/ffffff?text=RIV', competition: 'League Cup', venue: 'Home Stadium' },
  { id: 2, date: 'NOV 04', time: '15:00', homeTeam: 'City Strikers', homeLogo: 'https://via.placeholder.com/50x50/f1c40f/000000?text=CS', awayTeamKey: 'clubName', awayLogo: 'https://via.placeholder.com/50x50/00439e/ffffff?text=LFC', competition: 'Premier League', venue: 'Away Ground' },
])

const featuredPlayer = ref({
  name: 'AHMED KHALIL',
  position: 'FORWARD',
  number: 10,
  image: 'https://via.placeholder.com/400x500/cccccc/000000?text=Dynamic+Player+Action+Pose',
  stats: [
      { labelKey: 'home.playerSpotlight.goals', value: 15 },
      { labelKey: 'home.playerSpotlight.assists', value: 8 },
      { labelKey: 'home.playerSpotlight.rating', value: 88 },
  ]
})

const galleryItems = ref([
  { id: 1, src: 'https://via.placeholder.com/800x500/00439e/ffffff?text=Match+Action+1+-+Tackle', alt: 'Match Action 1' },
  { id: 2, src: 'https://via.placeholder.com/800x500/ff7f00/ffffff?text=Training+Drill', alt: 'Training Session' },
  { id: 3, src: 'https://via.placeholder.com/800x500/0066cc/ffffff?text=Fans+Cheering+with+Flares', alt: 'Fan Celebration' },
  { id: 4, src: 'https://via.placeholder.com/800x500/002b5c/ffffff?text=Close+Up+Player+Portrait', alt: 'Player Portrait' },
  { id: 5, src: 'https://via.placeholder.com/800x500/ffd700/333333?text=Stadium+Aerial+View+Night', alt: 'Stadium View' },
])

const sponsors = ref([
  { id: 1, name: 'Main Sponsor', logo: 'https://via.placeholder.com/200x80/eeeeee/333333?text=MAIN+SPONSOR+LOGO', link: '#' },
  { id: 2, name: 'Gold Sponsor', logo: 'https://via.placeholder.com/180x70/eeeeee/333333?text=GOLD+SPONSOR', link: '#' },
  { id: 3, name: 'Technical Partner', logo: 'https://via.placeholder.com/160x60/eeeeee/333333?text=KIT+SUPPLIER', link: '#' },
  { id: 4, name: 'Official Partner', logo: 'https://via.placeholder.com/150x50/eeeeee/333333?text=PARTNER', link: '#' },
])

const showScrollIndicator = ref(true);
onMounted(() => {
  const handleScroll = () => {
    showScrollIndicator.value = window.scrollY < 50;
  };
  window.addEventListener('scroll', handleScroll);
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
});

const clubFoundationYear = 1947; // Example Year
</script>

<template>
  <div class="bg-gray-900 text-gray-100">
    <GlobalHeader />

    <main>
      <!-- Hero Section -->
      <section class="relative min-h-[80vh] md:min-h-screen flex items-center justify-center text-center overflow-hidden">
        <div class="absolute inset-0 z-0">
           <img src="https://via.placeholder.com/1920x1080/cccccc/000000?text=High-Energy+Stadium+Action+Shot+or+Crowd+Shot" alt="Hero background" class="w-full h-full object-cover object-center scale-110 blur-sm opacity-40">
           <div class="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/50 to-gray-900/90"></div>
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
              class="inline-flex items-center justify-center px-8 py-4 border-2 border-transparent text-lg font-bold rounded-xl shadow-lg text-gray-900 bg-accent-yellow hover:bg-white focus:outline-none focus:ring-4 focus:ring-accent-yellow/50 transition-all duration-300 transform hover:scale-105 uppercase"
            >
              {{ $t('home.hero.buttonNews') }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/matches')"
              class="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-lg font-bold rounded-xl shadow-lg text-primary-foreground bg-primary hover:bg-accent hover:border-accent focus:outline-none focus:ring-4 focus:ring-primary/50 transition-all duration-300 transform hover:scale-105 uppercase"
            >
              {{ $t('home.hero.buttonMatches') }}
            </NuxtLink>
          </div>
        </div>

         <div v-if="showScrollIndicator" class="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
           <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
         </div>
      </section>

      <!-- Latest Updates -->
      <section class="py-20 lg:py-28 bg-gray-900">
        <div class="container mx-auto px-4">
          <h2 class="text-4xl md:text-5xl font-bold font-heading text-center mb-16 text-white uppercase tracking-wide">{{ $t('home.latestUpdates.title') }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <NuxtLink v-for="item in sampleNews" :key="item.id" :to="localePath(item.link)" class="block group bg-secondary rounded-2xl overflow-hidden shadow-xl hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-accent-orange">
                <div class="relative aspect-w-16 aspect-h-9">
                    <img :src="item.image" :alt="t(item.titleKey)" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                </div>
                <div class="p-6">
                    <h3 class="text-2xl font-bold font-heading mb-2 text-white group-hover:text-accent-yellow transition-colors duration-300 line-clamp-2 uppercase">{{ t(item.titleKey) }}</h3>
                    <p class="font-sans text-gray-300 mb-4 text-sm line-clamp-3">{{ t(item.summaryKey) }}</p>
                    <span class="inline-block text-sm font-semibold text-accent-orange group-hover:text-accent-yellow transition-colors duration-300">
                    {{ $t('home.latestUpdates.readMore') }}
                    </span>
                </div>
            </NuxtLink>
          </div>
           <div class="text-center mt-16">
               <NuxtLink
                 :to="localePath('/news')"
                 class="inline-flex items-center justify-center px-10 py-4 border-2 border-gray-600 text-base font-bold rounded-xl text-gray-300 bg-transparent hover:bg-gray-800 hover:border-gray-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-700 transition-colors duration-300 uppercase"
               >
                 {{ $t('home.latestUpdates.viewAll') }}
               </NuxtLink>
           </div>
        </div>
      </section>

      <!-- Upcoming Matches -->
      <section class="py-20 lg:py-28 bg-secondary">
        <div class="container mx-auto px-4">
          <h2 class="text-4xl md:text-5xl font-bold font-heading text-center mb-16 text-white uppercase tracking-wide">{{ $t('home.upcomingMatches.title') }}</h2>
          <div class="max-w-5xl mx-auto space-y-8">
             <div v-for="match in upcomingMatches" :key="match.id" class="bg-gray-800/50 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-center border border-gray-700 hover:border-primary transition-colors duration-300">
                <div class="flex items-center justify-center space-x-4 md:space-x-6 rtl:space-x-reverse mb-4 md:mb-0 w-full md:w-auto">
                    <div class="text-end">
                        <img :src="match.homeLogo" :alt="(match.homeTeamKey ? t(match.homeTeamKey) : match.homeTeam) + ' Logo'" class="h-12 w-12 md:h-16 md:w-16 mx-auto mb-1 rounded-full shadow-md">
                        <span class="text-sm md:text-base font-semibold text-white block truncate">{{ match.homeTeamKey ? t(match.homeTeamKey) : match.homeTeam }}</span>
                    </div>
                    <span class="text-2xl md:text-3xl font-bold text-gray-400">vs</span>
                    <div class="text-start">
                         <img :src="match.awayLogo" :alt="(match.awayTeamKey ? t(match.awayTeamKey) : match.awayTeam) + ' Logo'" class="h-12 w-12 md:h-16 md:w-16 mx-auto mb-1 rounded-full shadow-md">
                         <span class="text-sm md:text-base font-semibold text-white block truncate">{{ match.awayTeamKey ? t(match.awayTeamKey) : match.awayTeam }}</span>
                    </div>
                </div>
                <div class="text-center border-t border-b md:border-t-0 md:border-b-0 md:border-s md:border-e border-gray-700 px-4 md:px-8 py-4 md:py-0 my-4 md:my-0 w-full md:w-auto">
                    <p class="text-lg md:text-xl font-bold text-accent-yellow uppercase">{{ match.date }}</p>
                    <p class="text-2xl md:text-3xl font-bold text-white">{{ match.time }}</p>
                    <p class="text-xs text-gray-400 uppercase tracking-wider mt-1">{{ match.competition }}</p>
                </div>
                <div class="text-center w-full md:w-auto">
                    <p class="text-sm text-gray-300 mb-2">{{ match.venue }}</p>
                    <!-- Assuming match detail page uses ID, adjust if needed -->
                    <NuxtLink :to="localePath('/matches/' + match.id)" class="inline-block px-5 py-2 text-sm font-bold rounded-lg text-gray-900 bg-accent-yellow hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-accent-yellow transition-colors duration-300 uppercase">
                        {{ $t('home.upcomingMatches.details') }}
                    </NuxtLink>
                </div>
             </div>
          </div>
           <div class="text-center mt-16">
                <NuxtLink
                  :to="localePath('/matches')"
                  class="inline-flex items-center justify-center px-10 py-4 border-2 border-accent-orange text-base font-bold rounded-xl text-accent-orange bg-transparent hover:bg-accent-orange/10 hover:border-accent-yellow hover:text-accent-yellow focus:outline-none focus:ring-4 focus:ring-accent-orange/50 transition-colors duration-300 uppercase"
                >
                  {{ $t('home.upcomingMatches.viewAll') }}
                </NuxtLink>
           </div>
        </div>
      </section>

       <!-- Player Spotlight -->
       <section class="relative py-20 lg:py-32 bg-gray-900 overflow-hidden">
          <div class="absolute inset-y-0 end-0 w-1/2 opacity-10">
              <img src="https://via.placeholder.com/800x1000/cccccc/000000?text=Subtle+Geometric+Pattern+or+Stadium+Lights+Effect" alt="background pattern" class="h-full w-full object-cover">
          </div>
         <div class="container mx-auto px-4 text-center relative z-10">
           <h2 class="text-4xl md:text-5xl font-bold font-heading mb-16 text-white uppercase tracking-wide">{{ $t('home.playerSpotlight.title') }}</h2>
           <div class="max-w-lg mx-auto bg-gradient-to-br from-primary via-secondary to-gray-900 p-1 rounded-3xl shadow-2xl">
               <div class="bg-secondary rounded-2xl p-8 relative overflow-hidden">
                    <img :src="featuredPlayer.image" :alt="featuredPlayer.name" class="w-full h-auto rounded-xl mb-6 shadow-lg object-cover max-h-[400px]">
                    <div class="absolute top-8 start-8 bg-black/50 p-3 rounded-lg backdrop-blur-sm">
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
               </div>
           </div>
            <div class="mt-16">
               <NuxtLink
                 :to="localePath('/team')"
                 class="inline-flex items-center justify-center px-10 py-4 border-2 border-gray-600 text-base font-bold rounded-xl text-gray-300 bg-transparent hover:bg-gray-800 hover:border-gray-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-700 transition-colors duration-300 uppercase"
               >
                 {{ $t('home.playerSpotlight.viewTeam') }}
               </NuxtLink>
           </div>
         </div>
       </section>

      <!-- Club Legacy -->
      <section class="py-20 lg:py-28 bg-secondary text-gray-200">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div class="md:pe-8">
              <h2 class="text-4xl md:text-5xl font-bold font-heading mb-6 text-white uppercase tracking-wide">{{ $t('home.clubLegacy.title') }}</h2>
              <p class="font-sans text-lg mb-8 leading-relaxed text-gray-300">
                {{ $t('home.clubLegacy.description', { year: clubFoundationYear }) }}
              </p>
              <NuxtLink
                :to="localePath('/history')"
                class="inline-flex items-center justify-center px-8 py-4 border-2 border-transparent text-base font-bold rounded-xl shadow-lg text-gray-900 bg-accent-yellow hover:bg-white focus:outline-none focus:ring-4 focus:ring-accent-yellow/50 transition-colors duration-300 transform hover:scale-105 uppercase"
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

       <!-- Media Hub -->
       <section class="py-20 lg:py-28 bg-gray-900">
         <div class="container mx-auto px-4">
           <h2 class="text-4xl md:text-5xl font-bold font-heading text-center mb-16 text-white uppercase tracking-wide">{{ $t('home.mediaHub.title') }}</h2>
           <div class="relative">
             <div class="flex space-x-8 rtl:space-x-reverse overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory -mx-4 px-4">
                <div v-for="item in galleryItems" :key="item.id" class="flex-shrink-0 w-5/6 sm:w-2/3 md:w-1/2 lg:w-2/5 snap-center">
                  <NuxtLink :to="localePath('/media')" class="block bg-secondary rounded-2xl overflow-hidden shadow-lg group aspect-video border-2 border-transparent hover:border-primary transition-all duration-300">
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
                 :to="localePath('/media')"
                 class="inline-flex items-center justify-center px-10 py-4 border-2 border-primary text-base font-bold rounded-xl text-primary-foreground bg-primary hover:bg-accent hover:border-accent focus:outline-none focus:ring-4 focus:ring-primary/50 transition-colors duration-300 uppercase"
               >
                 {{ $t('home.mediaHub.viewAll') }}
               </NuxtLink>
           </div>
         </div>
       </section>

      <!-- Sponsors -->
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
                 class="inline-flex items-center justify-center px-8 py-3 border-2 border-accent-orange text-base font-medium rounded-xl text-accent-orange bg-transparent hover:bg-accent-orange/10 hover:text-accent-orange/90 focus:outline-none focus:ring-4 focus:ring-accent-orange/30 transition-colors duration-300 uppercase tracking-wide"
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
.aspect-w-16 { position: relative; padding-bottom: 56.25%; }
.aspect-h-9 { position: relative; }
.aspect-w-16 > *, .aspect-h-9 > * { position: absolute; height: 100%; width: 100%; inset: 0px; object-fit: cover; }
.aspect-w-4 { position: relative; padding-bottom: 75%; }
.aspect-h-3 { position: relative; }
.aspect-w-4 > *, .aspect-h-3 > * { position: absolute; height: 100%; width: 100%; inset: 0px; object-fit: cover; }
.aspect-video { position: relative; padding-bottom: 56.25%; }
.aspect-video > * { position: absolute; height: 100%; width: 100%; inset: 0px; object-fit: cover; }

.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}
.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: hsl(var(--primary) / 0.6);
  border-radius: 10px;
}
.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background-color: hsl(var(--primary));
}
</style>