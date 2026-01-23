import {defineStore} from 'pinia'

export const useUsuariosStore = define('usuarios',{
    state: function(){
        return{
            usuarios:[]
        }
    },
    actions: {
        agregarUsuario: function(nombre){
            let nuevoUsuario = {
                id: Date.now(),
                nombre: nombre,
                monto:[]
            }
            this.usuarios.push(nuevoUsuario)
        },

        deposito: function(idUsuario,depositoMonto) {
            let usuario = this.usuarios.find(function(a){
                return a.id == idUsuario
            })
            if (usuario){
                let deposito = {
                    id: Date.now(),
                    cantidad: depositoMonto,
                    montoRegistrado:[]
                }
                usuario.monto.push(deposito)
            }
        }
    },
    getters:{
        todosLosUsuarios: function(state){
            return state.usuarios
        },

        totalUsuarios: function(state){
            return state.usuarios.length
        },

    
    }
})