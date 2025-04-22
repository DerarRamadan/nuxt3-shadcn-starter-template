<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import GlobalHeader from '~/components/global/Header.vue';
import GlobalFooter from '~/components/global/Footer.vue';
import NewsArticleCard from '~/components/news/NewsArticleCard.vue';
import { useI18n, useLocalePath, useAsyncData, createError } from '#imports';
import { Facebook, Twitter, Mail, Link as LinkIcon } from 'lucide-vue-next';

// --- Composables ---
const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const articleId = computed(() => route.params.id as string);

// --- Placeholder Data Source ---
const allNewsItems = ref([
  { id: 1, category: 'firstteam', titleKey: 'news.sample1.title', date: '2024-07-28' },
  { id: 2, category: 'academy', titleKey: 'news.sample2.title', date: '2024-07-27' },
  { id: 3, category: 'clubnews', titleKey: 'news.sample3.title', date: '2024-07-26' },
  { id: 4, category: 'firstteam', titleKey: 'news.sample4.title', date: '2024-07-25' },
  { id: 5, category: 'transfers', titleKey: 'news.sample5.title', date: '2024-07-24' },
  { id: 6, category: 'firstteam', titleKey: 'news.sample6.title', date: '2024-07-23' },
]);
// --- End Placeholder ---


// --- Fetch Article Data (Simulated with Enhanced Content) ---
const { data: article, pending, error } = useAsyncData(
  `news-article-id-${articleId.value}`,
  async () => {
    console.log(`[id].vue: Fetching article data for ID: ${articleId.value}`);
    await new Promise(resolve => setTimeout(resolve, 50));

    const numericId = parseInt(articleId.value, 10);
    if (isNaN(numericId)) {
      console.error(`[id].vue: Invalid numeric ID: ${articleId.value}`);
      throw createError({ statusCode: 400, statusMessage: 'Invalid Article ID', fatal: true });
    }

    const baseData = allNewsItems.value.find(item => item.id === numericId);

    if (!baseData) {
      console.error(`[id].vue: Article with ID ${numericId} not found.`);
      throw createError({ statusCode: 404, statusMessage: 'Article Not Found', fatal: true });
    }

    // --- Enhanced & Varied Placeholder Content Logic ---
    let contentStructure = [];
    const placeholderBaseKey = 'news.article.placeholder.';

    // Basic Intro
    contentStructure.push({ type: 'paragraph', textKey: placeholderBaseKey + 'intro' });

    // Add variation based on ID (example)
    if (numericId % 3 === 0) { // Article IDs 3, 6, etc.
         contentStructure.push({ type: 'heading', level: 2, textKey: placeholderBaseKey + 'h2_key_moments' });
         contentStructure.push({ type: 'paragraph', textKey: placeholderBaseKey + 'p_key_moments' });
         contentStructure.push({ type: 'blockquote', textKey: placeholderBaseKey + 'quote_manager' });
    } else if (numericId % 3 === 1) { // Article IDs 1, 4, etc.
         contentStructure.push({ type: 'heading', level: 2, textKey: placeholderBaseKey + 'h2_tactics' });
         contentStructure.push({ type: 'paragraph', textKey: placeholderBaseKey + 'p_tactics' });
         contentStructure.push({ type: 'image', src: `https://via.placeholder.com/1200x800/${Math.random().toString(16).substr(-6)}/ffffff?text=Action+Shot+${numericId}`, altKey: placeholderBaseKey + 'imageAlt', captionKey: placeholderBaseKey + 'imageCaption' });
    } else { // Article IDs 2, 5, etc.
         contentStructure.push({ type: 'heading', level: 2, textKey: placeholderBaseKey + 'h2_tactics' });
         contentStructure.push({ type: 'paragraph', textKey: placeholderBaseKey + 'p_key_moments' }); // Mix paragraphs
         contentStructure.push({ type: 'heading', level: 3, textKey: placeholderBaseKey + 'list_title' }); // Use H3
         contentStructure.push({ type: 'list', items: [placeholderBaseKey + 'listItem1', placeholderBaseKey + 'listItem2', placeholderBaseKey + 'listItem3'] });
    }

    // Basic Conclusion
    contentStructure.push({ type: 'paragraph', textKey: placeholderBaseKey + 'conclusion' });
    // --- End Enhanced Content Logic ---


    const fullArticleData = {
      id: baseData.id,
      category: baseData.category || 'UNCATEGORIZED',
      titleKey: baseData.titleKey || 'news.default.title',
      date: baseData.date || 'YYYY-MM-DD',
      author: 'Al-Olympi Media Team', // Updated author
      image: `https://via.placeholder.com/1920x1080/${Math.random().toString(16).substr(-6)}/ffffff?text=Article+${baseData.id}+Hero`,
      content: contentStructure, // Use the generated structure
    };
    console.log(`[id].vue: Fetched data for ${articleId.value}:`, fullArticleData);
    return fullArticleData;
  },
  { watch: [articleId] }
);

