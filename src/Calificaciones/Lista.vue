<template>
  <ul>
    <li v-for="alumno in alumnos" :key="alumno.id">
      <strong>{{ alumno.nombre }}</strong>
      <ul v-if="alumno.materias.length > 0">
        <li v-for="materia in alumno.materias" :key="materia.id">
          {{ materia.nombre }}
        </li>
      </ul>
      <p v-else>Sin materias</p>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  alumnos: {
    type: Array,
    required: true
  }
})
</script>