<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import GlobalHeader from '~/components/global/Header.vue';
import GlobalFooter from '~/components/global/Footer.vue';
import { useI18n, useLocalePath, useHead } from '#imports';
import { ArrowLeftLine, ArrowRightSLine, ArrowLeftSLine, SearchLine, GridFill, ListCheck, ImageFill, FolderFill, RefreshLine, ArrowDownLine, ZoomInLine, CloseLine, DownloadLine, ShareLine, ArrowUpLine, CalendarLine, ArrowRightLine } from 'lucide-vue-next'; // Adjusted imports

const { t } = useI18n();
const localePath = useLocalePath();

const activeFilter = ref('match');
const currentView = ref('grid');
const currentSort = ref('newest');
const isLightboxOpen = ref(false);
const currentLightboxIndex = ref(0);
const searchInput = ref('');

const filters = ref([
    { key: 'match', labelKey: 'gallery.filters.match'},
    { key: 'training', labelKey: 'gallery.filters.training'},
    { key: 'fans', labelKey: 'gallery.filters.fans'},
    { key: 'events', labelKey: 'gallery.filters.events'},
]);

const allGalleryItems = ref([
    { id: 1, category: 'match', date: '2025-04-12', title: "Ibrahim's Winning Goal", description: "Striker Ibrahim Diallo scores the winning goal...", image: 'https://readdy.ai/api/search-image?query=football%2520match%2520action%2520shot%252C%2520player%2520in%2520blue%2520kit%2520scoring%2520goal%252C%2520dramatic%2520moment%252C%2520stadium%2520atmosphere%252C%2520professional%2520sports%2520photography%252C%2520dynamic%2520composition&width=800&height=600&seq=123460&orientation=landscape' },
    { id: 2, category: 'match', date: '2025-04-05', title: "Mendoza's Crucial Save", description: "Goalkeeper Carlos Mendoza makes a spectacular save...", image: 'https://readdy.ai/api/search-image?query=football%2520goalkeeper%2520save%252C%2520dramatic%2520diving%2520save%2520by%2520goalkeeper%2520in%2520blue%2520kit%252C%2520stadium%2520atmosphere%252C%2520professional%2520sports%2520photography%252C%2520action%2520shot%252C%2520dynamic%2520composition&width=800&height=600&seq=123461&orientation=landscape' },
    { id: 3, category: 'match', date: '2025-03-22', title: "Team Celebration", description: "The squad celebrates Kevin De Santos' stunning free-kick...", image: 'https://readdy.ai/api/search-image?query=football%2520team%2520celebration%252C%2520players%2520in%2520blue%2520kit%2520celebrating%2520together%2520after%2520goal%252C%2520emotional%2520moment%252C%2520stadium%2520atmosphere%252C%2520professional%2520sports%2520photography%252C%2520dynamic%2520composition&width=800&height=600&seq=123462&orientation=landscape' },
    { id: 4, category: 'match', date: '2025-03-15', title: "Stadium Atmosphere", description: "A packed Olympic Stadium for the crucial league match...", image: 'https://readdy.ai/api/search-image?query=football%2520match%2520aerial%2520view%252C%2520stadium%2520filled%2520with%2520fans%252C%2520teams%2520in%2520formation%252C%2520floodlights%252C%2520professional%2520sports%2520photography%252C%2520dramatic%2520lighting%252C%2520wide%2520angle&width=800&height=600&seq=123463&orientation=landscape' },
    { id: 5, category: 'training', date: '2025-03-08', title: "Reyes' Skillful Dribble", description: "Alejandro Reyes showcases his incredible skills...", image: 'https://readdy.ai/api/search-image?query=football%2520player%2520dribbling%252C%2520skilled%2520winger%2520in%2520blue%2520kit%2520taking%2520on%2520defender%252C%2520stadium%2520atmosphere%252C%2520professional%2520sports%2520photography%252C%2520action%2520shot%252C%2520dynamic%2520composition&width=800&height=600&seq=123464&orientation=landscape' },
    { id: 6, category: 'training', date: '2025-03-01', title: "Captain's Crucial Tackle", description: "Ahmed Al-Farsi makes a perfectly timed tackle...", image: 'https://readdy.ai/api/search-image?query=football%2520match%2520tackle%252C%2520defensive%2520midfielder%2520in%2520blue%2520kit%2520making%2520sliding%2520tackle%252C%2520stadium%2520atmosphere%252C%2520professional%2520sports%2520photography%252C%2520action%2520shot%252C%2520dynamic%2520composition&width=800&height=600&seq=123465&orientation=landscape' },
    { id: 7, category: 'fans', date: '2025-02-22', title: "Coach Mancini's Direction", description: "Head Coach Roberto Mancini gives tactical instructions...", image: 'https://readdy.ai/api/search-image?query=football%2520coach%2520giving%2520instructions%252C%2520manager%2520in%2520blue%2520tracksuit%2520on%2520sideline%252C%2520stadium%2520atmosphere%252C%2520professional%2520sports%2520photography%252C%2520emotional%2520moment%252C%2520dynamic%2520composition&width=800&height=600&seq=123466&orientation=landscape' },
    { id: 8, category: 'events', date: '2025-02-15', title: "Decisive Penalty", description: "Ibrahim Diallo prepares to take the match-winning penalty...", image: 'https://readdy.ai/api/search-image?query=football%2520penalty%2520kick%252C%2520striker%2520in%2520blue%2520kit%2520taking%2520penalty%252C%2520stadium%2520atmosphere%252C%2520tense%2520moment%252C%2520professional%2520sports%2520photography%252C%2520dramatic%2520lighting%252C%2520dynamic%2520composition&width=800&height=600&seq=123467&orientation=landscape' },
    { id: 101, category: 'match', date: '2025-03-15', title: 'League Championship Victory', description: 'The team celebrates after securing the league title...', image: 'https://readdy.ai/api/search-image?query=football%2520match%2520celebration%252C%2520team%2520in%2520blue%2520jerseys%2520celebrating%2520goal%252C%2520stadium%2520atmosphere%252C%2520fans%2520cheering%252C%2520floodlights%252C%2520emotional%2520moment%252C%2520professional%2520sports%2520photography%252C%2520dramatic%2520lighting%252C%2520high%2520quality%252C%2520wide%2520angle%2520shot&width=1200&height=500&seq=123457&orientation=landscape' },
    { id: 102, category: 'training', date: '2024-07-28', title: 'Pre-Season Training Camp', description: 'The squad works on tactical formations...', image: 'https://readdy.ai/api/search-image?query=football%2520team%2520training%2520session%252C%2520professional%2520players%2520in%2520blue%2520training%2520kit%252C%2520coach%2520giving%2520instructions%252C%2520modern%2520training%2520facility%252C%2520professional%2520sports%2520photography%252C%2520morning%2520light%252C%2520wide%2520angle%2520shot&width=1200&height=500&seq=123458&orientation=landscape' },
    { id: 103, category: 'fans', date: '2025-02-08', title: 'Derby Day Atmosphere', description: 'Our passionate supporters create an unforgettable atmosphere...', image: 'https://readdy.ai/api/search-image?query=football%2520fans%2520celebration%252C%2520supporters%2520in%2520blue%2520team%2520colors%252C%2520flares%252C%2520flags%252C%2520packed%2520stadium%252C%2520emotional%2520atmosphere%252C%2520professional%2520sports%2520photography%252C%2520dramatic%2520lighting%252C%2520wide%2520angle%2520shot&width=1200&height=500&seq=123459&orientation=landscape' },
]);

