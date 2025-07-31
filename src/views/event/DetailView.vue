<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import EventService from '@/services/EventService'
import type { EventItem } from '@/types'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  id: string
}>()

const event = ref<EventItem | null>(null)
const router = useRouter()

const messageStore = useMessageStore()
const { message } = storeToRefs(messageStore)

watchEffect(() => {
  if (message.value) {
    setTimeout(() => {
      messageStore.resetMessage()
    }, 3000)
  }
})

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
    <div
      v-if="message"
      class="bg-yellow-200 p-[10px] mb-[20px] border-l-[5px] border-orange-500 animate-fade"
    >
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
</style>