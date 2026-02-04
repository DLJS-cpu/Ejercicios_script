<template>
  <div>
    <h1>Cajero BDN</h1>
    <form @submit="buscar">
      <div>
        <input 
          type="text" 
          id="BuscarCliente" 
          v-model="nombreBusqueda"
          placeholder="Ingrese nombre del cliente"
        >
        <Boton title="Buscar" @click="buscar"/>
      </div>
      <div v-if="clienteEncontrado">
        <input 
          type="number" 
          id="montoDeposito" 
          v-model.number="montoDeposito" 
          placeholder="0.00" 
          min="0" 
          step="0.01"
        >
        <Boton title="Ingresar" @click="depositar"/>
      </div>
      <div v-if="clienteEncontrado">
        <h3>Cliente: {{ clienteEncontrado.nombre }}</h3>
        <div>
          <p>
            Saldo: ${{ clienteEncontrado.saldo.toFixed(2) }}
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCajeroStore } from '../store/cajero'
import Boton from './Boton.vue'
import Swal from 'sweetalert2'

const store = useCajeroStore()
const montoDeposito = ref(0)
const nombreBusqueda = ref('')
const clienteEncontrado = ref(null)

function buscar(event) {
  event.preventDefault() 
  
  if (nombreBusqueda.value.trim()) {
    let resultado = store.buscarCliente(nombreBusqueda.value)
    
    //si no se encuentra cliente 
    if (resultado === false) {
      store.agregarCliente(nombreBusqueda.value, 0)
      resultado = store.buscarCliente(nombreBusqueda.value)
      
      // cliente nuevo
      Swal.fire({
        icon: 'success',
        title: 'Cliente nuevo',
        text: `Se creó la cuenta para ${nombreBusqueda.value}`
      })
    } else {
      //si encuentra al cliente se muestra el resultado
      Swal.fire({
        icon: 'info',
        title: 'Cliente encontrado',
        text: `Bienvenido ${resultado.nombre}`
      })
    }
    
    clienteEncontrado.value = resultado
    nombreBusqueda.value = ''
  }
}

function depositar() {
  if (clienteEncontrado.value && montoDeposito.value > 0) {
    let resultado = store.depositarMonto(clienteEncontrado.value.id, montoDeposito.value)
    
   //si el deposito fue exitoso 
    if (resultado === true) {
      // deposito existoso
      Swal.fire({
        icon: 'success',
        title: '¡Depósito exitoso!',
        text: `Se depositaron $${montoDeposito.value.toFixed(2)}`
      })
      ///exito 
      clienteEncontrado.value = store.buscarCliente(clienteEncontrado.value.nombre)
      montoDeposito.value = 0
    } else {
   // si el deposito fallo 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El monto debe ser positivo y múltiplo de 10'
      })
    }
  }
}
</script>