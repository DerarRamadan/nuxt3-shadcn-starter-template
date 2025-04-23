<script setup lang="ts">
import { ref, computed } from 'vue'
import { Menu, Search, Globe, X } from 'lucide-vue-next';
import { useI18n, useSwitchLocalePath, useLocalePath } from '#imports';

const { locale, locales, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const currentLocalePath = useLocalePath();

interface I18nLocale {
  code: string;
  name: string;
  iso?: string;
  file?: string;
  dir?: string;
}

const availableLocales = computed<I18nLocale[]>(() => {
  return (locales.value as I18nLocale[]).filter(i => i.code !== locale.value && i.name);
})

const isLangDropdownOpen = ref(false)
const isMobileMenuOpen = ref(false)

function toggleLangDropdown() {
  isLangDropdownOpen.value = !isLangDropdownOpen.value;
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu() {
    isMobileMenuOpen.value = false;
    isLangDropdownOpen.value = false;
}

function handleLocaleSwitch() {
    isLangDropdownOpen.value = false;
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b border-gray-700/50 bg-gray-900/80 backdrop-blur-lg">
    <div class="container mx-auto px-4 h-20 flex items-center justify-between">
      <NuxtLink :to="currentLocalePath('/')" class="flex items-center space-x-3 rtl:space-x-reverse rtl:space-x-reverse" @click="closeMobileMenu">
        <img src="https://via.placeholder.com/180x50/00439e/ffffff?text=Club+Logo+Modern" alt="Club Logo" class="h-10 md:h-12 w-auto">
        <span class="text-xl font-bold hidden lg:inline text-white font-heading uppercase tracking-tight">{{ $t('clubName') }}</span>
      </NuxtLink>

      <nav class="hidden lg:flex items-center space-x-8 rtl:space-x-reverse rtl:space-x-reverse">
        <NuxtLink :to="currentLocalePath('/news')" class="text-sm font-medium text-gray-300 hover:text-accent-yellow transition-colors uppercase tracking-wider">{{ $t('header.news') }}</NuxtLink>
        <NuxtLink :to="currentLocalePath('/matches')" class="text-sm font-medium text-gray-300 hover:text-accent-yellow transition-colors uppercase tracking-wider">{{ $t('header.matches') }}</NuxtLink>
        <NuxtLink :to="currentLocalePath('/team')" class="text-sm font-medium text-gray-300 hover:text-accent-yellow transition-colors uppercase tracking-wider">{{ $t('header.team') }}</NuxtLink>
        <NuxtLink :to="currentLocalePath('/history')" class="text-sm font-medium text-gray-300 hover:text-accent-yellow transition-colors uppercase tracking-wider">{{ $t('header.history') }}</NuxtLink>
        <NuxtLink :to="currentLocalePath('/gallery')" class="text-sm font-medium text-gray-300 hover:text-accent-yellow transition-colors uppercase tracking-wider">{{ $t('header.media') }}</NuxtLink>
        <NuxtLink :to="currentLocalePath('/sponsors')" class="text-sm font-medium text-gray-300 hover:text-accent-yellow transition-colors uppercase tracking-wider">{{ $t('header.sponsors') }}</NuxtLink>
        <NuxtLink :to="currentLocalePath('/contact')" class="text-sm font-medium text-gray-300 hover:text-accent-yellow transition-colors uppercase tracking-wider">{{ $t('header.contact') }}</NuxtLink>
      </nav>

      <div class="flex items-center space-x-4 rtl:space-x-reverse rtl:space-x-reverse">
        <div class="relative">
          <button
            id="language-button"
            @click.stop="toggleLangDropdown"
            type="button"
            class="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary transition-colors"
            :aria-label="$t('header.selectLanguage')"
            aria-haspopup="true"
            :aria-expanded="isLangDropdownOpen"
          >
            <Globe class="h-5 w-5" />
          </button>
          <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                  v-show="isLangDropdownOpen"
                  id="language-dropdown"
                  class="absolute end-0 mt-2 w-40 origin-top-right rounded-xl bg-secondary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1 border border-gray-700 z-50"
                  role="menu" aria-orientation="vertical" aria-labelledby="language-button"
              >
                  <NuxtLink
                      v-for="lang in availableLocales"
                      :key="lang.code"
                      :to="switchLocalePath(lang.code)"
                      @click="handleLocaleSwitch"
                      class="block w-full text-start px-4 py-2 text-sm text-gray-200 hover:bg-primary hover:text-white transition-colors"
                      role="menuitem"
                  >
                      {{ lang.name }}
                  </NuxtLink>
              </div>
            </transition>
        </div>

        <button
            type="button"
            class="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary transition-colors"
            :aria-label="$t('header.search')"
        >
          <Search class="h-5 w-5" />
        </button>

        <button
          @click="toggleMobileMenu"
          type="button"
          class="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary transition-colors lg:hidden"
          :aria-label="$t('header.toggleMenu')"
        >
          <Menu v-if="!isMobileMenuOpen" class="h-6 w-6" />
          <X v-else class="h-6 w-6" />
        </button>
      </div>
    </div>

    <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 transform translate-x-full rtl:-translate-x-full"
        enter-to-class="opacity-100 transform translate-x-0 rtl:translate-x-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 transform translate-x-0 rtl:translate-x-0"
        leave-to-class="opacity-0 transform translate-x-full rtl:-translate-x-full"
      >
        <div v-if="isMobileMenuOpen" class="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" @click="closeMobileMenu"></div>
            <div class="fixed inset-y-0 end-0 w-full max-w-xs bg-secondary shadow-lg p-6 z-50 border-s rtl:border-s-0 rtl:border-e border-gray-700">
                <div class="flex items-center justify-between mb-8">
                    <NuxtLink :to="currentLocalePath('/')" class="flex items-center space-x-2 rtl:space-x-reverse rtl:space-x-reverse" @click="closeMobileMenu">
                         <img src="https://via.placeholder.com/150x40/00439e/ffffff?text=Club+Logo" alt="Club Logo" class="h-8 w-auto">
                    </NuxtLink>
                    <button
                      @click="toggleMobileMenu"
                      type="button"
                      class="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-primary transition-colors"
                      :aria-label="$t('header.closeMenu')"
                    >
                      <X class="h-6 w-6" />
                    </button>
                </div>
                <nav class="flex flex-col space-y-2">
                   <NuxtLink :to="currentLocalePath('/')" @click="closeMobileMenu" class="block px-4 py-3 rounded-lg text-base font-medium text-gray-200 hover:text-white hover:bg-primary transition-colors uppercase tracking-wider">{{ $t('header.home') }}</NuxtLink>
                   <NuxtLink :to="currentLocalePath('/news')" @click="closeMobileMenu" class="block px-4 py-3 rounded-lg text-base font-medium text-gray-200 hover:text-white hover:bg-primary transition-colors uppercase tracking-wider">{{ $t('header.news') }}</NuxtLink>
                   <NuxtLink :to="currentLocalePath('/matches')" @click="closeMobileMenu" class="block px-4 py-3 rounded-lg text-base font-medium text-gray-200 hover:text-white hover:bg-primary transition-colors uppercase tracking-wider">{{ $t('header.matches') }}</NuxtLink>
                   <NuxtLink :to="currentLocalePath('/team')" @click="closeMobileMenu" class="block px-4 py-3 rounded-lg text-base font-medium text-gray-200 hover:text-white hover:bg-primary transition-colors uppercase tracking-wider">{{ $t('header.team') }}</NuxtLink>
                   <NuxtLink :to="currentLocalePath('/history')" @click="closeMobileMenu" class="block px-4 py-3 rounded-lg text-base font-medium text-gray-200 hover:text-white hover:bg-primary transition-colors uppercase tracking-wider">{{ $t('header.history') }}</NuxtLink>
                   <NuxtLink :to="currentLocalePath('/gallery')" @click="closeMobileMenu" class="block px-4 py-3 rounded-lg text-base font-medium text-gray-200 hover:text-white hover:bg-primary transition-colors uppercase tracking-wider">{{ $t('header.media') }}</NuxtLink>
                   <NuxtLink :to="currentLocalePath('/sponsors')" @click="closeMobileMenu" class="block px-4 py-3 rounded-lg text-base font-medium text-gray-200 hover:text-white hover:bg-primary transition-colors uppercase tracking-wider">{{ $t('header.sponsors') }}</NuxtLink>
                   <NuxtLink :to="currentLocalePath('/contact')" @click="closeMobileMenu" class="block px-4 py-3 rounded-lg text-base font-medium text-gray-200 hover:text-white hover:bg-primary transition-colors uppercase tracking-wider">{{ $t('header.contact') }}</NuxtLink>
                </nav>
            </div>
        </div>
    </transition>
  </header>
</template>