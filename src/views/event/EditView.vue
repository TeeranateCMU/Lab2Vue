<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import EventService from '@/services/EventService' // Make sure this path is correct
import { useMessageStore } from '@/stores/message' // Import the message store
import type { EventItem } from '@/types' // Assuming EventItem type is defined

const props = defineProps<{
  id: string // The ID will come from the route params
}>()

const event = ref<EventItem | null>(null)
const router = useRouter()
const store = useMessageStore() // Initialize the message store

// Fetch event details based on ID
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

// --- NEW METHOD FOR UPDATE BUTTON ---
const updateEvent = () => {
  // In a real application, you would typically send updated data to an API here.
  // For this task, we are simulating the update by simply setting a flash message
  // and navigating to demonstrate the functionality.

  store.updateMessage('The event data has been updated!') // Set the message in the Pinia store

  // Navigate to the event details page using its named route and parameters
  router.push({
    name: 'event-detail-view', // IMPORTANT: Use the actual route name for your Event Detail View
    params: { id: props.id }, // Pass the current event's ID
  })
}
</script>

<template>
  <div v-if="event">
    <h1>Edit {{ event.title }}</h1>

    <p>This is where you would edit the event details for: {{ event.title }}</p>
    <p>Category: {{ event.category }}</p>
    <p>Location: {{ event.location }}</p>

    <button @click="updateEvent" class="update-button">Update Event</button>

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
.update-button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 15px;
  cursor: pointer;
  border-radius: 5px;
}
.update-button:hover {
  background-color: #45a049;
}
</style>
