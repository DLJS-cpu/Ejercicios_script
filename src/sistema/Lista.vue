<template>
  <ul>
    <li v-for="cliente in clientes" :key="cliente.id">
      <strong>{{ cliente.nombre }}</strong>
      <ul v-if="cliente.cuentas.length > 0">
        <li v-for="cuenta in cliente.cuentas" :key="cuenta.id">
          <strong>{{ cuenta.tipo }}</strong> - Saldo: ${{ cuenta.saldo.toFixed(2) }}
          <ul v-if="cuenta.movimientos.length > 0">
            <li v-for="movimiento in cuenta.movimientos" :key="movimiento.id">
              {{ movimiento.tipo }}: ${{ movimiento.monto.toFixed(2) }} - {{ movimiento.fecha }}
            </li>
          </ul>
          <p v-else>Sin movimientos</p>
        </li>
      </ul>
      <p v-else>Sin cuentas</p>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  clientes: {
    type: Array,
    required: true
  }
})
</script>