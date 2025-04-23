<template>
  <div :dir="isRTL ? 'rtl' : 'ltr'">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from '#imports';

const { locale } = useI18n();
const isRTL = computed(() => ['ar'].includes(locale.value));
</script>
