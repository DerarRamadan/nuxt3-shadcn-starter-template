<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

import NewsArticleCard from '~/components/news/NewsArticleCard.vue';
import { useI18n, useLocalePath } from '#imports';
import { Facebook, Twitter, Linkedin, Mail, Link } from 'lucide-vue-next'; // Example icons

const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

// --- Placeholder Data (Replace with actual data fetching based on route.params.slug) ---
const article = ref({
  id: route.params.slug, // Use slug for demo
  category: 'FIRST TEAM', // Example category
  titleKey: `news.sample${route.params.slug}.title`, // Example title key
  date: '2024-07-28', // Example date
  author: 'Club Reporter', // Example author
  image: `https://via.placeholder.com/1920x1080/00439e/ffffff?text=Article+${route.params.slug}+Hero`, // Example image
  content: [
    { type: 'paragraph', textKey: 'news.article.placeholder.p1' },
    { type: 'heading', level: 2, textKey: 'news.article.placeholder.h2' },
    { type: 'paragraph', textKey: 'news.article.placeholder.p2' },
    { type: 'image', src: 'https://via.placeholder.com/1200x800/ff7f00/ffffff?text=In-Article+Image', altKey: 'news.article.placeholder.imageAlt', captionKey: 'news.article.placeholder.imageCaption' },
    { type: 'blockquote', textKey: 'news.article.placeholder.quote' },
    { type: 'list', items: ['news.article.placeholder.listItem1', 'news.article.placeholder.listItem2'] },
    { type: 'paragraph', textKey: 'news.article.placeholder.p3' },
  ],
});

const relatedArticles = ref([
  // Fetch related articles based on current article's category or tags
  { id: 2, category: 'ACADEMY', titleKey: 'news.sample2.title', date: '2024-07-27', image: 'https://via.placeholder.com/600x400/ff7f00/ffffff?text=News+Image+2', link: '/news/2' },
  { id: 3, category: 'CLUB NEWS', titleKey: 'news.sample3.title', date: '2024-07-26', image: 'https://via.placeholder.com/600x400/0066cc/ffffff?text=News+Image+3', link: '/news/3' },
  { id: 4, category: 'FIRST TEAM', titleKey: 'news.sample4.title', date: '2024-07-25', image: 'https://via.placeholder.com/600x400/002b5c/ffffff?text=News+Image+4', link: '/news/4' },
]);

// Computed property for category translation key
const categoryTranslationKey = computed(() => {
  return `news.categories.${article.value.category?.toLowerCase().replace(' ', '') || 'uncategorized'}`;
});

// --- Sharing Logic (Placeholder) ---
const shareUrl = computed(() => window.location.href);
const shareTitle = computed(() => t(article.value.titleKey));