const featuredSliderItems = computed(() => allGalleryItems.value.filter(item => [101, 102, 103].includes(item.id)));
const currentSlideIndex = ref(0);

const filteredGalleryItems = computed(() => {
    let items = allGalleryItems.value.filter(item => item.id < 100);
    if (activeFilter.value !== 'all') {
        items = items.filter(item => item.category === activeFilter.value);
    }
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        items = items.filter(item =>
            item.title.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm)
        );
    }
    if (currentSort.value === 'oldest') {
        items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else {
        items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    return items;
});

const currentPage = ref(1);
const itemsPerPage = 12;
const totalPages = computed(() => Math.ceil(filteredGalleryItems.value.length / itemsPerPage));
const paginatedGalleryItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredGalleryItems.value.slice(start, end);
});

const currentLightboxItem = computed(() => {
    if (!isLightboxOpen.value || filteredGalleryItems.value.length === 0 || currentLightboxIndex.value < 0 || currentLightboxIndex.value >= filteredGalleryItems.value.length ) return null;
    return filteredGalleryItems.value[currentLightboxIndex.value];
});

function setActiveFilter(filterKey: string) {
  activeFilter.value = filterKey;
  currentPage.value = 1;
}
function changePage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    const gridElement = document.getElementById('gallery-grid-section');
    if (gridElement) {
      window.scrollTo({ top: gridElement.offsetTop - 120, behavior: 'smooth' });
    }
  }
}
function setView(view: 'grid' | 'list') { currentView.value = view; }

