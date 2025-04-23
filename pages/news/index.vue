<script setup lang="ts">
import { ref, computed } from 'vue';
import GlobalHeader from '~/components/global/Header.vue';
import GlobalFooter from '~/components/global/Footer.vue';
import NewsArticleCard from '~/components/news/NewsArticleCard.vue';
import { useI18n, useLocalePath } from '#imports';
import { ArrowRight } from 'lucide-vue-next'; // Import used icon

const { t } = useI18n();
const localePath = useLocalePath();

const activeFilter = ref('all'); // Default filter key

const filters = ref([
  { key: 'all', labelKey: 'news.filters.all' },
  { key: 'firstteam', labelKey: 'news.filters.firstteam' },
  { key: 'transfers', labelKey: 'news.filters.transfers' },
  { key: 'clubnews', labelKey: 'news.filters.clubnews' },
  // Add 'academy' if needed and defined in locale files
]);

// Placeholder news data - categories match simplified keys
const allNewsItems = ref([
  // Updated image paths to use local club images
  { id: 1, category: 'firstteam', titleKey: 'news.sample1.title', date: '2025-04-20', image: '/club-images/al_olympic_sc_team_training_session_stadium_view.jpg', summaryKey: 'news.sample1.summary' },
  { id: 2, category: 'transfers', titleKey: 'news.sample2.title', date: '2025-04-19', image: '/club-images/al_olympic_sc_officials_associates_meeting_indoor.jpg', summaryKey: 'news.sample2.summary' },
  { id: 3, category: 'clubnews', titleKey: 'news.sample3.title', date: '2025-04-15', image: '/club-images/al_olympic_sc_2024_2025_squad_photo.jpg', summaryKey: 'news.sample3.summary' },
  { id: 4, category: 'firstteam', titleKey: 'news.sample4.title', date: '2025-04-14', image: '/club-images/al_olympic_sc_players_running_drill_training.jpg', summaryKey: 'news.sample4.summary' },
  { id: 5, category: 'clubnews', titleKey: 'news.sample5.title', date: '2025-04-12', image: '/club-images/supporter_al_olympic_sc_fino_alla_morte_scarf.jpg', summaryKey: 'news.sample5.summary' },
  { id: 6, category: 'firstteam', titleKey: 'news.sample6.title', date: '2025-04-10', image: '/club-images/al_olympic_sc_player_portrait_1_blue_jacket.jpg', summaryKey: 'news.sample6.summary' },
  { id: 7, category: 'clubnews', titleKey: 'news.sample3.title', date: '2025-04-08', image: '/club-images/al_olympic_sc_associate_official_portrait_dark_shirt.jpg', summaryKey: 'news.sample3.summary' },
  { id: 8, category: 'transfers', titleKey: 'news.sample5.title', date: '2025-04-06', image: '/club-images/two_al_olympic_sc_players_seated_indoors.jpg', summaryKey: 'news.sample5.summary' },
  { id: 9, category: 'clubnews', titleKey: 'news.sample1.title', date: '2025-04-03', image: '/club-images/al_olympic_sc_team_huddle_rain_training.jpg', summaryKey: 'news.sample1.summary' },
]);

const featuredArticle = computed(() => allNewsItems.value.find(item => item.id === 3) || allNewsItems.value[0]);
const popularNews = computed(() => allNewsItems.value.slice(0, 5));

const filteredNews = computed(() => {
  const itemsToFilter = allNewsItems.value.filter(item => item.id !== featuredArticle.value.id);
  if (activeFilter.value === 'all') {
    return itemsToFilter;
  }
  return itemsToFilter.filter(item => item.category === activeFilter.value);
});

const currentPage = ref(1);
const itemsPerPage = 9; // Number of items for the main grid
const totalPages = computed(() => Math.ceil(filteredNews.value.length / itemsPerPage));

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredNews.value.slice(start, end);
});

function changePage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    const gridElement = document.getElementById('latest-news-grid');
    if (gridElement) {
        window.scrollTo({ top: gridElement.offsetTop - 120, behavior: 'smooth' }); // Adjust offset as needed
    }
  }
}

function setActiveFilter(filterKey: string) {
  activeFilter.value = filterKey;
  currentPage.value = 1;
}

const getCategoryCount = (categoryKey: string): number => {
    if (categoryKey === 'all') return allNewsItems.value.length;
    return allNewsItems.value.filter(item => item.category === categoryKey).length;
};

