<template>
  <div>
    <h2>Formulario de calificaciones</h2>
    
    <div>
      <input
        v-model="nombreAlumno"
        placeholder="Nombre del alumno"
      />
      <Boton
        tipo="guardarAlumno"
        texto="Guardar alumno"
        :nombre="nombreAlumno"
      />
    </div>
    
    <div>
      <input
        v-model="nombreMateria"
        placeholder="Nombre de la materia"
      />
      <Boton
        tipo="agregarMateria"
        texto="Agregar materia"
        :nombre="nombreMateria"
        @click="nombreMateria = ''"
      />
    </div>
    
    <div v-show="store.materias.length > 0">
      <div v-for="materia in store.materias" :key="materia.id">
        <h4>{{ materia.nombre }}</h4>
        <input
          v-model.number="calificaciones[materia.id]"
          type="number"
          placeholder="Calificación"
          min="0"
          max="100"
        />
        <Boton
          tipo="agregarCalificacion"
          texto="Agregar calificación"
          :id-materia="materia.id"
          :calificacion="calificaciones[materia.id]"
          @click="calificaciones[materia.id] = ''"
        />
        
        <ul v-show="materia.calificaciones && materia.calificaciones.length > 0">
          <li v-for="(c, index) in materia.calificaciones" :key="index">
            Calificación {{ index + 1 }}: {{ c }}
            <Boton
              tipo="eliminarCalificacion"
              texto="Eliminar"
              :id-materia="materia.id"
              :indice="index"
            />
          </li>
        </ul>
        
        <p v-show="materia.calificaciones && materia.calificaciones.length > 0">
          Promedio: {{ store.promedioMateria(materia.id) }}
        </p>
        
        <Boton
          tipo="eliminarMateria"
          texto="Eliminar materia"
          :id-materia="materia.id"
        />
      </div>
    </div>
    
    <h3 v-show="store.nombreAlumno">Alumno: {{ store.nombreAlumno }}</h3>
    <h3 v-show="store.materias.length > 0">
      Promedio general: {{ store.promedioGeneral }}
    </h3>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useCalificacionesStore } from './store/calificaciones'
import Boton from './Boton.vue'

const store = useCalificacionesStore()
const nombreAlumno = ref('')
const nombreMateria = ref('')
const calificaciones = reactive({})
</script>