const { v4: uuidv4 } = require('uuid');
const { cooperativas, usuarios, cooperativas_usuarios } = require('../database/database');
const { programacion_cuotas_semanal, fecha_hoy } = require('../functions/fechas');

class cooperativasControllers {
    listar() {
        return new Promise((resolve, reject) => {
            try {
                if (cooperativas.length === 0) {
                    return reject('No hay grupos de cooperativas registradas en el Banco')
                }
                const data = []
                cooperativas.forEach(cooperativa => {
                    data.push({
                        balance: cooperativa.balance + "Bs",
                        cuota: cooperativa.cuota + "Bs",
                        modalidad: cooperativa.modalidad,
                        duracion: cooperativa.duracion + " cuotas",
                        fecha_inicio: cooperativa.fecha_inicio,
                        numero_cuenta: cooperativa.numero_cuenta,
                        usuarios_asociados: cooperativa.usuarios_asociados
                    })
                });
                return resolve({
                    data: data,
                    mensaje: "Listado con éxito los grupos de cooperativas"
                })
            } catch (error) {
                return reject(error);
            }
        });
    }

    fecha_proxima(cuenta) {
        return new Promise((resolve, reject) => {
            try {
                for (let i = 0; i < cooperativas.length; i++) {
                    if (cooperativas[i].numero_cuenta === cuenta) {
                        for (let a = 0; a < cooperativas[i].fechas_cuotas.length; a++) {
                            if (fecha_hoy() <= cooperativas[i].fechas_cuotas[a]) {
                                return resolve({
                                    mensaje: "Se ha encontrado con exito la proxima fecha de pago de esta cuenta",
                                    data: {
                                        numero_cuenta: cuenta,
                                        proxima_fecha: cooperativas[i].fechas_cuotas[a]
                                    }
                                })
                            }
                        }
                        return reject("Ya han pasado todas fechas de pago de esta cuenta de cooperativa")
                    }
                }
                return reject("No existe la cuenta que desea ver su fecha de pago")
            } catch (error) {
                return reject(error);
            }
        });
    }

    agregar(cooperativa) {
        return new Promise((resolve, reject) => {
            try {
                if (!cooperativa.cuota || !cooperativa.modalidad || !cooperativa.duracion || !cooperativa.fecha_inicio) {
                    return reject("Faltan propiedades escenciales para agregar el grupo")
                }
                if (cooperativa.modalidad != "Semanas" && cooperativa.modalidad != "Meses") {
                    return reject("La modalidad debe ser: Semanas o Meses")
                }
                let nuevo_grupo = {
                    balance: 0,
                    cuota: cooperativa.cuota,
                    modalidad: cooperativa.modalidad,
                    duracion: cooperativa.duracion,
                    fecha_inicio: cooperativa.fecha_inicio,
                    fechas_cuotas: programacion_cuotas_semanal(cooperativa.fecha_inicio),
                    numero_cuenta: uuidv4(),
                    usuarios_asociados: []
                }
                cooperativas.push(nuevo_grupo);
                return resolve({
                    mensaje: "Se ha registrado con exito el grupo de cooperativa",
                    data: nuevo_grupo
                })
            } catch (error) {
                return reject(error);
            }
        });
    }

    relacion_usuario(usuario, cooperativa) {
        return new Promise((resolve, reject) => {
            try {
                for (let i = 0; i < usuarios.length; i++) {
                    if (usuarios[i].usuario === usuario) {
                        for (let a = 0; a < cooperativas.length; a++) {
                            if (cooperativas[a].numero_cuenta === cooperativa) {
                                for (let e = 0; e < cooperativas[a].usuarios_asociados.length; e++) {
                                    if (cooperativas[a].usuarios_asociados[e] === usuario) {
                                        return reject("No se puede agregar la relacion porque ya esta registrado el usuario al grupo de cooperativa")
                                    }
                                }
                                let relacion = {
                                    usuario: usuario,
                                    cooperativa: cooperativa,
                                    balance: 0,
                                    fechas_cuotas: programacion_cuotas_semanal(cooperativas[a].fecha_inicio)
                                }
                                cooperativas_usuarios.push(relacion);
                                cooperativas[a].usuarios_asociados.push(usuario)
                                return resolve({
                                    mensaje: "Se ha agregado con exito al grupo de cooperativa al usuario " + usuario,
                                    data: relacion
                                })
                            }
                        }
                        return reject("No existe la cooperativa que deseas relacion con el usuario " + usuario)
                    }
                }
                return reject("No existe el usuario que deseas relacionar con esta cooperativa")
            } catch (error) {
                return reject(error);
            }
        });
    }
}

module.exports = new cooperativasControllers();