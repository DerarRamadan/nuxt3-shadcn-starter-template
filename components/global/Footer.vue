<script setup lang="ts">
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-vue-next';
// Correct imports from #imports provided by Nuxt and i18n module
import { useI18n, useLocalePath } from '#imports';

const { t } = useI18n();
const localePath = useLocalePath(); // For generating links within the current locale
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-gray-900 text-gray-400 border-t border-gray-700/50 pt-16 pb-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
        <div class="lg:col-span-2">
            <NuxtLink :to="localePath('/')" class="inline-block mb-4">
                <img src="https://via.placeholder.com/200x60/00439e/ffffff?text=Club+Logo+Footer" alt="Club Logo" class="h-12 w-auto">
            </NuxtLink>
            <p class="text-sm pe-4">{{ t('clubName') }} - {{ t('home.hero.subtitle') }}</p>
        </div>

        <div>
          <h4 class="font-semibold font-heading mb-4 text-base text-white uppercase tracking-wider">{{ $t('footer.quickLinks') }}</h4>
          <ul class="space-y-2">
            <li><NuxtLink :to="localePath('/news')" class="hover:text-accent-yellow transition-colors text-sm">{{ $t('header.news') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/matches')" class="hover:text-accent-yellow transition-colors text-sm">{{ $t('header.matches') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/team')" class="hover:text-accent-yellow transition-colors text-sm">{{ $t('header.team') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/history')" class="hover:text-accent-yellow transition-colors text-sm">{{ $t('header.history') }}</NuxtLink></li>
          </ul>
        </div>

         <div>
           <h4 class="font-semibold font-heading mb-4 text-base text-white uppercase tracking-wider">{{ $t('footer.club') }}</h4>
           <ul class="space-y-2">
             <li><NuxtLink :to="localePath('/media')" class="hover:text-accent-yellow transition-colors text-sm">{{ $t('header.media') }}</NuxtLink></li>
             <li><NuxtLink :to="localePath('/sponsors')" class="hover:text-accent-yellow transition-colors text-sm">{{ $t('header.sponsors') }}</NuxtLink></li>
             <li><NuxtLink :to="localePath('/contact')" class="hover:text-accent-yellow transition-colors text-sm">{{ $t('header.contact') }}</NuxtLink></li>
             <li><NuxtLink :to="localePath('/careers')" class="hover:text-accent-yellow transition-colors text-sm">{{ $t('footer.careers') }}</NuxtLink></li>
           </ul>
         </div>

        <div class="col-span-2 lg:col-span-2">
          <h4 class="font-semibold font-heading mb-4 text-base text-white uppercase tracking-wider">{{ $t('footer.followUs') }}</h4>
          <div class="flex space-x-5 rtl:space-x-reverse mb-4">
             <a href="#" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors transform hover:scale-110" aria-label="Facebook"><Facebook class="h-6 w-6" /></a>
             <a href="#" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors transform hover:scale-110" aria-label="Twitter"><Twitter class="h-6 w-6" /></a>
             <a href="#" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors transform hover:scale-110" aria-label="Instagram"><Instagram class="h-6 w-6" /></a>
             <a href="#" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors transform hover:scale-110" aria-label="YouTube"><Youtube class="h-6 w-6" /></a>
           </div>
           <address class="not-italic space-y-1 text-sm">
              <p>[Club Address Line 1], [City, Libya]</p>
              <p>Email: <a href="mailto:info@olympi.ly" class="hover:text-accent-yellow transition-colors">info@olympi.ly</a></p>
            </address>
        </div>
      </div>

      <div class="border-t border-gray-700 pt-8 mt-8 text-center md:text-start">
        <div class="flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© {{ currentYear }} {{ $t('clubName') }}. {{ $t('footer.rights') }}</p>
          <div class="space-x-4 rtl:space-x-reverse mt-4 md:mt-0">
            <NuxtLink :to="localePath('/privacy-policy')" class="hover:text-white transition-colors">{{ $t('footer.privacy') }}</NuxtLink>
            <NuxtLink :to="localePath('/terms-of-service')" class="hover:text-white transition-colors">{{ $t('footer.terms') }}</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>