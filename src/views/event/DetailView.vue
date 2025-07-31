<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import EventService from '@/services/EventService'
import type { EventItem } from '@/types'
import { useMessageStore } from '@/stores/message' // Import the message store
import { storeToRefs } from 'pinia' // Import storeToRefs to destructure reactive state

const props = defineProps<{
  id: string // This prop receives the event ID from the route
}>()

const event = ref<EventItem | null>(null)
const router = useRouter()

// --- NEW PINIA INTEGRATION for local display ---
const messageStore = useMessageStore() // Get the instance of your message store
const { message } = storeToRefs(messageStore) // Extract 'message' as a reactive reference

// Watch for changes in the 'message' from the store
// If a message is present, set a timeout to clear it after 3 seconds
watchEffect(() => {
  if (message.value) {
    setTimeout(() => {
      messageStore.resetMessage() // Call the action to clear the message
    }, 3000) // Message will disappear after 3 seconds
  }
})
// --- END NEW PINIA INTEGRATION ---

// Fetch event details based on the ID prop
watchEffect(() => {
  if (props.id) {
    EventService.getEvent(props.id)
      .then((response) => {
        event.value = response.data
      })
      .catch((error) => {
        console.error('Error fetching event details:', error)
        if (error.response && error.response.status === 404) {
          router.push({
            name: '404-resource',
            params: { resource: 'event' },
          })
        } else {
          router.push({ name: 'network-error' })
        }
      })
  }
})
</script>

<template>
  <div v-if="event">
    <div v-if="message" class="local-flash-message">
      <h4>{{ message }}</h4>
    </div>
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
  <div v-else>
    <p>Loading event details...</p>
  </div>
</template>

<style scoped>
/* Scoped styles for this component, including the local flash message */
.local-flash-message {
  background-color: yellow;
  padding: 10px;
  margin-bottom: 20px;
  border-left: 5px solid orange;
  /* Use the keyframes animation defined globally or define it here if you want it only for this local message */
  animation: yellofade 3s ease-in-out forwards; /* 'forwards' ensures it stays transparent at the end */
}

/* If yellofade is not defined globally in App.vue, you can define it here too */
@keyframes yellofade {
  from {
    background-color: yellow;
    opacity: 1;
  }
  to {
    background-color: transparent;
    opacity: 0;
  }
}
</style>
