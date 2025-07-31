<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { type Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import router from '@/router'
const events = ref<Event[] | null>(null)
const totalEvents = ref(0)

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  limit: {
    type: Number,
    default: 2,
  },
})

const page = computed(() => props.page)
const limit = computed(() => props.limit)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 3)
  return page.value < totalPages
})

onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(3, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
      })
      .catch(() => {
        router.push({ name: 'network-error-view' })
      })
  })
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="flex flex-col items-center">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination flex w-[290px]">
   <RouterLink
  id="page-prev"
 class="flex-1 no-underline text-gray-700 text-left"
  :to="{ name: 'event-list-view', query: { page: page - 1, limit: limit } }"
  rel="prev"
  v-if="page != 1"
>
  &#60; Prev Page
</RouterLink>

<RouterLink
  id="page-next"
class="flex-1 no-underline text-gray-700 text-right"
  :to="{ name: 'event-list-view', query: { page: page + 1, limit: limit } }"
  rel="next"
  v-if="hasNextPage"
>
  Next Page &#62;
</RouterLink>
    </div>

    <div class="page-size-options mt-[20px] text-sm text-gray-600">
      Items per page:
      <RouterLink :to="{ name: 'event-list-view', query: { page: 1, limit: 2 } }" class="size-link mx-[5px] no-underline text-green-500 font-bold hover:underline">2</RouterLink>
      |
      <RouterLink :to="{ name: 'event-list-view', query: { page: 1, limit: 4 } }" class="size-link mx-[5px] no-underline text-green-500 font-bold hover:underline">4</RouterLink>
      |
      <RouterLink :to="{ name: 'event-list-view', query: { page: 1, limit: 6 } }" class="size-link mx-[5px] no-underline text-green-500 font-bold hover:underline">6</RouterLink>
    </div>
  </div>
</template>

<style scoped>
</style>
