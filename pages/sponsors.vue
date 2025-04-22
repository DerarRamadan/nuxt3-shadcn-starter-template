<script setup lang="ts">
import { ref } from 'vue';
import GlobalHeader from '~/components/global/Header.vue';
import GlobalFooter from '~/components/global/Footer.vue';
import { useI18n, useLocalePath, useHead } from '#imports';

const { t } = useI18n();
const localePath = useLocalePath();

// Placeholder Sponsor Data - Group by tier
const sponsors = ref({
    main: [
        { id: 1, name: 'Airways Partner', logo: 'https://via.placeholder.com/250x100/eeeeee/333333?text=AIRWAYS+LOGO', link: '#' },
        { id: 2, name: 'National Bank', logo: 'https://via.placeholder.com/250x100/eeeeee/333333?text=NATIONAL+BANK', link: '#' },
    ],
    gold: [
        { id: 3, name: 'Telecom Provider', logo: 'https://via.placeholder.com/200x80/eeeeee/333333?text=TELECOM', link: '#' },
        { id: 4, name: 'Automotive Brand', logo: 'https://via.placeholder.com/200x80/eeeeee/333333?text=AUTO+BRAND', link: '#' },
        { id: 5, name: 'Energy Company', logo: 'https://via.placeholder.com/200x80/eeeeee/333333?text=ENERGY+CO', link: '#' },
    ],
    official: [
        { id: 6, name: 'Sportswear Brand', logo: 'https://via.placeholder.com/180x70/eeeeee/333333?text=SPORTEX', link: '#' },
        { id: 7, name: 'Hydration Partner', logo: 'https://via.placeholder.com/180x70/eeeeee/333333?text=WATER+', link: '#' },
        { id: 8, name: 'Tech Partner', logo: 'https://via.placeholder.com/180x70/eeeeee/333333?text=TECHSYS', link: '#' },
         { id: 9, name: 'Media Partner', logo: 'https://via.placeholder.com/180x70/eeeeee/333333?text=MEDIA+GROUP', link: '#' },
    ],
    // Add more tiers if needed
});

useHead({
    title: `${t('header.sponsors')} | ${t('clubName')}`
})
</script>

<template>
  <div class="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
    <GlobalHeader />

    <main class="flex-grow">
       <section class="bg-gradient-to-br from-secondary via-primary to-gray-900 py-16 lg:py-24">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-white uppercase tracking-tight drop-shadow-lg">
            {{ $t('sponsors.pageTitle') }}
          </h1>
          <p class="mt-4 text-lg text-gray-200 max-w-3xl mx-auto">{{ $t('sponsors.intro') }}</p>
        </div>
      </section>

      <!-- Sponsor Tiers -->
       <section class="py-16 lg:py-20 bg-gray-900">
            <div class="container mx-auto px-4 space-y-16">

                <!-- Main Partners -->
                <div v-if="sponsors.main.length > 0">
                    <h2 class="text-3xl font-bold font-heading text-white text-center mb-10 uppercase tracking-wider">{{ $t('sponsors.mainPartners') }}</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
                        <a v-for="sponsor in sponsors.main" :key="sponsor.id" :href="sponsor.link" target="_blank" rel="noopener noreferrer"
                           class="block bg-gray-100 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30">
                            <img :src="sponsor.logo" :alt="sponsor.name" class="h-16 md:h-20 w-auto mx-auto object-contain">
                        </a>
                    </div>
                </div>

                 <!-- Gold Partners -->
                 <div v-if="sponsors.gold.length > 0">
                    <h2 class="text-2xl font-bold font-heading text-white text-center mb-10 uppercase tracking-wider">{{ $t('sponsors.goldPartners') }}</h2>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <a v-for="sponsor in sponsors.gold" :key="sponsor.id" :href="sponsor.link" target="_blank" rel="noopener noreferrer"
                           class="block bg-gray-100 rounded-2xl p-5 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                            <img :src="sponsor.logo" :alt="sponsor.name" class="h-14 md:h-16 w-auto mx-auto object-contain">
                        </a>
                    </div>
                </div>

                 <!-- Official Partners -->
                 <div v-if="sponsors.official.length > 0">
                    <h2 class="text-2xl font-bold font-heading text-white text-center mb-10 uppercase tracking-wider">{{ $t('sponsors.officialPartners') }}</h2>
                    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
                        <a v-for="sponsor in sponsors.official" :key="sponsor.id" :href="sponsor.link" target="_blank" rel="noopener noreferrer"
                           class="block bg-gray-100 rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-primary/10">
                             <img :src="sponsor.logo" :alt="sponsor.name" class="h-12 md:h-14 w-auto mx-auto object-contain">
                        </a>
                    </div>
                </div>

            </div>
       </section>

        <!-- Become a Sponsor CTA -->
        <section class="py-16 lg:py-20 bg-gradient-to-r from-primary to-secondary">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl md:text-4xl font-bold font-heading text-white mb-4">{{ $t('sponsors.becomeSponsor') }}</h2>
                <p class="text-lg text-white/90 max-w-2xl mx-auto mb-8">{{ $t('sponsors.becomeSponsorDesc') }}</p>
                 <NuxtLink :to="localePath('/contact')"
                    class="inline-flex items-center justify-center px-8 py-3 border-2 border-transparent text-base font-bold rounded-xl shadow-lg text-primary bg-white hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300 transform hover:scale-105 uppercase tracking-wider">
                    {{ $t('sponsors.becomeSponsorButton') }}
                 </NuxtLink>
            </div>
        </section>

    </main>

    <GlobalFooter />
  </div>
</template>