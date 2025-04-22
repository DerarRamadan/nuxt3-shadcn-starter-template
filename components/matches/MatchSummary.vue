<script setup lang="ts">
import { useI18n } from '#imports';

const { t } = useI18n();

defineProps<{ summary: string | null | undefined }>();
</script>

<template>
  <div>
    <h3 class="text-xl font-semibold mb-4">{{ t('matches.summary.title') }}</h3>
    <div v-if="summary" class="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-white prose-strong:text-white">
      <!-- Use v-html carefully, ensure summary content is sanitized if coming from untrusted sources -->
      <div v-html="summary"></div>
    </div>
    <p v-else class="text-gray-400">{{ t('matches.summary.unavailable') }}</p>
  </div>
</template>

<style scoped>
/* Ensure prose styles apply correctly in dark mode */
.prose-invert {
  --tw-prose-body: theme('colors.gray.300');
  --tw-prose-headings: theme('colors.white');
  --tw-prose-lead: theme('colors.gray.400');
  --tw-prose-links: theme('colors.primary');
  --tw-prose-bold: theme('colors.white');
  --tw-prose-counters: theme('colors.gray.400');
  --tw-prose-bullets: theme('colors.gray.600');
  --tw-prose-hr: theme('colors.gray.700');
  --tw-prose-quotes: theme('colors.gray.100');
  --tw-prose-quote-borders: theme('colors.gray.700');
  --tw-prose-captions: theme('colors.gray.400');
  --tw-prose-code: theme('colors.white');
  --tw-prose-pre-code: theme('colors.gray.300');
  --tw-prose-pre-bg: theme('colors.gray.900');
  --tw-prose-th-borders: theme('colors.gray.600');
  --tw-prose-td-borders: theme('colors.gray.700');
}
</style>