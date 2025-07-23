<script setup lang="ts">
import type { Event } from '@/types'

defineProps<{
  event: Event
}>()
</script>

<template>
  <div class="event-details-card">
    <p class="category">{{ event.category }}</p>
    <p class="organizer">{{ event.organizer }}</p>
  </div>
</template>

<style scoped>
.event-details-card {
  padding: 10px; 
  width: 250px;
  border: 1px solid #ccc; 
  margin-bottom: 10px; 
  background-color: #f9f9f9; 
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); 
}

.category,
.organizer {
  font-size: 1rem; 
  text-align: right; 
  margin: 0; 
  padding: 2px 0;
}
</style>