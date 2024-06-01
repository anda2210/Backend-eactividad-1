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
                usuarios.forEach(user => {
                    if (user.usuario === usuario.usuario) {
                        return reject("Ya esta en uso ese usuario")
                    }
                });
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
}

module.exports = new usuariosControllers();