const sliderContainerRef = ref<HTMLElement | null>(null);
let slideInterval: ReturnType<typeof setInterval> | null = null;
function goToSlide(index: number) {
    const totalSlides = featuredSliderItems.value.length;
    if (totalSlides === 0) return;
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    if (sliderContainerRef.value) { sliderContainerRef.value.style.transform = `translateX(-${index * 100}%)`; }
    currentSlideIndex.value = index;
}
function nextSlide() { goToSlide(currentSlideIndex.value + 1); }
function prevSlide() { goToSlide(currentSlideIndex.value - 1); }
function startAutoSlide() { stopAutoSlide(); slideInterval = setInterval(nextSlide, 5000); }
function stopAutoSlide() { if (slideInterval) { clearInterval(slideInterval); slideInterval = null; }}
onMounted(startAutoSlide);
onUnmounted(stopAutoSlide);

function openLightbox(paginatedIndex: number) {
    const itemInPaginatedList = paginatedGalleryItems.value[paginatedIndex];
    if (!itemInPaginatedList) return;
    const actualIndex = filteredGalleryItems.value.findIndex(item => item.id === itemInPaginatedList.id);
    if (actualIndex !== -1) {
        currentLightboxIndex.value = actualIndex;
        isLightboxOpen.value = true;
        document.body.style.overflow = 'hidden';
    }
}
function closeLightbox() { isLightboxOpen.value = false; document.body.style.overflow = ''; }
function prevLightboxImage() { const newIndex = currentLightboxIndex.value - 1; currentLightboxIndex.value = newIndex < 0 ? filteredGalleryItems.value.length - 1 : newIndex; }
function nextLightboxImage() { const newIndex = currentLightboxIndex.value + 1; currentLightboxIndex.value = newIndex >= filteredGalleryItems.value.length ? 0 : newIndex; }
function handleEscKey(event: KeyboardEvent) { if (event.key === 'Escape' && isLightboxOpen.value) { closeLightbox(); }}
onMounted(() => document.addEventListener('keydown', handleEscKey));
onUnmounted(() => document.removeEventListener('keydown', handleEscKey));

const showBackToTop = ref(false);
function handleScroll() { showBackToTop.value = window.scrollY > 500; }
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));

const getCategoryTagClass = (categoryKey: string | undefined) => {
    switch (categoryKey) {
        case 'match': return 'bg-primary text-white';
        case 'training': return 'bg-accent-orange text-white';
        case 'fans': return 'bg-green-500 text-white';
        case 'events': return 'bg-purple-500 text-white';
        default: return 'bg-gray-500 text-white';
    }
}

useHead({ title: `${t('gallery.pageTitle')} | ${t('clubName')}` });
</script>

