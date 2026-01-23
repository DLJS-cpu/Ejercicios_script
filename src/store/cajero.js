import { defineStore } from 'pinia'

export const useCajeroStore = defineStore('cajero', {
    state: function() {
        return {
            clientes: []
        }
    },
    actions: {
        agregarCliente: function(nombre, montoInicial) {
            let nuevoCliente = {
                id: Date.now(),
                nombre: nombre,
                saldo: montoInicial || 0
            }
            this.clientes.push(nuevoCliente)
        },
        
        editarNombreCliente: function(idCliente, nuevoNombre) {
            let cliente = this.clientes.find(function(c) {
                return c.id === idCliente
            })
            if (cliente) {
                cliente.nombre = nuevoNombre
            }
        },
        
        eliminarCliente: function(idCliente) {
            this.clientes = this.clientes.filter(function(c) {
                return c.id !== idCliente
            })
        },
        
        depositarMonto: function(idCliente, monto) {
            let cliente = this.clientes.find(function(c) {
                return c.id === idCliente
            })
            if (cliente && monto > 0) {
                cliente.saldo += monto
            }
        },
        
        retirarMonto: function(idCliente, monto) {
            let cliente = this.clientes.find(function(c) {
                return c.id === idCliente
            })
            if (cliente && monto > 0 && cliente.saldo >= monto) {
                cliente.saldo -= monto
                return true
            }
            return false
        }
    },
    getters: {
        todosLosClientes: function(state) {
            return state.clientes
        },
        
        totalClientes: function(state) {
            return state.clientes.length
        },
        
        obtenerClientePorId: function(state) {
            return function(idCliente) {
                return state.clientes.find(function(c) {
                    return c.id === idCliente
                })
            }
        },
        
        saldoTotal: function(state) {
            return state.clientes.reduce(function(total, cliente) {
                return total + cliente.saldo
            }, 0)
        }
    }
})