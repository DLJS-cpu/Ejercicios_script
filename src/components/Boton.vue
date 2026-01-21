<template>
  <button @click="alHacerClick">
    {{ texto }}
  </button>
</template>

<script setup>
import { useCalificacionesStore } from './store/calificaciones'
const props = defineProps({
    tipo:String,
    texto:String,
    nombre: String,
    idMateria:[String, Number]
})

const store = useCalificacionesStore(function alHacerClick(){
    if(props.tipo = 'guardarAlumno'){
        
    }
    
})
</script>