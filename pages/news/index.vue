<script setup lang="ts">
import { ref, computed } from 'vue';
import GlobalHeader from '~/components/global/Header.vue';
import GlobalFooter from '~/components/global/Footer.vue';
import NewsArticleCard from '~/components/news/NewsArticleCard.vue';
import { useI18n, useLocalePath } from '#imports';

const { t } = useI18n();
const localePath = useLocalePath();

const activeFilter = ref('all'); // Use lowercase keys for consistency

const filters = ref([
  { key: 'all', labelKey: 'news.filters.all' },
  { key: 'firstteam', labelKey: 'news.filters.firstteam' },
  { key: 'academy', labelKey: 'news.filters.academy' },
  { key: 'clubnews', labelKey: 'news.filters.clubnews' },
  { key: 'transfers', labelKey: 'news.filters.transfers' },
]);

// Ensure category keys match simplified filter keys
const allNewsItems = ref([
  { id: 1, category: 'firstteam', titleKey: 'news.sample1.title', date: '2024-07-28', image: 'https://via.placeholder.com/600x400/00439e/ffffff?text=News+Image+1' },
  { id: 2, category: 'academy', titleKey: 'news.sample2.title', date: '2024-07-27', image: 'https://via.placeholder.com/600x400/ff7f00/ffffff?text=News+Image+2' },
  { id: 3, category: 'clubnews', titleKey: 'news.sample3.title', date: '2024-07-26', image: 'https://via.placeholder.com/600x400/0066cc/ffffff?text=News+Image+3' },
  { id: 4, category: 'firstteam', titleKey: 'news.sample4.title', date: '2024-07-25', image: 'https://via.placeholder.com/600x400/002b5c/ffffff?text=News+Image+4' },
  { id: 5, category: 'transfers', titleKey: 'news.sample5.title', date: '2024-07-24', image: 'https://via.placeholder.com/600x400/ffd700/333333?text=News+Image+5' },
  { id: 6, category: 'firstteam', titleKey: 'news.sample6.title', date: '2024-07-23', image: 'https://via.placeholder.com/600x400/c0392b/ffffff?text=News+Image+6' },
]);

const filteredNews = computed(() => {
  if (activeFilter.value === 'all') {
    return allNewsItems.value;
  }
  return allNewsItems.value.filter(item => item.category === activeFilter.value);
});

// Pagination logic
const currentPage = ref(1);
const itemsPerPage = 9;
const totalPages = computed(() => Math.ceil(filteredNews.value.length / itemsPerPage));

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredNews.value.slice(start, end);
});

function changePage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: document.getElementById('news-grid-section')?.offsetTop || 0, behavior: 'smooth' });
  }
}

function setActiveFilter(filterKey: string) {
  activeFilter.value = filterKey;
  currentPage.value = 1;
}
</script>

<template>
  <div class="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
    <GlobalHeader />

    <main class="flex-grow">
      <section class="bg-gradient-to-br from-primary via-secondary to-gray-900 py-16 lg:py-20">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-white uppercase tracking-tight drop-shadow-lg">
            {{ $t('news.pageTitle') }}
          </h1>
        </div>
      </section>

      <section class="py-6 bg-gray-800 sticky top-[80px] z-40 shadow-lg border-b border-gray-700">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap justify-center gap-3 md:gap-4">
            <button
              v-for="filter in filters"
              :key="filter.key"
              @click="setActiveFilter(filter.key)"
              :class="[
                'px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 focus-visible:ring-accent-orange',
                activeFilter === filter.key
                  ? 'bg-accent-orange text-gray-900 shadow-md scale-105 ring-2 ring-accent-yellow/50'
                  : 'bg-gray-700 text-gray-300 hover:bg-primary hover:text-white hover:shadow-sm'
              ]"
            >
              {{ $t(filter.labelKey) }}
            </button>
          </div>
        </div>
      </section>

      <section id="news-grid-section" class="py-16 lg:py-20 bg-gray-900">
        <div class="container mx-auto px-4">
          <transition-group
            tag="div"
            name="news-list"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          >
            <NewsArticleCard v-for="item in paginatedNews" :key="item.id + '-' + activeFilter" :article="item" />
          </transition-group>

           <div v-if="paginatedNews.length === 0" class="text-center py-16 text-gray-400">
              <p class="text-xl mb-4">No news articles found for this category yet.</p>
              <button @click="setActiveFilter('all')" class="text-accent-yellow hover:underline">View All News</button>
          </div>
        </div>
      </section>

      <section v-if="totalPages > 1" class="py-12 bg-gray-900">
        <div class="container mx-auto px-4">
          <nav class="flex justify-center items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-2 md:px-4 rounded-lg text-xs md:text-sm font-semibold uppercase transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-accent-orange"
              :class="currentPage === 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-60' : 'bg-gray-600 text-gray-300 hover:bg-primary hover:text-white hover:shadow-sm'"
            >
              {{ $t('pagination.previous') }}
            </button>

            <button
              v-for="page in totalPages"
              :key="page"
              @click="changePage(page)"
              class="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-lg text-xs md:text-sm font-semibold uppercase transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-accent-orange"
              :class="currentPage === page ? 'bg-accent-orange text-gray-900 shadow-md scale-105' : 'bg-gray-600 text-gray-300 hover:bg-primary hover:text-white hover:shadow-sm'"
            >
              {{ page }}
            </button>

            <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-2 md:px-4 rounded-lg text-xs md:text-sm font-semibold uppercase transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-accent-orange"
              :class="currentPage === totalPages ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-60' : 'bg-gray-600 text-gray-300 hover:bg-primary hover:text-white hover:shadow-sm'"
            >
              {{ $t('pagination.next') }}
            </button>
          </nav>
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
</style>