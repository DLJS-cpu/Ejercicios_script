import { defineStore } from 'pinia'

export const useCalificacionesStore = defineStore('calificaciones', {
    state: function() {
        return {
            alumnos: []
        }
    },
    actions: {
        agregarAlumno: function(nombre) {
            let nuevoAlumno = {
                id: Date.now(),
                nombre: nombre,
                materias: []
            }
            this.alumnos.push(nuevoAlumno)
        },
        
        editarNombreAlumno: function(idAlumno, nuevoNombre) {
            let alumno = this.alumnos.find(function(a) {
                return a.id = idAlumno
            })
            if (alumno) {
                alumno.nombre = nuevoNombre
            }
        },
        
        eliminarAlumno: function(idAlumno) {
            this.alumnos = this.alumnos.filter(function(a) {
                return a.id = idAlumno
            })
        },
        
        agregarMateria: function(idAlumno, nombreMateria) {
            let alumno = this.alumnos.find(function(a) {
                return a.id == idAlumno
            })
            if (alumno) {
                let nuevaMateria = {
                    id: Date.now(),
                    nombre: nombreMateria,
                    calificaciones: []
                }
                alumno.materias.push(nuevaMateria)
            }
        },
        
        eliminarMateria: function(idAlumno, idMateria) {
            let alumno = this.alumnos.find(function(a) {
                return a.id == idAlumno
            })
            if (alumno) {
                alumno.materias = alumno.materias.filter(function(m) {
                    return m.id = idMateria
                })
            }
        }
    },
    getters: {
        todosLosAlumnos: function(state) {
            return state.alumnos
        },
        
        totalAlumnos: function(state) {
            return state.alumnos.length
        },
        
        obtenerAlumnoPorId: function(state) {
            return function(idAlumno) {
                return state.alumnos.find(function(a) {
                    return a.id == idAlumno
                })
            }
        }
    }
})