<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { type Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'

const events = ref<Event[] | null>(null)
const totalEvents = ref(0) 

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  limit: { 
    type: Number,
    default: 2 
  }
})

const page = computed(() => props.page)
const limit = computed(() => props.limit) 

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / limit.value) 
  return page.value < totalPages
})

onMounted(() => {
  watchEffect(() => {
    events.value = null 
    EventService.getEvents(limit.value, page.value) 
      .then((response) => {
        events.value = response.data
        totalEvents.value = response.headers['x-total-count'] 
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  })
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'event-list-view', query: { page: page - 1, limit: limit } }" rel="prev"
        v-if="page != 1"
      >
        &#60; Prev Page
      </RouterLink>

      <RouterLink
        id="page-next"
        :to="{ name: 'event-list-view', query: { page: page + 1, limit: limit } }" rel="next"
        v-if="hasNextPage"
      >
        Next Page &#62;
      </RouterLink>
    </div>

    <div class="page-size-options">
      Items per page:
      <RouterLink :to="{ name: 'event-list-view', query: { page: 1, limit: 2 } }" class="size-link">2</RouterLink> |
      <RouterLink :to="{ name: 'event-list-view', query: { page: 1, limit: 4 } }" class="size-link">4</RouterLink> |
      <RouterLink :to="{ name: 'event-list-view', query: { page: 1, limit: 6 } }" class="size-link">6</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}

.page-size-options { /* + Add styles for page size links */
  margin-top: 20px;
  font-size: 0.9em;
  color: #555;
}

.size-link { /* + Add styles for individual size links */
  margin: 0 5px;
  text-decoration: none;
  color: #42b983;
  font-weight: bold;
}

.size-link:hover {
  text-decoration: underline;
}
</style>