const shareLinks = computed(() => [
  { name: 'Facebook', icon: Facebook, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl.value)}` },
  { name: 'Twitter', icon: Twitter, url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl.value)}&text=${encodeURIComponent(shareTitle.value)}` },
  { name: 'LinkedIn', icon: Linkedin, url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl.value)}&title=${encodeURIComponent(shareTitle.value)}` },
  { name: 'Email', icon: Mail, url: `mailto:?subject=${encodeURIComponent(shareTitle.value)}&body=${encodeURIComponent(shareUrl.value)}` },
  // { name: 'Copy Link', icon: Link, action: copyLink } // Add copy functionality if needed
]);

// Function to format date (replace with a proper date formatting library if needed)
const formatDate = (dateString: string) => {
  try {
    return new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(new Date(dateString));
  } catch (e) {
    return dateString; // Fallback
  }
};

</script>

<template>
  <div class="bg-gray-900 text-gray-100">
    <GlobalHeader />

    <main>
      <!-- Article Hero Section -->
      <section class="relative bg-gray-800 py-24 md:py-32 lg:py-40 overflow-hidden">
        <!-- Background Image -->
        <div class="absolute inset-0 z-0">
          <img :src="article.image" :alt="t(article.titleKey) + ' hero image'" class="w-full h-full object-cover object-center" />
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/50 to-transparent"></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 container mx-auto px-4 text-center">
          <!-- Category Tag -->
          <span v-if="article.category" class="inline-block bg-accent-orange text-gray-900 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
            {{ $t(categoryTranslationKey) }}
          </span>

          <!-- Article Title -->
          <h1 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-heading text-white uppercase tracking-tight drop-shadow-lg mb-4">
            {{ $t(article.titleKey) }}
          </h1>

          <!-- Metadata -->
          <div class="text-sm md:text-base text-gray-300 font-light">
            <span>{{ $t('news.article.published') }} {{ formatDate(article.date) }}</span>
            <span v-if="article.author" class="mx-2">•</span>
            <span v-if="article.author">{{ $t('news.article.by') }} {{ article.author }}</span>
          </div>
        </div>
      </section>

      <!-- Main Content Body Container -->
      <section class="bg-gray-900 pt-16 pb-20">
        <div class="container mx-auto px-4 max-w-4xl">
          <!-- Article Body -->
          <article class="prose prose-invert prose-lg lg:prose-xl max-w-none 
                        prose-headings:font-heading prose-headings:font-bold prose-headings:uppercase prose-headings:text-primary 
                        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 
                        prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-5 
                        prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6 
                        prose-a:text-accent-yellow hover:prose-a:text-accent-orange prose-a:transition-colors 
                        prose-blockquote:border-s-4 prose-blockquote:border-accent-orange prose-blockquote:ps-6 prose-blockquote:italic prose-blockquote:text-gray-400 
                        prose-ul:list-disc prose-ul:ms-6 prose-li:marker:text-accent-orange 
                        prose-ol:list-decimal prose-ol:ms-6 prose-li:marker:text-accent-orange 
                        prose-img:rounded-xl prose-img:border prose-img:border-gray-700 prose-img:my-10 
                        prose-figure:my-10 
                        prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:italic prose-figcaption:text-gray-400 prose-figcaption:mt-2">
            
            <template v-for="(block, index) in article.content" :key="index">
              <p v-if="block.type === 'paragraph'">{{ $t(block.textKey) }}</p>
              <h2 v-else-if="block.type === 'heading' && block.level === 2">{{ $t(block.textKey) }}</h2>
              <h3 v-else-if="block.type === 'heading' && block.level === 3">{{ $t(block.textKey) }}</h3>
              <!-- Add H4, H5, H6 if needed -->
              <figure v-else-if="block.type === 'image'">
                <img :src="block.src" :alt="$t(block.altKey)" />
                <figcaption v-if="block.captionKey">{{ $t(block.captionKey) }}</figcaption>
              </figure>
              <blockquote v-else-if="block.type === 'blockquote'">
                <p>{{ $t(block.textKey) }}</p>
              </blockquote>
              <ul v-else-if="block.type === 'list' && block.items">
                <li v-for="(itemKey, itemIndex) in block.items" :key="itemIndex">{{ $t(itemKey) }}</li>
              </ul>
              <!-- Add ordered list (ol) if needed -->
            </template>

          </article>

          <!-- Sharing & Actions Bar -->
          <div class="mt-12 pt-8 border-t border-gray-700/50">
            <div class="flex items-center justify-center space-x-5 rtl:space-x-reverse">
              <span class="text-sm font-semibold text-gray-400 uppercase tracking-wider me-2">{{ $t('news.article.share') }}:</span>
              <a v-for="link in shareLinks" :key="link.name" :href="link.url" target="_blank" rel="noopener noreferrer" 
                 :aria-label="`Share on ${link.name}`" 
                 class="text-gray-400 hover:text-accent-yellow hover:scale-110 transition-all duration-200">
                <component :is="link.icon" class="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <!-- Add Copy Link Button Here if needed -->
            </div>
          </div>

        </div>
      </section>

      <!-- Related Articles Section -->
      <section class="bg-gray-900 pt-16 pb-20 lg:pt-20 lg:pb-24 border-t border-gray-800">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl md:text-4xl font-bold font-heading text-white uppercase tracking-tight text-center mb-12">
            {{ $t('news.related.title') }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            <NewsArticleCard v-for="related in relatedArticles" :key="related.id" :article="related" />
          </div>
        </div>
      </section>

    </main>

    <GlobalFooter />
  </div>
</template>

<style scoped>
/* Add any component-specific styles here if needed */
/* Tailwind prose plugin handles most typography styling */

/* Optional: Add subtle parallax or zoom to hero */
/* .hero-image-animate {
  animation: slow-zoom 20s infinite alternate ease-in-out;
}

@keyframes slow-zoom {
  from { transform: scale(1); }
  to { transform: scale(1.05); }
} */
</style>