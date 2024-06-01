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
    }
}

module.exports = new usuariosControllers();