<template>
  <div class="bg-black text-gray-100 min-h-screen flex flex-col custom-scrollbar">
    <GlobalHeader />

    <main class="flex-grow">
       <section class="bg-gray-900 py-4 border-b border-gray-800 sticky top-[80px] z-40 shadow-md">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
             <div class="flex items-center space-x-2 rtl:space-x-reverse overflow-x-auto pb-2 md:pb-0 w-full md:w-auto custom-scrollbar">
              <NuxtLink :to="localePath('/team')" class="flex items-center px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors whitespace-nowrap text-sm">
                <span class="me-1 rtl:me-0 rtl:ms-1">←</span>
                <span>{{ $t('gallery.backToTeam') }}</span>
              </NuxtLink>
               <button
                v-for="filter in filters"
                :key="filter.key"
                @click="setActiveFilter(filter.key)"
                :class="[
                  'px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-200 ease-in-out whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-primary',
                  activeFilter === filter.key
                    ? 'bg-primary text-white shadow-md scale-105'
                    : 'bg-gray-800 text-gray-300 hover:bg-primary/80 hover:text-white'
                ]"
              >
                {{ $t(filter.labelKey) }}
              </button>
            </div>
             <div class="flex items-center space-x-3 rtl:space-x-reverse w-full md:w-auto">
                <div class="relative flex-1 md:w-64">
                  <input v-model="searchInput" type="text" :placeholder="t('gallery.searchPlaceholder')" class="search-input w-full bg-gray-800 text-white px-4 py-2 ps-10 rtl:pe-10 rtl:ps-4 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 border-none text-sm">
                  <div class="search-icon absolute start-3 rtl:start-auto rtl:end-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400 pointer-events-none">
                    <span class="text-lg">🔍</span>
                  </div>
                </div>
                <div class="flex items-center bg-gray-800 rounded-full p-1">
                  <button @click="setView('grid')" :class="['view-toggle w-8 h-8 flex items-center justify-center rounded-full transition-colors', currentView === 'grid' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white']" aria-label="Grid View">
                    <span class="text-lg">▦</span>
                  </button>
                   <button @click="setView('list')" :class="['view-toggle w-8 h-8 flex items-center justify-center rounded-full transition-colors', currentView === 'list' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white']" aria-label="List View">
                    <span class="text-lg">☰</span>
                  </button>
                </div>
            </div>
          </div>
        </div>
      </section>

       <section class="py-12 bg-black">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row items-center justify-between gap-8">
            <div class="md:w-1/2">
              <h1 class="text-4xl md:text-5xl font-bold mb-4 text-white">{{ $t('gallery.heroTitle') }}</h1>
              <p class="text-gray-400 text-lg mb-6">{{ $t('gallery.heroDesc') }}</p>
              <div class="flex flex-wrap gap-4">
                <div class="bg-gray-900 rounded-lg px-5 py-3 flex items-center">
                  <div class="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full me-3 rtl:me-0 rtl:ms-3 text-primary text-2xl">🖼️</div>
                  <div>
                    <div class="text-sm text-gray-400">{{ $t('gallery.totalImages') }}</div>
                    <div class="text-xl font-bold text-white">1,248 {{ $t('gallery.photos') }}</div>
                  </div>
                </div>
                 <div class="bg-gray-900 rounded-lg px-5 py-3 flex items-center">
                  <div class="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full me-3 rtl:me-0 rtl:ms-3 text-primary text-2xl">📁</div>
                  <div>
                    <div class="text-sm text-gray-400">{{ $t('gallery.categories') }}</div>
                    <div class="text-xl font-bold text-white">4 {{ $t('gallery.collections') }}</div>
                  </div>
                </div>
                 <div class="bg-gray-900 rounded-lg px-5 py-3 flex items-center">
                  <div class="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full me-3 rtl:me-0 rtl:ms-3 text-primary text-2xl">🔄</div>
                  <div>
                    <div class="text-sm text-gray-400">{{ $t('gallery.lastUpdated') }}</div>
                    <div class="text-xl font-bold text-white">April 20, 2025</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="md:w-1/2">
              <img src="https://readdy.ai/api/search-image?query=professional%2520football%2520team%2520celebration%2520with%2520trophy%252C%2520jubilant%2520players%2520in%2520blue%2520kit%2520celebrating%2520victory%252C%2520confetti%2520falling%252C%2520stadium%2520atmosphere%252C%2520fans%2520cheering%252C%2520emotional%2520moment%252C%2520high-quality%2520sports%2520photography%252C%2520dramatic%2520lighting&width=600&height=400&seq=123456&orientation=landscape" alt="Al-Olympi Club Gallery" class="w-full h-auto rounded-lg shadow-2xl">
            </div>
          </div>
        </div>
      </section>

       <section class="py-12 bg-gradient-to-b from-black to-gray-900">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-3xl font-bold text-white">{{ $t('gallery.featuredMoments') }}</h2>
            <div class="flex space-x-2 rtl:space-x-reverse">
              <button @click="prevSlide" class="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full text-white hover:bg-primary transition-colors" aria-label="Previous Slide">
                 <span><</span>
              </button>
              <button @click="nextSlide" class="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full text-white hover:bg-primary transition-colors" aria-label="Next Slide">
                <span>></span>
              </button>
            </div>
          </div>

           <div class="featured-slider rounded-xl overflow-hidden relative" @mouseenter="stopAutoSlide" @mouseleave="startAutoSlide">
            <div class="slider-container flex" ref="sliderContainerRef">
              <div v-for="item in featuredSliderItems" :key="'featured-'+item.id" class="slider-item flex-shrink-0 w-full">
                <div class="relative h-[400px] md:h-[500px]">
                  <img :src="item.image" :alt="item.title" class="w-full h-full object-cover">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div class="absolute bottom-0 start-0 p-6 md:p-8 max-w-2xl">
                     <span :class="['inline-block text-white text-sm font-medium mb-3 px-3 py-1 rounded-full', getCategoryTagClass(item.category)]">{{ t(`gallery.filters.${item.category}`) }}</span>
                    <h3 class="text-2xl md:text-3xl font-bold text-white mb-2">{{ item.title }}</h3>
                    <p class="text-gray-300 mb-4 text-sm md:text-base line-clamp-2">{{ item.description }}</p>
                    <div class="flex items-center text-gray-400 text-sm">
                       <span class="me-2 rtl:me-0 rtl:ms-2">📅</span>
                      <span>{{ item.date }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
             <div class="slider-dots absolute bottom-5 start-0 end-0 flex justify-center space-x-2 rtl:space-x-reverse">
                 <button v-for="(slide, index) in featuredSliderItems.length" :key="'dot-'+index"
                         @click="goToSlide(index)"
                         class="w-2.5 h-2.5 rounded-full transition-colors duration-300 focus:outline-none"
                         :class="currentSlideIndex === index ? 'bg-primary scale-110' : 'bg-gray-500/50 hover:bg-gray-500/80'"
                         :aria-label="`Go to slide ${index + 1}`">
                 </button>
             </div>
          </div>
        </div>
      </section>

      <section id="gallery-grid-section" class="py-12 bg-gray-900">
        <div class="container mx-auto px-4">
          <div class="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
             <h2 class="text-2xl font-bold text-white">{{ $t(`gallery.filters.${activeFilter}`) }} {{ t('gallery.photos') }}</h2>
            <div class="flex items-center">
              <label for="sort-select" class="text-gray-400 me-2 rtl:me-0 rtl:ms-2 text-sm whitespace-nowrap">{{ $t('gallery.sortBy') }}</label>
              <select id="sort-select" v-model="currentSort" class="bg-gray-800 text-white border-none rounded-full px-4 py-2 pe-8 rtl:ps-8 rtl:pe-4 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm appearance-none">
                <option value="newest">{{ $t('gallery.newest') }}</option>
                <option value="oldest">{{ $t('gallery.oldest') }}</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
             <div v-for="(item, index) in paginatedGalleryItems" :key="item.id"
                  class="gallery-item bg-gray-800 rounded-xl overflow-hidden group relative aspect-square cursor-pointer border border-transparent hover:border-primary/50 transition-all duration-300"
                  @click="openLightbox(index)">
                 <img :src="item.image.replace(/width=\d+&height=\d+/,'width=400&height=400&orientation=squarish')" :alt="item.title" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
                  <div class="gallery-overlay absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex items-center justify-center">
                    <div class="w-12 h-12 flex items-center justify-center bg-primary rounded-full text-white transform scale-75 group-hover:scale-100 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                      <span class="text-2xl">🔍</span>
                    </div>
                     <div class="absolute bottom-2 start-2 end-2 p-2 bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center backdrop-blur-sm">
                          <h3 class="font-bold text-white text-xs truncate">{{ item.title }}</h3>
                          <p class="text-gray-300 text-[10px] truncate">{{ item.date }}</p>
                     </div>
                  </div>
             </div>
          </div>

           <div v-if="filteredGalleryItems.length === 0" class="text-center py-16 text-gray-400">
              <p class="text-xl mb-4">No photos found for this category or search term.</p>
          </div>

          <div v-if="currentPage < totalPages" class="mt-12 text-center">
            <button @click="changePage(currentPage + 1)" class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors whitespace-nowrap text-sm">
              <div class="flex items-center justify-center">
                <span>{{ $t('gallery.loadMore') }}</span>
                 <span class="ms-2 rtl:ms-0 rtl:me-2 text-lg">↓</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      <section class="py-12 bg-black">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold mb-8 text-white">{{ $t('gallery.moreCategories') }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div v-for="filter in filters.filter(f => f.key !== activeFilter && f.key !== 'all').slice(0,3)" :key="'cat-'+filter.key"
                  @click="setActiveFilter(filter.key); scrollToTop()"
                  class="bg-gray-800 rounded-xl overflow-hidden group relative cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1">
                <div class="relative h-56 md:h-64">
                    <img :src="allGalleryItems.find(item => item.category === filter.key)?.image.replace(/width=\d+&height=\d+/,'width=500&height=300&orientation=landscape') || 'https://via.placeholder.com/500x300/cccccc/000000?text=Category'" :alt="t(filter.labelKey)" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div class="absolute bottom-0 start-0 p-4 md:p-6">
                    <h3 class="text-xl md:text-2xl font-bold text-white mb-2">{{ t(filter.labelKey) }}</h3>
                    <span class="inline-flex items-center text-sm font-semibold text-primary group-hover:text-accent-yellow transition-colors duration-300">
                        {{ $t('gallery.viewGallery') }}
                        <span class="ms-1 rtl:ms-0 rtl:me-1">→</span>
                    </span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      <transition
         enter-active-class="transition ease-out duration-300"
         enter-from-class="opacity-0 transform translate-y-2"
         enter-to-class="opacity-100 transform translate-y-0"
         leave-active-class="transition ease-in duration-200"
         leave-from-class="opacity-100 transform translate-y-0"
         leave-to-class="opacity-0 transform translate-y-2"
        >
          <button v-show="showBackToTop" @click="scrollToTop"
                  class="fixed bottom-8 end-8 w-12 h-12 flex items-center justify-center bg-primary rounded-full text-white shadow-lg cursor-pointer z-40 hover:bg-primary/80 transition-all"
                  aria-label="Back to Top">
            <span class="text-2xl">↑</span>
          </button>
      </transition>

      <transition
         enter-active-class="transition ease-out duration-300"
         enter-from-class="opacity-0"
         enter-to-class="opacity-100"
         leave-active-class="transition ease-in duration-200"
         leave-from-class="opacity-100"
         leave-to-class="opacity-0"
        >
          <div v-if="isLightboxOpen && currentLightboxItem" @click.self="closeLightbox" class="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
             <div class="relative w-full max-w-5xl max-h-[90vh] flex flex-col">
                  <button @click="closeLightbox" class="absolute -top-10 sm:-top-12 end-0 w-10 h-10 flex items-center justify-center bg-gray-700/50 rounded-full text-white z-50 hover:bg-gray-600 transition-colors" aria-label="Close Lightbox">
                   <span class="text-2xl">×</span>
                  </button>

                   <div class="relative flex-shrink-0 flex items-center justify-center mb-4">
                      <button @click="prevLightboxImage" class="absolute start-0 sm:-start-12 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-gray-800/60 rounded-full text-white z-10 hover:bg-gray-700 transition-colors" aria-label="Previous image">
                         <span class="text-2xl"><</span>
                      </button>
                       <img :src="currentLightboxItem.image.replace(/width=\d+&height=\d+/,'width=1200&height=800')" :alt="currentLightboxItem.title" class="max-w-full max-h-[65vh] sm:max-h-[70vh] object-contain rounded-lg shadow-xl">
                       <button @click="nextLightboxImage" class="absolute end-0 sm:-end-12 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-gray-800/60 rounded-full text-white z-10 hover:bg-gray-700 transition-colors" aria-label="Next image">
                          <span class="text-2xl">></span>
                       </button>
                   </div>

                  <div class="bg-gray-800/80 p-4 rounded-xl backdrop-blur-sm mt-auto flex-shrink-0 w-full sm:max-w-3xl mx-auto">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                      <div>
                        <span :class="['inline-block text-white text-xs font-medium me-2 rtl:me-0 rtl:ms-2 px-2 py-0.5 rounded-full', getCategoryTagClass(currentLightboxItem.category)]">{{ $t(`gallery.filters.${currentLightboxItem.category}`) }}</span>
                        <span class="text-gray-400 text-xs">{{ currentLightboxItem.date }}</span>
                      </div>
                    </div>
                    <h3 class="text-base md:text-lg font-bold text-white mb-1">{{ currentLightboxItem.title }}</h3>
                    <p class="text-gray-300 text-sm line-clamp-2">{{ currentLightboxItem.description }}</p>
                  </div>
             </div>
          </div>
       </transition>

    </main>

    <GlobalFooter />
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: theme('colors.primary.DEFAULT');
  border-radius: 4px;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}
.gallery-overlay {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.slider-container {
  display: flex;
  transition: transform 0.5s ease-in-out;
}
.slider-item {
  flex: 0 0 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
</style>