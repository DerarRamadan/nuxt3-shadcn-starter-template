<script setup>
import GlobalHeader from '~/components/global/Header.vue';
import GlobalFooter from '~/components/global/Footer.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen bg-black text-gray-100">
    <GlobalHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <GlobalFooter />
  </div>
</template>

<script setup>

</script>

<style lang="postcss" scoped>

</style>