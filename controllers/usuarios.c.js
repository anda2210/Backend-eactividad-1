const { usuarios } = require("../database/database");

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