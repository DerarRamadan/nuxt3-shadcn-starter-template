<script setup lang="ts">
import { computed } from 'vue';
import { useI18n, useLocalePath } from '#imports';

const props = defineProps({
  article: {
    type: Object,
    required: true,
    default: () => ({ // Provide a default structure for safety
      id: 0,
      category: 'UNCATEGORIZED',
      titleKey: 'news.default.title',
      date: 'YYYY-MM-DD',
      summaryKey: 'news.default.summary',
      image: 'https://via.placeholder.com/600x400/cccccc/000000?text=Placeholder',
      link: '/news'
    })
  }
});

const { t } = useI18n();
const localePath = useLocalePath();

// Computed property for the link to handle locale
const articleLink = computed(() => localePath(props.article.link || '/news'));

// Computed property for category translation key
const categoryTranslationKey = computed(() => {
  return `news.categories.${props.article.category?.toLowerCase().replace(' ', '') || 'uncategorized'}`;
});

</script>

<template>
  <NuxtLink
    :to="articleLink"
    class="block group bg-secondary rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 border border-gray-700 hover:border-accent-orange"
  >
    <div class="relative aspect-video overflow-hidden">
      <img
        :src="props.article.image"
        :alt="t(props.article.titleKey)"
        class="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <div class="p-5 md:p-6">
      <span v-if="props.article.category" class="inline-block bg-primary text-white text-[11px] font-bold uppercase px-3 py-1 rounded-full mb-3 tracking-wide">
        {{ t(categoryTranslationKey) }}
      </span>
      <h3 class="text-lg md:text-xl font-bold font-heading mb-2 text-white group-hover:text-accent-yellow transition-colors duration-300 line-clamp-2 uppercase">
        {{ t(props.article.titleKey) }}
      </h3>
      <p v-if="props.article.date" class="text-xs text-gray-400 mb-3 font-medium">
        {{ props.article.date }} <!-- Consider formatting date if needed -->
      </p>
      <p v-if="props.article.summaryKey" class="font-sans text-gray-300 mb-4 text-sm line-clamp-3 leading-relaxed">
        {{ t(props.article.summaryKey) }}
      </p>
      <span class="inline-flex items-center text-sm font-semibold text-accent-orange group-hover:text-accent-yellow transition-colors duration-300 mt-2">
        {{ $t('news.readMore') }}
        <span class="ms-1 rtl:ms-0 rtl:me-1">&rarr;</span>
      </span>
    </div>
  </NuxtLink>
</template>

<style scoped>
.line-clamp-2,
.line-clamp-3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    /* Handled by Tailwind line-clamp plugin if installed, otherwise keep */
    -webkit-line-clamp: 2; /* Default */
}
.line-clamp-3 {
    -webkit-line-clamp: 3;
}

.aspect-video {
    aspect-ratio: 16 / 9;
}
</style>