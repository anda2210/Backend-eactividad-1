function fecha() {
    //Creamos la fecha de hoy
    let fecha = new Date();
    let fechaInicio = ''
    if ((fecha.getMonth() + 1) > 9 && (fecha.getDate()) > 9) {
        fechaInicio = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
    }
    if ((fecha.getMonth() + 1) < 9 && (fecha.getDate()) > 9) {
        fechaInicio = fecha.getFullYear() + "-" + "0" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
    }
    if ((fecha.getMonth() + 1) > 9 && (fecha.getDate()) < 9) {
        fechaInicio = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-0" + fecha.getDate();
    }
    if ((fecha.getMonth() + 1) < 9 && (fecha.getDate()) < 9) {
        fechaInicio = fecha.getFullYear() + "-" + "0" + (fecha.getMonth() + 1) + "-0" + fecha.getDate();
    }
    let fecha_nueva = new Date(fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate());
    //dias a sumar
    let dias = 30;
    //nueva fecha 
    fecha_nueva.setDate(fecha_nueva.getDate() + dias);
    let fechaFin = ''
    if ((fecha_nueva.getMonth() + 1) > 9 && (fecha_nueva.getDate()) > 9) {
        fechaFin = fecha_nueva.getFullYear() + "-" + (fecha_nueva.getMonth() + 1) + "-" + fecha_nueva.getDate();
    }
    if ((fecha_nueva.getMonth() + 1) < 9 && (fecha_nueva.getDate()) > 9) {
        fechaFin = fecha_nueva.getFullYear() + "-" + "0" + (fecha_nueva.getMonth() + 1) + "-" + fecha_nueva.getDate();
    }
    if ((fecha_nueva.getMonth() + 1) > 9 && (fecha_nueva.getDate()) < 9) {
        fechaFin = fecha_nueva.getFullYear() + "-" + (fecha_nueva.getMonth() + 1) + "-0" + fecha_nueva.getDate();
    }
    if ((fecha_nueva.getMonth() + 1) < 9 && (fecha_nueva.getDate()) < 9) {
        fechaFin = fecha_nueva.getFullYear() + "-" + "0" + (fecha_nueva.getMonth() + 1) + "-0" + fecha_nueva.getDate();
    }

    return fechaFin
}

module.exports = {
    fecha
}