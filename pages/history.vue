<script setup lang="ts">
import { ref } from 'vue';
import GlobalHeader from '~/components/global/Header.vue';
import GlobalFooter from '~/components/global/Footer.vue';
import { useI18n, useLocalePath, useHead } from '#imports';
import { Trophy, Users, Award } from 'lucide-vue-next'; // Example icons

const { t } = useI18n();
const localePath = useLocalePath();

// Placeholder History Data
const timeline = ref([
  { id: 'm1', yearKey: 'history.milestones.m1_year', titleKey: 'history.milestones.m1_title', descKey: 'history.milestones.m1_desc', image: 'https://via.placeholder.com/500x300/cccccc/000000?text=Founding+Era' },
  { id: 'm2', yearKey: 'history.milestones.m2_year', titleKey: 'history.milestones.m2_title', descKey: 'history.milestones.m2_desc', image: 'https://via.placeholder.com/500x300/00439e/ffffff?text=First+Title+Win' },
  { id: 'm3', yearKey: 'history.milestones.m3_year', titleKey: 'history.milestones.m3_title', descKey: 'history.milestones.m3_desc', image: 'https://via.placeholder.com/500x300/ff7f00/ffffff?text=Continental+Match' },
  { id: 'm4', yearKey: 'history.milestones.m4_year', titleKey: 'history.milestones.m4_title', descKey: 'history.milestones.m4_desc', image: 'https://via.placeholder.com/500x300/00c853/ffffff?text=Stadium+Expansion' },
]);

const trophies = ref([
    { id: 't1', name: 'Premier League', count: 8, icon: Trophy },
    { id: 't2', name: 'National Cup', count: 5, icon: Trophy },
    { id: 't3', name: 'Champions Cup', count: 2, icon: Trophy },
    { id: 't4', name: 'Super Cup', count: 4, icon: Trophy },
]);

const legends = ref([
    { id: 'l1', name: 'Salim Omar', position: 'Forward (1980s)', image: 'https://via.placeholder.com/300x400/cccccc/000000?text=Legend+1' },
    { id: 'l2', name: 'Khaled Hassan', position: 'Midfielder (1990s)', image: 'https://via.placeholder.com/300x400/cccccc/000000?text=Legend+2' },
    { id: 'l3', name: 'Ali Mansour', position: 'Defender (2000s)', image: 'https://via.placeholder.com/300x400/cccccc/000000?text=Legend+3' },
    { id: 'l4', name: 'Mustafa Ahmed', position: 'Goalkeeper (2010s)', image: 'https://via.placeholder.com/300x400/cccccc/000000?text=Legend+4' },
]);


useHead({
    title: `${t('header.history')} | ${t('clubName')}`
})
</script>

<template>
  <div class="bg-black text-gray-100 min-h-screen flex flex-col">
    <GlobalHeader />

    <main class="flex-grow">
       <section class="relative py-20 md:py-28 lg:py-32 overflow-hidden">
            <div class="absolute inset-0 z-0">
                <img src="https://readdy.ai/api/search-image?query=vintage%20black%20and%20white%20football%20team%20photo%20overlayed%20with%20modern%20stadium%20lights%20effect%2C%20sepia%20tones&width=1920&height=1080&seq=hist1" alt="History background" class="w-full h-full object-cover object-center opacity-20 blur-sm">
                <div class="absolute inset-0 bg-gradient-to-b from-black/90 via-gray-900/80 to-black/95"></div>
            </div>
            <div class="container mx-auto px-4 text-center relative z-10">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-white uppercase tracking-tight drop-shadow-lg">
                {{ $t('history.pageTitle') }}
            </h1>
            <p class="mt-4 text-lg text-gray-300 max-w-2xl mx-auto italic">{{ $t('history.introQuote') }}</p>
            </div>
      </section>

       <!-- Timeline Section -->
       <section class="py-16 lg:py-20 bg-gray-900">
            <div class="container mx-auto px-4 max-w-5xl">
                <h2 class="text-3xl md:text-4xl font-bold font-heading text-white text-center mb-12 lg:mb-16 uppercase tracking-wider">{{ $t('history.timelineHeading') }}</h2>

                <div class="relative ps-6 rtl:ps-0 rtl:pe-6 border-s-2 rtl:border-s-0 rtl:border-e-2 border-primary/30 ms-4 rtl:ms-0 rtl:me-4">
                   <div v-for="(item, index) in timeline" :key="item.id" class="mb-12 relative">
                        <div class="absolute w-6 h-6 bg-primary rounded-full -start-[13px] rtl:-start-auto rtl:-end-[13px] top-0 border-4 border-gray-900 ring-2 ring-primary/50"></div>
                        <div class="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 hover:border-primary/50 transition-colors duration-300">
                            <span class="text-sm font-semibold text-primary uppercase tracking-wider">{{ t(item.yearKey) }}</span>
                            <h3 class="text-xl md:text-2xl font-bold font-heading text-white mt-1 mb-3">{{ t(item.titleKey) }}</h3>
                            <p class="text-gray-300 leading-relaxed text-sm md:text-base mb-4">{{ t(item.descKey) }}</p>
                            <img v-if="item.image" :src="item.image" :alt="t(item.titleKey)" class="w-full h-auto max-h-60 object-cover rounded-lg mt-4 border border-gray-600">
                        </div>
                   </div>
                </div>
            </div>
       </section>

       <!-- Trophy Cabinet -->
       <section class="py-16 lg:py-20 bg-secondary/10">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl md:text-4xl font-bold font-heading text-white text-center mb-12 lg:mb-16 uppercase tracking-wider">{{ $t('history.honours') }}</h2>
                 <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    <div v-for="trophy in trophies" :key="trophy.id" class="bg-gray-800 rounded-2xl p-6 text-center border border-gray-700 hover:border-accent-yellow transition-colors duration-300 hover:shadow-lg hover:shadow-accent-yellow/20">
                        <div class="text-accent-yellow text-5xl mb-3 flex justify-center">🏆</div>
                        <h3 class="text-lg font-semibold text-white mb-1">{{ trophy.name }}</h3>
                        <p class="text-2xl font-bold text-accent-yellow">{{ trophy.count }}x</p>
                    </div>
                 </div>
            </div>
       </section>

        <!-- Legends Section (Optional) -->
        <section class="py-16 lg:py-20 bg-gray-900">
            <div class="container mx-auto px-4">
                 <h2 class="text-3xl md:text-4xl font-bold font-heading text-white text-center mb-12 lg:mb-16 uppercase tracking-wider">{{ $t('history.legends') }}</h2>
                 <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                     <div v-for="legend in legends" :key="legend.id" class="group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20">
                        <div class="aspect-w-3 aspect-h-4">
                             <img :src="legend.image" :alt="legend.name" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300">
                        </div>
                         <div class="p-4 text-center">
                             <h3 class="text-lg font-bold text-white">{{ legend.name }}</h3>
                             <p class="text-sm text-primary">{{ legend.position }}</p>
                         </div>
                     </div>
                 </div>
            </div>
        </section>

    </main>

    <GlobalFooter />
  </div>
</template>

<style scoped>
.aspect-w-3 { position: relative; padding-bottom: 133.3333%; }
.aspect-h-4 { position: relative; }
.aspect-w-3 > *, .aspect-h-4 > * { position: absolute; height: 100%; width: 100%; inset: 0px; object-fit: cover; }
</style>