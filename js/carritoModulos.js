//Agregar al carrito
const agregarAlCarrito = (item, cant) => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || []
    const prodEncontrado = carrito.find(p => p.id == item.id)//BUSCO SI HAY DUPLICADO
    if (!prodEncontrado) {
        //verifico si alcanza stock
        if (cant > item.stock) {
            // alert(`Cant insufience, en stock solo ${parseInt(item.stock)}`)
            mostrarMensaje(`Cant insufience, en stock solo ${parseInt(item.stock)}`)
        } else {
            //agrego el valor de la cantidad al objeto producto
            item.amount = cant
            carrito.push(item)
            localStorage.setItem("carrito", JSON.stringify(carrito))
            // alert(`${item.title} ha sido agregado al carrito`)
            mostrarMensaje(`${item.title} ha sido agregado al carrito`)
        }
    } else {
        // alert('El producto ya se encuentra en el carrito')
        mostrarMensaje('El producto ya se encuentra en el carrito')
    }
}