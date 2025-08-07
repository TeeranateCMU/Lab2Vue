<script setup lang="ts">
import EventCard from '../components/EventCard.vue';
import EventService from '../services/EventService';
import { type Event } from '../types';
import { ref, onMounted, computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const events = ref<Event[] | null>(null)
const totalEvents = ref(0)

const page = computed(() => Number(route.query.page) || 1)
const size = computed(() => Number(route.query.size) || 2)

const hasNexPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 3);
  return page.value < totalPages
})

onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(3, page.value)
      .then((response) => {
        events.value = response.data;
        totalEvents.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.error('There was an error!', error);
      })
  })
})

</script>

<template>
   <h1>Events For Good</h1>
    <div class="flex flex-col items-center">
    <div class="flex flex-col items-center">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
    
    <div class="flex flex-col items-center">
      <EventDetailsCard v-for="event in events" :key="event.id" :event="event" />
    </div>
  
  </div>
    <div class ="flex justtify-center w-[290px] mx-auto mt-8 ">
<RouterLink id="page-prev" :to="{ name: 'event-list-view', query: { page: page - 1, size: size } }"
  rel="prev" v-if ="page != 1" 
  class="flex-1 text-[#2c3e50] no-underline text-left"
  >&#60; Prev page</RouterLink>

   <RouterLink id="page-next" :to="{ name: 'event-list-view', query: { page: page + 1 , size: size } }"
  rel="next" v-if="hasNexPage" class="flex-1 text-[#2c3e50] text-right">
  Next page &#62;</RouterLink>
  </div>
  

</template>

<style scoped>
</style>