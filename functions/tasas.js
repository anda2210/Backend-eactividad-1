function tasa_interes_diaria(interes, capital) {
    console.log(interes),
    console.log(capital)
    let interes_decimal = interes / 100
    let tasa_diaria = (interes_decimal / 360) * capital
    return tasa_diaria
}

module.exports = {
    tasa_interes_diaria
}