<!-- src/views/StudentListView.vue -->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StudentService from '@/services/StudentService'
import type { Student } from '@/types'

const students = ref<Student[] | null>(null)

onMounted(() => {
  StudentService.getStudents()
    .then((response) => {
      students.value = response.data
      console.log('Fetched Students:', response.data)
    })
    .catch((error) => {
      console.error('There was an error fetching students!', error)
    })
})
</script>

<template>
  <h1>Our Students</h1>
  <div class="students-list">
    <div v-if="students">
      <div v-for="student in students" :key="student.id" class="student-card">
        <h2>{{ student.name }} {{ student.surname }}</h2>
        <p>GPA: {{ student.gpa }}</p>
      </div>
    </div>
    <div v-else>Loading student data...</div>
  </div>
</template>

<style scoped>
.students-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.student-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;
}
.student-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 5px;
}

p {
  font-size: 1.1rem;
  color: #42b983;
  margin-top: 5px;
}
</style>
