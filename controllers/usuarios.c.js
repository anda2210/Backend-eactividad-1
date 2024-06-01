const { usuarios, ahorros, prestamos, cooperativas_usuarios, cooperativas } = require("../database/database");
const { tasa_interes_diaria } = require("../functions/tasas");

class usuariosControllers {
    listar() {
        return new Promise((resolve, reject) => {
            try {
                if (usuarios.length === 0) {
                    return reject('No hay usuarios registrados en el Banco')
                }
                const data = []
                usuarios.forEach(usuario => {
                    data.push({
                        nombre: usuario.nombre,
                        apellido: usuario.apellido,
                        cedula: usuario.cedula,
                        correo: usuario.correo,
                        usuario: usuario.usuario
                    })
                });
                return resolve({
                    data: data,
                    mensaje: "Listado con éxito los Usuarios"
                })
            } catch (error) {
                return reject(error);
            }
        });
    };

    cuentas(usuario) {
        return new Promise((resolve, reject) => {
            try {
                let falta = true
                let consultado = {}
                let cuen_aho = {}
                let cuen_pre = {}
                let cuen_cop = []
                for (let i = 0; i < usuarios.length; i++) {
                    if (usuarios[i].usuario === usuario) {
                        falta = false
                        consultado = usuarios[i]
                    }
                }
                if (falta) {return reject("No existe el usuario que deseas ver sus cuentas")};
                ahorros.forEach(ahorro => {
                    if (ahorro.dueño === usuario) {
                        cuen_aho = ahorro
                    }
                });
                prestamos.forEach(prestamo => {
                    if (prestamo.dueño === usuario) {
                        cuen_pre = prestamo
                    }
                });
                cooperativas_usuarios.forEach(relacion => {
                    if (relacion.usuario === usuario) {
                        cuen_cop.push(relacion)
                    }
                });
                //Calculamos las tasas de interes diarias (en el caso de las cooperativas no se calculan)
                cuen_aho.tasa_diaria = tasa_interes_diaria(cuen_aho.intereses, cuen_aho.balance).toFixed(2)
                cuen_pre.tasa_diaria = tasa_interes_diaria(cuen_pre.intereses, cuen_pre.balance).toFixed(2)
                return resolve({
                    mensaje: "Se ha listado con éxito las cuentas del usuario " + usuario,
                    data: {
                        usuario: {
                            nombre: consultado.nombre,
                            apellido: consultado.apellido,
                            cedula: consultado.cedula,
                            correo: consultado.correo
                        },
                        cuentas: {
                            ahorros: {
                                balance: cuen_aho.balance + "Bs",
                                intereses: cuen_aho.intereses + "%",
                                numero_cuenta: cuen_aho.numero_cuenta,
                                tasa_diaria: cuen_aho.tasa_diaria + "Bs"
                            },
                            prestamos: {
                                balance: cuen_pre.balance + "Bs",
                                intereses: cuen_pre.intereses + "%",
                                estado: cuen_pre.estado,
                                numero_cuenta: cuen_pre.numero_cuenta,
                                tasa_diaria: cuen_pre.tasa_diaria + "Bs"
                            },
                            cooperativas: cuen_cop
                        }
                    }
                })
            } catch (error) {
                return reject(error);
            }
        });
    }

    agregar(usuario) {
        return new Promise((resolve, reject) => {
            try {
                if (!usuario.nombre || !usuario.apellido || !usuario.cedula || !usuario.correo || !usuario.usuario || !usuario.contraseña) {
                    return reject("Faltan datos escenciales para ingresar al usuario")
                }
                for (let i = 0; i < usuarios.length; i++) {
                    if (usuarios[i].usuario === usuario.usuario) {
                        return reject("Ya esta en uso ese usuario")
                    }                
                }
                let validacion =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;
                if(validacion.test(usuario.contraseña)){
                    let nuevo_usuario = {
                        nombre: usuario.nombre,
                        apellido: usuario.apellido,
                        cedula: usuario.cedula,
                        correo: usuario.correo,
                        usuario: usuario.usuario,
                        contraseña: usuario.contraseña
                    }
                    usuarios.push(nuevo_usuario);
                    resolve({
                        mensaje: "Se ha registrado con éxito en el Banco",
                        data: usuario.usuario
                    })
                }else{
                   return reject("La contraseña debe tener 1 letra, 1 mayúscula, 1 número y un mínimo de 8 digitos")       
                } 
            } catch (error) {
                return reject(error);
            }
        })
    };

    editar(usuario, nuevo_usuario) {
        return new Promise((resolve, reject) => {
            try {
                if (!nuevo_usuario.contraseña || !nuevo_usuario.correo) {
                    return reject("Faltan datos escenciales para ingresar al usuario");
                }
                let validacion =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;
                if(validacion.test(nuevo_usuario.contraseña)){
                    for (let i = 0; i < usuarios.length; i++) {
                        if (usuarios[i].usuario === usuario) {
                            usuarios[i].correo = nuevo_usuario.correo,
                            usuarios[i].contraseña = nuevo_usuario.contraseña
                            return resolve({
                                mensaje: "Editado con éxito el correo y la clave del usuario " + usuario,
                                data: {
                                    nombre: usuarios[i].nombre,
                                    apellido: usuarios[i].apellido,
                                    cedula: usuarios[i].cedula,
                                    correo: usuarios[i].correo,
                                    usuario: usuarios[i].usuario
                                }
                            })
                        }                
                    }  
                    return reject("No existe el usuario")
                }else{
                   return reject("La contraseña debe tener 1 letra, 1 mayúscula, 1 número y un mínimo de 8 digitos")       
                } 
            } catch (error) {
                return reject(error);
            }
        })
    };
}

module.exports = new usuariosControllers();