<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import EventService from '@/services/EventService'
import { useMessageStore } from '@/stores/message'
import type { EventItem } from '@/types'

const props = defineProps<{
  id: string
}>()

const event = ref<EventItem | null>(null)
const router = useRouter()
const store = useMessageStore()

watchEffect(() => {
  if (props.id) {
    EventService.getEvent(props.id)
      .then((response) => {
        event.value = response.data
      })
      .catch((error) => {
        console.error('Error fetching event for edit:', error)
        router.push({
          name: '404-resource',
          params: { resource: 'event' },
        })
      })
  }
})

const updateEvent = () => {
  store.updateMessage('The event data has been updated!')
  router.push({
    name: 'event-detail-view',
    params: { id: props.id },
  })
}
</script>

<template>
  <div v-if="event">
    <h1>Edit {{ event.title }}</h1>

    <p>This is where you would edit the event details for: {{ event.title }}</p>
    <p>Category: {{ event.category }}</p>
    <p>Location: {{ event.location }}</p>

    <button
      @click="updateEvent"
      class="bg-green-500 text-white py-2.5 px-5 text-base mt-[15px] cursor-pointer rounded-[5px] inline-block hover:bg-green-600"
    >
      Update Event
    </button>

    <p style="margin-top: 20px">
      <RouterLink :to="{ name: 'event-detail-view', params: { id: event.id } }"
        >Back to Details</RouterLink
      >
    </p>
  </div>
  <div v-else>
    <p>Loading event for editing...</p>
  </div>
</template>

<style scoped>
</style>