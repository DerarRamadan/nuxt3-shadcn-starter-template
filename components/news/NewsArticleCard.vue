<script setup lang="ts">
import { computed } from 'vue';
import { useI18n, useLocalePath } from '#imports';

const props = defineProps({
  article: {
    type: Object,
    required: true,
    default: () => ({
      id: 0, // Expecting an ID now
      category: 'UNCATEGORIZED',
      titleKey: 'news.default.title',
      date: 'YYYY-MM-DD',
      image: 'https://via.placeholder.com/600x400/cccccc/000000?text=Placeholder'
      // Removed link property as we construct it from ID
    })
  }
});

const { t } = useI18n();
const localePath = useLocalePath();

// Generate link using article ID
const articleLink = computed(() => {
    if (!props.article || props.article.id === 0) {
        // Handle case where article or ID might be missing
        return localePath('/news'); // Fallback to news index
    }
    const basePath = `/news/${props.article.id}`;
    return localePath(basePath);
});

const categoryTranslationKey = computed(() => {
  const categoryKey = props.article.category?.toLowerCase().replace(/[^a-z0-9]/gi, '') || 'uncategorized';
  return `news.categories.${categoryKey}`;
});

const formatDate = (dateString: string) => {
  if (!dateString || dateString === 'YYYY-MM-DD') return '';
  try {
    return new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(dateString));
  } catch (e) {
    console.error("Error formatting date:", e);
    return dateString;
  }
};

</script>

<template>
  <NuxtLink
    :to="articleLink"
    class="block group rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 focus:outline-none focus:ring-0"
  >
    <div class="relative aspect-video">
      <img
        :src="props.article.image"
        :alt="t(props.article.titleKey)"
        class="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
      <span v-if="props.article.category" class="absolute top-4 start-4 rtl:start-auto rtl:end-2 bg-transparancy text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full tracking-wider z-10">
         {{ t(categoryTranslationKey) }}
       </span>
    </div>
    <div class="p-5 md:p-6">
      <h3 class="text-lg md:text-xl font-bold font-heading mb-2 text-white group-hover:text-accent-yellow transition-colors duration-300 line-clamp-2 uppercase">
        {{ t(props.article.titleKey) }}
      </h3>
      <p v-if="props.article.date" class="text-xs text-gray-400 mb-3 font-medium">
        {{ formatDate(props.article.date) }}
      </p>
      <span class="inline-flex items-center text-sm font-semibold text-accent-orange group-hover:text-accent-yellow transition-colors duration-300 mt-2">
        {{ $t('news.readMore') }}
        <span class="ms-1 rtl:ms-0 rtl:me-1">→</span>
      </span>
    </div>
  </NuxtLink>
</template>

<style scoped>
.line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.aspect-video {
    position: relative;
    padding-bottom: 56.25%;
}
.aspect-video > img {
    position: absolute;
    height: 100%;
    width: 100%;
    inset: 0px;
    object-fit: cover;
}
</style>