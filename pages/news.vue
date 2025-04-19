<script setup lang="ts">
import { ref } from 'vue';
import GlobalHeader from '~/components/global/Header.vue';
import GlobalFooter from '~/components/global/Footer.vue';
import NewsArticleCard from '~/components/news/NewsArticleCard.vue';
import { useI18n, useLocalePath } from '#imports';

const { t } = useI18n();
const localePath = useLocalePath();

const activeFilter = ref('ALL');
const filters = ['ALL', 'FIRST TEAM', 'ACADEMY', 'CLUB NEWS', 'TRANSFERS'];

// Placeholder news data - replace with actual data fetching
const newsItems = ref([
  { id: 1, category: 'FIRST TEAM', titleKey: 'news.sample1.title', date: '2024-07-28', image: 'https://via.placeholder.com/600x400/00439e/ffffff?text=News+Image+1', link: '/news/1' },
  { id: 2, category: 'ACADEMY', titleKey: 'news.sample2.title', date: '2024-07-27', image: 'https://via.placeholder.com/600x400/ff7f00/ffffff?text=News+Image+2', link: '/news/2' },
  { id: 3, category: 'CLUB NEWS', titleKey: 'news.sample3.title', date: '2024-07-26', image: 'https://via.placeholder.com/600x400/0066cc/ffffff?text=News+Image+3', link: '/news/3' },
  { id: 4, category: 'FIRST TEAM', titleKey: 'news.sample4.title', date: '2024-07-25', image: 'https://via.placeholder.com/600x400/002b5c/ffffff?text=News+Image+4', link: '/news/4' },
  { id: 5, category: 'TRANSFERS', titleKey: 'news.sample5.title', date: '2024-07-24', image: 'https://via.placeholder.com/600x400/ffd700/333333?text=News+Image+5', link: '/news/5' },
  { id: 6, category: 'FIRST TEAM', titleKey: 'news.sample6.title', date: '2024-07-23', image: 'https://via.placeholder.com/600x400/c0392b/ffffff?text=News+Image+6', link: '/news/6' },
]);

const filteredNews = computed(() => {
  if (activeFilter.value === 'ALL') {
    return newsItems.value;
  }
  return newsItems.value.filter(item => item.category === activeFilter.value);
});

// Placeholder pagination logic
const currentPage = ref(1);
const itemsPerPage = 6;
const totalPages = computed(() => Math.ceil(filteredNews.value.length / itemsPerPage));

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredNews.value.slice(start, end);
});

function changePage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function setActiveFilter(filter: string) {
  activeFilter.value = filter;
  currentPage.value = 1; // Reset to first page on filter change
}
</script>

<template>
  <div class="bg-gray-900 text-gray-100">
    <GlobalHeader />

    <main>
      <!-- Page Title Section -->
      <section class="bg-gradient-to-b from-primary to-secondary py-16 lg:py-20">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-white uppercase tracking-tight drop-shadow-lg">
            {{ $t('news.pageTitle') }}
          </h1>
        </div>
      </section>

      <!-- Category Filter Bar -->
      <section class="py-8 bg-gray-800 sticky top-[64px] md:top-[80px] z-40 shadow-md border-b border-gray-700">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap justify-center gap-3 md:gap-4">
            <button
              v-for="filter in filters"
              :key="filter"
              @click="setActiveFilter(filter)"
              :class="[
                'px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 focus-visible:ring-accent-orange',
                activeFilter === filter
                  ? 'bg-accent-orange text-gray-900 shadow-md scale-105'
                  : 'bg-gray-700 text-gray-300 hover:bg-primary hover:text-white hover:shadow-sm'
              ]"
            >
              {{ $t(`news.filters.${filter.toLowerCase().replace(' ', '')}`) }}
            </button>
          </div>
        </div>
      </section>

      <!-- Main News Grid -->
      <section class="py-16 lg:py-20 bg-gray-900">
        <div class="container mx-auto px-4">
          <!-- Add transition group for animations -->
          <transition-group
            tag="div"
            name="news-list"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          >
            <NewsArticleCard v-for="item in paginatedNews" :key="item.id" :article="item" />
          </transition-group>
        </div>
      </section>

      <!-- Pagination Controls -->
      <section v-if="totalPages > 1" class="py-12 bg-gray-900 border-t border-gray-700/50">
        <div class="container mx-auto px-4">
          <nav class="flex justify-center items-center space-x-1 md:space-x-2">
            <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-2 md:px-4 rounded-lg text-xs md:text-sm font-semibold uppercase transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-accent-orange"
              :class="currentPage === 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-60' : 'bg-gray-700 text-gray-300 hover:bg-primary hover:text-white hover:shadow-sm'"
            >
              {{ $t('pagination.previous') }}
            </button>

            <button
              v-for="page in totalPages"
              :key="page"
              @click="changePage(page)"
              class="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-lg text-xs md:text-sm font-semibold uppercase transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-accent-orange"
              :class="currentPage === page ? 'bg-accent-orange text-gray-900 shadow-md scale-105' : 'bg-gray-700 text-gray-300 hover:bg-primary hover:text-white hover:shadow-sm'"
            >
              {{ page }}
            </button>

            <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-2 md:px-4 rounded-lg text-xs md:text-sm font-semibold uppercase transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-accent-orange"
              :class="currentPage === totalPages ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-60' : 'bg-gray-700 text-gray-300 hover:bg-primary hover:text-white hover:shadow-sm'"
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
/* Basic transition for list items */
.news-list-enter-active,
.news-list-leave-active {
  transition: all 0.5s ease;
}
.news-list-enter-from,
.news-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* Ensure layout shifts are smooth */
.news-list-move {
  transition: transform 0.5s ease;
}

/* Keep existing styles if needed, otherwise Tailwind handles most */
.line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.aspect-video {
    aspect-ratio: 16 / 9;
}
</style>