const categoryStats = computed(() => [
    { key: 'all', labelKey: 'news.filters.all', count: getCategoryCount('all')},
    { key: 'firstteam', labelKey: 'news.filters.firstteam', count: getCategoryCount('firstteam')},
    { key: 'transfers', labelKey: 'news.filters.transfers', count: getCategoryCount('transfers')},
    { key: 'clubnews', labelKey: 'news.filters.clubnews', count: getCategoryCount('clubnews')},
]);

// Helper for category tag styling
const getCategoryTagClass = (categoryKey: string | undefined) => {
    switch (categoryKey) {
        case 'firstteam': return 'bg-primary text-white';
        case 'transfers': return 'bg-accent-orange text-white';
        case 'clubnews': return 'bg-green-500 text-white'; // Example color
        default: return 'bg-gray-500 text-white';
    }
}
</script>

<template>
  <div class="bg-black text-gray-100 min-h-screen flex flex-col">
    <GlobalHeader />

    <main class="flex-grow">
      <!-- News Filter Bar -->
      <section class="sticky top-[80px] z-40 bg-black/80 backdrop-blur-sm py-4">
        <div class="container mx-auto px-6">
          <div class="flex flex-col md:flex-row justify-between items-center gap-6 rounded-xl p-4 bg-gray-900/50 border border-gray-700">
            <div class="flex items-center space-x-2 rtl:space-x-reverse rtl:space-x-reverse overflow-x-auto w-full md:w-auto px-2 py-1">
              <button
                v-for="filter in filters"
                :key="filter.key"
                @click="setActiveFilter(filter.key)"
                :class="[
                  'px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-200 ease-in-out whitespace-nowrap focus:outline-none',
                  activeFilter === filter.key
                    ? 'bg-primary text-white'
                    : 'bg-gray-800/60 text-gray-300 hover:text-white hover:bg-gray-800'
                ]"
              >
                {{ $t(filter.labelKey) }}
              </button>
            </div>
            <div class="relative w-full md:w-64">
              <input type="text" :placeholder="$t('header.search') + '...'" class="w-full px-4 py-2 ps-10 rtl:pe-10 rtl:ps-4 bg-gray-800/60 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary text-sm hover:bg-gray-800 transition-colors">
              <div class="absolute start-3 rtl:start-auto rtl:end-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400">
                <i class="ri-search-line"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured News Section -->
      <section v-if="featuredArticle" class="py-8 bg-black">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold mb-6 text-white">{{ $t('news.featuredNews') }}</h2>
          <NuxtLink :to="localePath(`/news/${featuredArticle.id}`)" class="block relative rounded-xl overflow-hidden group">
            <div class="relative h-[400px] md:h-[500px]">
                <img :src="featuredArticle.image" :alt="t(featuredArticle.titleKey)" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            </div>
            <div class="absolute bottom-0 start-0 end-0 p-6 md:p-8">
              <div class="flex items-center gap-4 mb-3">
                 <span :class="['inline-block text-white text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wider', getCategoryTagClass(featuredArticle.category)]">
                    {{ $t(`news.categories.${featuredArticle.category}`) }}
                 </span>
                <span class="text-gray-300 text-sm">{{ featuredArticle.date }}</span>
              </div>
              <h3 class="text-2xl md:text-4xl font-bold text-white mb-4 line-clamp-2 group-hover:text-accent-yellow transition-colors duration-300">{{ t(featuredArticle.titleKey) }}</h3>
              <p class="text-gray-200 text-base md:text-lg mb-6 max-w-3xl hidden md:block line-clamp-2">{{ t(featuredArticle.summaryKey || 'news.default.summary') }}</p>
               <span class="inline-flex items-center text-base font-semibold text-primary group-hover:text-accent-yellow transition-colors duration-300 mt-2">
                                    {{ $t('news.readMore') }} <ArrowRight class="w-5 h-5 ms-1 rtl:ms-0 rtl:me-1"/>
               </span>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- Main News Content -->
      <section id="latest-news-grid" class="py-12 bg-gray-900">
        <div class="container mx-auto px-4">
          <div class="flex flex-col lg:flex-row gap-8">
            <!-- Main News Grid -->
            <div class="lg:w-3/4">
              <h2 class="text-2xl font-bold mb-6 text-white">{{ $t('news.latestNews') }}</h2>
              <transition-group
                v-if="paginatedNews.length > 0"
                tag="div"
                name="news-list"
                class="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <NewsArticleCard v-for="item in paginatedNews" :key="item.id + '-' + activeFilter" :article="item" />
              </transition-group>
              <div v-else class="text-center py-16 text-gray-400">
                 <p class="text-xl mb-4">No news articles found for this filter.</p>
                 <button @click="setActiveFilter('all')" class="text-primary hover:underline font-semibold">View All News</button>
              </div>
               <!-- Pagination -->
              <div v-if="totalPages > 1" class="mt-10 flex justify-center">
                 <nav class="flex items-center space-x-2 rtl:space-x-reverse rtl:space-x-reverse">
                   <button
                    @click="changePage(currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="w-10 h-10 flex items-center justify-center rounded-full text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-primary"
                    :class="currentPage === 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-800 hover:bg-primary'"
                  >
                    <i class="ri-arrow-left-s-line"></i>
                  </button>
                  <button
                    v-for="page in totalPages"
                    :key="page"
                    @click="changePage(page)"
                    class="w-10 h-10 flex items-center justify-center rounded-full text-white font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-primary"
                     :class="currentPage === page ? 'bg-primary scale-110' : 'bg-gray-800 hover:bg-primary/80'"
                  >
                    {{ page }}
                  </button>
                   <button
                    @click="changePage(currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    class="w-10 h-10 flex items-center justify-center rounded-full text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-primary"
                    :class="currentPage === totalPages ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-800 hover:bg-primary'"
                  >
                    <i class="ri-arrow-right-s-line"></i>
                  </button>
                </nav>
              </div>
            </div>

            <!-- Sidebar -->
             <aside class="lg:w-1/4 space-y-8 lg:sticky lg:top-[140px] h-fit">
               <div class="bg-gray-800 rounded-xl overflow-hidden">
                <div class="bg-primary px-4 py-3">
                  <h3 class="text-white font-bold">{{ $t('news.popularNews') }}</h3>
                </div>
                <div class="p-4">
                  <ul class="space-y-4">
                    <li v-for="popular in popularNews" :key="'popular-'+popular.id" class="flex gap-3 items-center group">
                      <div class="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <NuxtLink :to="localePath(`/news/${popular.id}`)">
                            <img :src="popular.image.replace(/width=\d+&height=\d+/,'width=200&height=200&orientation=squarish')" :alt="t(popular.titleKey)" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                        </NuxtLink>
                      </div>
                      <div>
                         <NuxtLink :to="localePath(`/news/${popular.id}`)">
                            <h4 class="text-white font-medium text-sm leading-snug line-clamp-2 group-hover:text-accent-yellow transition-colors">{{ t(popular.titleKey) }}</h4>
                         </NuxtLink>
                        <p class="text-gray-400 text-xs mt-1">{{ popular.date }}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="bg-gray-800 rounded-xl overflow-hidden">
                <div class="bg-primary px-4 py-3">
                  <h3 class="text-white font-bold">{{ $t('news.newsCategories') }}</h3>
                </div>
                <div class="p-4">
                  <ul class="space-y-1">
                    <li v-for="cat in categoryStats" :key="cat.key" @click="setActiveFilter(cat.key)"
                        class="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-primary/20 cursor-pointer transition-colors"
                        :class="{'bg-primary/30 font-semibold': activeFilter === cat.key}">
                        <span class="text-white text-sm">{{ t(cat.labelKey) }}</span>
                        <span class="bg-gray-700 text-white text-xs px-2 py-0.5 rounded-full">{{ cat.count }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="bg-gradient-to-r from-primary to-secondary rounded-xl overflow-hidden p-1">
                 <div class="bg-gray-800 rounded-lg p-6">
                    <h3 class="text-xl font-bold text-white mb-3">{{ $t('news.subscribeUpdates') }}</h3>
                    <p class="text-white text-opacity-90 mb-4 text-sm">{{ $t('news.subscribeDesc') }}</p>
                    <form @submit.prevent class="space-y-3">
                        <input type="email" :placeholder="t('news.emailPlaceholder')" class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                        <button type="submit" class="w-full bg-white text-primary font-bold py-3 px-6 rounded-lg transition-all hover:bg-opacity-90 transform hover:scale-105">
                            {{ $t('news.subscribeButton') }}
                        </button>
                    </form>
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
.news-list-enter-active,
.news-list-leave-active {
  transition: all 0.5s ease;
}
.news-list-enter-from,
.news-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.news-list-move {
  transition: transform 0.5s ease;
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