// --- Related Articles (Simulated) ---
const relatedArticles = computed(() => {
    if (!article.value) return [];
    const numericId = parseInt(articleId.value, 10);
    return allNewsItems.value
        .filter(a => a.id !== numericId)
        .slice(0, 3)
        .map(a => ({
            ...a,
            image: `https://via.placeholder.com/600x400/${Math.random().toString(16).substr(-6)}/ffffff?text=Related+${a.id}`
        }));
});


// --- Computed properties ---
const categoryTranslationKey = computed(() => {
  if (pending.value || error.value || !article.value || !article.value.category) {
      return 'news.categories.uncategorized';
  }
  const categoryKey = article.value.category.toLowerCase().replace(/[^a-z0-9]/gi, '');
  return `news.categories.${categoryKey}`;
});

const pageTitle = computed(() => {
    if (pending.value || error.value || !article.value) return t('clubName');
    return t(article.value.titleKey) + " | " + t('clubName');
});

// --- Use Head for SEO ---
useHead({
  title: pageTitle,
});


// --- Sharing Logic ---
const pageUrl = ref('');
onMounted(() => {
  pageUrl.value = window.location.href;
});

const shareTitle = computed(() => article.value ? t(article.value.titleKey) : t('clubName'));

const shareLinks = computed(() => {
  if (!pageUrl.value) return [];
  const encodedUrl = encodeURIComponent(pageUrl.value);
  const encodedTitle = encodeURIComponent(shareTitle.value);
  return [
    { name: 'Facebook', icon: Facebook, url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: 'Twitter', icon: Twitter, url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { name: 'Email', icon: Mail, url: `mailto:?subject=${encodedTitle}&body=${encodedUrl}` },
    { name: 'Copy Link', icon: LinkIcon, action: copyLink }
  ];
});

async function copyLink() {
  if (!pageUrl.value) return;
  try {
    await navigator.clipboard.writeText(pageUrl.value);
    alert('Link copied!');
  } catch (err) {
    console.error('Failed to copy link: ', err);
    alert('Failed to copy link.');
  }
}

// --- Date Formatting ---
const formatDate = (dateString: string | undefined) => {
   if (!dateString || dateString === 'YYYY-MM-DD') return '';
  try {
    return new Intl.DateTimeFormat( 'en-GB' , { dateStyle: 'long' }).format(new Date(dateString));
  } catch (e) {
    return dateString;
  }
};

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
        <span class="ms-4 text-xl text-gray-400">Loading Article...</span>
      </div>

       <div v-else-if="error || !article" class="container mx-auto px-4 py-20 text-center">
           <h1 class="text-4xl text-red-500 mb-4">Error Loading Article</h1>
           <p class="text-xl text-gray-400 mb-6">Could not load the requested news article.</p>
            <pre v-if="error" class="text-sm text-red-300 bg-red-900/20 p-4 rounded text-start overflow-auto my-4 max-w-xl mx-auto">{{ error }}</pre>
           <NuxtLink :to="localePath('/news')" class="text-accent-yellow hover:underline">Return to News Hub</NuxtLink>
       </div>

      <template v-else>
        <!-- Hero -->
        <section class="relative bg-gray-800 py-24 md:py-32 lg:py-40 overflow-hidden">
          <div class="absolute inset-0 z-0">
            <img :src="article.image" :alt="t(article.titleKey) + ' hero image'" class="w-full h-full object-cover object-center opacity-40 blur-sm scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
          </div>
          <div class="relative z-10 container mx-auto px-4 text-center">
            <span v-if="article.category" class="inline-block bg-accent-orange text-gray-900 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
              {{ $t(categoryTranslationKey) }}
            </span>
            <h1 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-heading text-white uppercase tracking-tight drop-shadow-lg mb-4">
              {{ $t(article.titleKey) }}
            </h1>
            <div class="text-sm md:text-base text-gray-300 font-light">
              <span>{{ $t('news.article.published') }} {{ formatDate(article.date) }}</span>
              <span v-if="article.author" class="mx-2">•</span>
              <span v-if="article.author">{{ $t('news.article.by') }} {{ article.author }}</span>
            </div>
          </div>
        </section>

        <!-- Content Body -->
        <section class="bg-gray-900 pt-12 md:pt-16 pb-16 md:pb-20">
          <div class="container mx-auto px-4 max-w-4xl">
             <article class="prose prose-invert prose-lg lg:prose-xl max-w-none
                          prose-headings:font-heading prose-headings:font-bold prose-headings:uppercase prose-headings:text-primary prose-headings:mb-4 prose-headings:mt-10
                          prose-h2:text-3xl lg:prose-h2:text-4xl prose-h2:border-b prose-h2:border-primary/30 prose-h2:pb-2
                          prose-h3:text-2xl lg:prose-h3:text-3xl
                          prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                          prose-a:text-accent-yellow hover:prose-a:text-accent-orange prose-a:transition-colors
                          prose-blockquote:border-s-4 prose-blockquote:border-accent-orange prose-blockquote:ps-6 prose-blockquote:italic prose-blockquote:text-gray-400
                          prose-ul:list-disc prose-ul:ps-6 prose-li:marker:text-accent-orange prose-li:my-1
                          prose-ol:list-decimal prose-ol:ps-6 prose-li:marker:text-accent-orange prose-li:my-1
                          prose-img:rounded-xl prose-img:border prose-img:border-gray-700 prose-img:my-10
                          prose-figure:my-10
                          prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:italic prose-figcaption:text-gray-400 prose-figcaption:mt-2">

              <!-- Render structured content -->
              <template v-for="(block, index) in article.content" :key="index">
                <p v-if="block.type === 'paragraph'">{{ $t(block.textKey) }}</p>
                <h2 v-else-if="block.type === 'heading' && block.level === 2">{{ $t(block.textKey) }}</h2>
                <h3 v-else-if="block.type === 'heading' && block.level === 3">{{ $t(block.textKey) }}</h3>
                <figure v-else-if="block.type === 'image'">
                  <img :src="block.src" :alt="$t(block.altKey)" loading="lazy"/>
                  <figcaption v-if="block.captionKey">{{ $t(block.captionKey) }}</figcaption>
                </figure>
                <blockquote v-else-if="block.type === 'blockquote'">
                  <p>{{ $t(block.textKey) }}</p>
                </blockquote>
                <ul v-else-if="block.type === 'list' && block.items">
                  <li v-for="(itemKey, itemIndex) in block.items" :key="itemIndex">{{ $t(itemKey) }}</li>
                </ul>
              </template>

            </article>

            <!-- Sharing Bar -->
            <div class="mt-12 pt-8 border-t border-gray-700/50">
              <div class="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
                <span class="text-sm font-semibold text-gray-400 uppercase tracking-wider me-2">{{ $t('news.article.share') }}:</span>
                <template v-for="link in shareLinks" :key="link.name">
                   <a v-if="link.url" :href="link.url" target="_blank" rel="noopener noreferrer"
                     :aria-label="`Share on ${link.name}`"
                     class="text-gray-400 hover:text-accent-yellow hover:scale-110 transition-all duration-200 flex items-center space-x-1">
                    <component :is="link.icon" class="w-5 h-5 md:w-6 md:h-6" />
                   </a>
                   <button v-else-if="link.action" @click="link.action"
                      :aria-label="`${link.name}`"
                      class="text-gray-400 hover:text-accent-yellow hover:scale-110 transition-all duration-200 flex items-center space-x-1">
                      <component :is="link.icon" class="w-5 h-5 md:w-6 md:h-6" />
                   </button>
                </template>
              </div>
            </div>
          </div>
        </section>

        <!-- Related Articles -->
        <section class="bg-gray-900 pt-16 pb-20 lg:pt-20 lg:pb-24 border-t border-gray-800">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl md:text-4xl font-bold font-heading text-white uppercase tracking-tight text-center mb-12">
              {{ $t('news.related.title') }}
            </h2>
            <div v-if="relatedArticles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              <NewsArticleCard v-for="related in relatedArticles" :key="'related-' + related.id" :article="related" />
            </div>
             <div v-else class="text-center text-gray-500">
                No related articles found.
            </div>
          </div>
        </section>
      </template>

    </main>

    <GlobalFooter />
  </div>
</template>

<style>
/* Ensure Tailwind typography styles apply */
.prose {
  --tw-prose-links: theme('colors.accent-yellow.DEFAULT');
}
.prose-invert {
   --tw-prose-invert-links: theme('colors.accent-yellow.DEFAULT');
   --tw-prose-invert-headings: theme('colors.primary.DEFAULT');
   --tw-prose-invert-body: theme('colors.gray.300');
   --tw-prose-invert-bold: theme('colors.white');
   --tw-prose-invert-bullets: theme('colors.accent-orange.DEFAULT');
   --tw-prose-invert-counters: theme('colors.accent-orange.DEFAULT');
   --tw-prose-invert-quotes: theme('colors.gray.400');
   --tw-prose-invert-quote-borders: theme('colors.accent-orange.DEFAULT');
}
</style>