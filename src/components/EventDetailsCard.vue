<script setup lang="ts">
import type { Event } from '@/types'

defineProps<{
  event: Event
}>()
</script>

<template>
  <div
    class="p-[10px] w-[250px] border border-gray-300 mb-[10px] bg-gray-50 shadow-sm"
  >
    <p class="text-base text-right m-0 py-[2px] px-0">{{ event.category }}</p>
    <p class="text-base text-right m-0 py-[2px] px-0">{{ event.organizer }}</p>
  </div>
</template>

<style scoped>
</style>