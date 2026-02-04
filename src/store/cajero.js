import { defineStore } from "pinia";

export const useCajeroStore = defineStore("cajero", {
  state: function () {
    return {
      clientes: [],
      clienteBuscado: null,
    };
  },
  actions: {
    agregarCliente: function (nombre, montoInicial) {
      let nuevoCliente = {
        id: Date.now(),
        nombre: nombre,
        saldo: montoInicial || 0,
      };

      this.clientes.push(nuevoCliente);
    },
    buscarCliente: function (nombre) {
      //Buscar Cliente
      let cuenta = this.clientes.find(function (cliente) {
        return cliente.nombre.toLowerCase() === nombre.toLowerCase();
      });

      if (cuenta) {
        this.clienteBuscado = cuenta || null;
        return cuenta;
      } else {
        return false;
      }
    },
    depositarMonto: function (idCliente, monto) {
      //buscar cliente
      let cliente = this.clientes.find(function (cliente) {
        return cliente.id === idCliente;
      });

      //validacion cliente
      if (cliente) {
        //validar que no sea negativo
        if (monto > 0) {
          //validacion de pares
          if (monto % 10 === 0) {
            cliente.saldo = cliente.saldo + monto;
            return true;
          } else {
            return false;
          }
        } else {
          //es negativo
          return false;
        }

        //no esta
      } else {
        return false;
      }
    },
  },
  getters: {
    saldoTotal: function (state){
      if(state){
        return state.clientes.reduce(function(total,cliente){
          return total + cliente.saldo
        })
      }else{
        return false
      }
    }
  },
});
