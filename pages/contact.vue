<script setup lang="ts">
import { ref } from 'vue';

import { useI18n, useLocalePath, useHead } from '#imports';
import { MapPin, Phone, Mail } from 'lucide-vue-next';

const { t } = useI18n();
const localePath = useLocalePath();

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const submitStatus = ref<'success' | 'error' | null>(null);

async function submitForm() {
  isSubmitting.value = true;
  submitStatus.value = null;
  console.log('Submitting:', formData.value);
  // --- Replace with actual API call ---
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
  // Example success/error
  const success = Math.random() > 0.3; // Simulate success/fail
  if (success) {
      submitStatus.value = 'success';
      formData.value = { name: '', email: '', subject: '', message: '' }; // Clear form
  } else {
      submitStatus.value = 'error';
  }
  // --- End Simulation ---
  isSubmitting.value = false;
}

useHead({
    title: `${t('header.contact')} | ${t('clubName')}`
})
</script>

<template>
  <div class="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
    <GlobalHeader />

    <main class="flex-grow">
      <section class="bg-gradient-to-br from-primary via-secondary to-gray-900 py-16 lg:py-24">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-white uppercase tracking-tight drop-shadow-lg">
            {{ $t('contact.pageTitle') }}
          </h1>
          <p class="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">{{ $t('contact.intro') }}</p>
        </div>
      </section>

      <section class="py-16 lg:py-20 bg-gray-900">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">

            <div class="bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-700">
              <h2 class="text-2xl font-bold font-heading text-white mb-6">{{ $t('contact.headquarters') }}</h2>
              <div class="space-y-5 text-gray-300">
                <div class="flex items-start">
                  <MapPin class="w-5 h-5 text-primary me-3 rtl:me-0 rtl:ms-3 mt-1 flex-shrink-0"/>
                  <div>
                     <strong class="text-white block">{{ $t('contact.address') }}:</strong>
                     <span>{{ $t('contact.addressDetail') }}</span>
                  </div>
                </div>
                 <div class="flex items-start">
                  <Phone class="w-5 h-5 text-primary me-3 rtl:me-0 rtl:ms-3 mt-1 flex-shrink-0"/>
                   <div>
                     <strong class="text-white block">{{ $t('contact.phone') }}:</strong>
                     <a href="tel:+218..." class="hover:text-accent-yellow transition-colors">[Club Phone Number]</a>
                   </div>
                </div>
                 <div class="flex items-start">
                   <Mail class="w-5 h-5 text-primary me-3 rtl:me-0 rtl:ms-3 mt-1 flex-shrink-0"/>
                   <div>
                     <strong class="text-white block">{{ $t('contact.email') }}:</strong>
                      <a href="mailto:info@olympi.ly" class="hover:text-accent-yellow transition-colors">info@olympi.ly</a>
                   </div>
                </div>
                 </div>
            </div>

            <div class="bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-700">
              <h2 class="text-2xl font-bold font-heading text-white mb-6">{{ $t('contact.formHeading') }}</h2>
              <form @submit.prevent="submitForm" class="space-y-5">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-300 mb-1">{{ $t('contact.formName') }}</label>
                  <input type="text" id="name" v-model="formData.name" required
                         class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border-transparent focus:border-primary focus:ring-2 focus:ring-primary/50 transition duration-150 ease-in-out">
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-300 mb-1">{{ $t('contact.formEmail') }}</label>
                  <input type="email" id="email" v-model="formData.email" required
                         class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border-transparent focus:border-primary focus:ring-2 focus:ring-primary/50 transition duration-150 ease-in-out">
                </div>
                <div>
                  <label for="subject" class="block text-sm font-medium text-gray-300 mb-1">{{ $t('contact.formSubject') }}</label>
                  <input type="text" id="subject" v-model="formData.subject" required
                         class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border-transparent focus:border-primary focus:ring-2 focus:ring-primary/50 transition duration-150 ease-in-out">
                </div>
                <div>
                   <label for="message" class="block text-sm font-medium text-gray-300 mb-1">{{ $t('contact.formMessage') }}</label>
                  <textarea id="message" v-model="formData.message" rows="5" required
                            class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border-transparent focus:border-primary focus:ring-2 focus:ring-primary/50 transition duration-150 ease-in-out"></textarea>
                </div>
                <div>
                  <button type="submit" :disabled="isSubmitting"
                          class="w-full inline-flex items-center justify-center px-8 py-3 border-2 border-transparent text-base font-bold rounded-xl shadow-lg text-primary-foreground bg-primary hover:bg-accent hover:border-accent focus:outline-none focus:ring-4 focus:ring-primary/50 transition-all duration-300 transform hover:scale-105 uppercase disabled:opacity-70 disabled:cursor-not-allowed">
                     <svg v-if="isSubmitting" class="animate-spin -ms-1 me-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                       <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                    {{ $t('contact.formSubmit') }}
                  </button>
                </div>
                 <p v-if="submitStatus === 'success'" class="text-sm text-green-400 text-center">Message sent successfully!</p>
                 <p v-if="submitStatus === 'error'" class="text-sm text-red-400 text-center">Failed to send message. Please try again.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

       <section class="py-16 lg:py-20 bg-gray-800/50">
          <div class="container mx-auto px-4">
              <h2 class="text-3xl font-bold font-heading text-white mb-8 text-center">{{ $t('contact.findUs') }}</h2>
              <div class="aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-700">
                   <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.086787071942!2d55.27216161500961!3d25.19719708389298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a6e13a3%3A0x5756fa68f237c654!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1678886888000!5m2!1sen!2sae"
                        width="100%"
                        height="450"
                        style="border:0;"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade">
                   </iframe>
                   <!-- Replace the src above with the correct embed URL for your club's location -->
              </div>
          </div>
       </section>
    </main>

    <GlobalFooter />
  </div>
</template>