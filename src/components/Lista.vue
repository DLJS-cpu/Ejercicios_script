<template>
  <div>
    <h2>Listado de calificaciones</h2>
    <div>
      <p>Alumno: {{ store.nombreAlumno }}</p>
      <p>Promedio general: {{ formatear(store.promedioGeneral) }}</p>
    </div>
    <div v-if="store.materias.length === 0">
      <p>No hay materias registradas.</p>
    </div>
    <div v-for="materia in store.materias" :key="materia.id">
      <h3>{{ materia.nombre }}</h3>
      <p>Promedio de la materia: {{ formatear(store.promedioMateria(materia.id)) }}</p>
      <div v-if="materia.calificaciones.length === 0">
        <p>No hay calificaciones para esta materia.</p>
      </div>
      <ul v-else>
        <li v-for="(c, idx) in materia.calificaciones" :key="idx">
          {{ idx }} - {{ c }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useCalificacionesStore } from './store/calificaciones.js'

const store = useCalificacionesStore()

function formatear(valor) {
  if (valor === null || valor === undefined) {
    return '0.00'
  }
  var n = Number(valor)
  if (isNaN(n)) {
    return '0.00'
  }
  return n.toFixed(2)
}
</script>