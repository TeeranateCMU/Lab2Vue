<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import type { Event } from '@/types'
import EventDetailsCard from '@/components/EventCardDetail.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
const events = ref<Event[]>(null)
onMounted(() => {
  axios
    .get('[your mock server url]')
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <h1>Events For Good</h1>
  <!-- new element -->
  <div class="events">
    <div v-for="event in events" :key="event.id">
      <EventCard :event="event" />
      <EventDetailsCard :event="event" />
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
