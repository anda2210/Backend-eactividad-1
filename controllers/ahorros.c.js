const { ahorros, usuarios } = require("../database/database");
const { v4: uuidv4 } = require('uuid');

class ahorrosControllers {
    listar() {
        return new Promise((resolve, reject) => {
            try {
                if (ahorros.length === 0) {
                    return reject('No hay cuentas de ahorros registradas en el Banco')
                }
                const data = []
                ahorros.forEach(ahorro => {
                    data.push({
                        balance: ahorro.balance + "Bs",
                        intereses: ahorro.intereses + "%",
                        dueño: ahorro.dueño,
                        numero_cuenta: ahorro.numero_cuenta
                    })
                });
                return resolve({
                    data: data,
                    mensaje: "Listado con éxito las cuentas de ahorros"
                })
            } catch (error) {
                return reject(error);
            }
        });
    };

    agregar(ahorro) {
        return new Promise((resolve, reject) => {
            try {
                if (!ahorro.dueño) {
                    return reject("Faltan propiedades escenciales para agregar la cuenta")
                }
                for (let a = 0; a < ahorros.length; a++) {
                    if (ahorros[a].dueño === ahorro.dueño) {
                        return reject("Ya este usuario posee una cuenta de Ahorros")
                    }
                }
                for (let i = 0; i < usuarios.length; i++) {
                    if (usuarios[i].usuario === ahorro.dueño) {
                        let cuenta_nueva = {
                            balance: 0,
                            intereses: 5,
                            dueño: ahorro.dueño,
                            numero_cuenta: uuidv4()
                        }
                        ahorros.push(cuenta_nueva);
                        return resolve({
                            mensaje: "Se ha agregado con éxito la cuenta de ahorro al usuario " + ahorro.dueño,
                            data: {
                                balance: cuenta_nueva.balance + "Bs",
                                intereses: cuenta_nueva.intereses + "%",
                                dueño: cuenta_nueva.dueño,
                                numero_cuenta: cuenta_nueva.numero_cuenta
                            }
                        })
                    }
                }
                return reject("No existe el usuario que será dueño de la cuenta")
            } catch (error) {
                return reject(error);
            }
        });
    }
}

module.exports = new ahorrosControllers();