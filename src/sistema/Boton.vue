<template>
  <button :disabled="desabilitado" @click="accionar">
    {{ title }}
  </button>
</template>

<script setup>
const props = defineProps({
  title: {
    type:String,
    required: true
  },
  desabilitado:{
    type: Boolean,
    default: false
  }
})
</script>
