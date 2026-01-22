<template>
  <form @submit.prevent>
    <label for="NombreAlumno">Nombre del Alumno:</label>
    <input type="text" id="NombreDelAlumno" v-model="nombreAlumno" name="nombre">
    <Boton title="Agregar" @click="agregarAlumno"/>
    <br>
    <label for="AlumnoSeleccionado">Seleccionar Alumno:</label>
    <select v-model="alumnoSeleccionado" id="AlumnoSeleccionado">
      <option value="">-- Seleccione un alumno --</option>
      <option v-for="alumno in store.todosLosAlumnos" :key="alumno.id" :value="alumno.id">
        {{ alumno.nombre }}
      </option>
    </select>
    <br>
    <label for="NombreMateria">Nombre de la Materia:</label>
    <input type="text" id="NombreDeMateria" v-model="nombreMateria" name="materia">
    <Boton title="Agregar" @click="agregarMateria"/>
  </form>
  <Lista :alumnos="store.todosLosAlumnos" />
</template>

<script setup>
import { ref } from 'vue'
import Boton from './Boton.vue'
import Lista from './Lista.vue'
import { useCalificacionesStore } from '../store/calificaciones'

const store = useCalificacionesStore()
const nombreAlumno = ref('')
const nombreMateria = ref('')
const alumnoSeleccionado = ref('')

function agregarAlumno() {
  if (nombreAlumno.value) {
    store.agregarAlumno(nombreAlumno.value)
    nombreAlumno.value = ''
  }
}

function agregarMateria() {
  if (nombreMateria.value && alumnoSeleccionado.value) {
    store.agregarMateria(alumnoSeleccionado.value, nombreMateria.value)
    nombreMateria.value = ''
  } else if (!alumnoSeleccionado.value) {
    alert('Por favor selecciona un alumno primero')
  }
}
</script>