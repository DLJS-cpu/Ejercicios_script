<template>
  <button @click="ejecutarAccion">{{ title }}</button>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['ejecutar-accion'])

function ejecutarAccion() {
  emit('ejecutar-accion')
}
</script>