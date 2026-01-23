<template>
  <div>
    <h1>Registro de Cajero Bancario</h1>
    
    <form @submit.prevent>
      <label for="NombreCliente">Nombre del Cliente:</label>
      <input type="text" id="NombreCliente" v-model="nombreCliente">
      <label for="MontoInicial">Monto Inicial:</label>
      <input type="number" id="MontoInicial" v-model.number="montoInicial" min="0" step="0.01">
      <button @click="agregarCliente">Agregar</button>
      <br>
      <label for="ClienteSeleccionado">Seleccionar Cliente:</label>
      <select v-model="clienteSeleccionado" id="ClienteSeleccionado">
        <option value="">-- Seleccione un cliente --</option>
        <option v-for="cliente in store.todosLosClientes" :key="cliente.id" :value="cliente.id">
          {{ cliente.nombre }}
        </option>
      </select>
      <br>
      <label for="MontoOperacion">Monto de la Operación:</label>
      <input type="number" id="MontoOperacion" v-model.number="montoOperacion" min="0" step="0.01">
      <button @click="depositar">Depositar</button>
      <button @click="retirar">Retirar</button>
    </form>
    
    <ul>
      <li v-for="cliente in store.todosLosClientes" :key="cliente.id">
        <strong>{{ cliente.nombre }}</strong> - Saldo: ${{ cliente.saldo.toFixed(2) }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCajeroStore } from '../store/cajero'

const store = useCajeroStore()
const nombreCliente = ref('')
const montoInicial = ref(0)
const montoOperacion = ref(0)
const clienteSeleccionado = ref('')

function agregarCliente() {
  if (nombreCliente.value) {
    store.agregarCliente(nombreCliente.value, montoInicial.value)
    nombreCliente.value = ''
    montoInicial.value = 0
  }
}

function depositar() {
  if (montoOperacion.value && clienteSeleccionado.value) {
    store.depositarMonto(clienteSeleccionado.value, montoOperacion.value)
    montoOperacion.value = 0
  } else if (!clienteSeleccionado.value) {
    alert('Por favor selecciona un cliente primero')
  }
}

function retirar() {
  if (montoOperacion.value && clienteSeleccionado.value) {
    const resultado = store.retirarMonto(clienteSeleccionado.value, montoOperacion.value)
    if (resultado) {
      montoOperacion.value = 0
    } else {
      alert('Saldo insuficiente para realizar el retiro')
    }
  } else if (!clienteSeleccionado.value) {
    alert('Por favor selecciona un cliente primero')
  }
}
</script>