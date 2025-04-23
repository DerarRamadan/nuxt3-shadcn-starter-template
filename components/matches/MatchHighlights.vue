<script setup lang="ts">
import { useI18n } from '#imports';

const { t } = useI18n();

defineProps<{
  highlights?: {
    id: string;
    title: string;
    thumbnail: string;
    duration: string;
  }[];
  loading?: boolean;
}>();

</script>

<template>
  <div class="mb-12">
    <h3 class="text-xl font-semibold mb-6">{{ t('matches.highlights.title') }}</h3>
    
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 3" :key="i" class="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
        <div class="aspect-video bg-gray-700"></div>
        <div class="p-4 space-y-2">
          <div class="h-4 bg-gray-700 rounded w-3/4"></div>
          <div class="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    </div>
    
    <div v-else-if="highlights && highlights.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="highlight in highlights" 
        :key="highlight.id" 
        class="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div class="aspect-video relative bg-gray-900">
          <img 
            :src="highlight.thumbnail" 
            :alt="highlight.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute bottom-2 end-2 bg-black bg-opacity-70 px-2 py-1 rounded text-xs text-white">
            {{ highlight.duration }}
          </div>
        </div>
        <div class="p-4">
          <h4 class="text-white font-medium mb-1 line-clamp-2">{{ highlight.title }}</h4>
          <p class="text-gray-400 text-sm">{{ t('matches.highlights.watch') }}</p>
        </div>
      </div>
    </div>
    
    <p v-else class="text-gray-400">{{ t('matches.highlights.unavailable') }}</p>
  </div>
</template>

<style scoped>
.aspect-video {
  aspect-ratio: 16/9;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>