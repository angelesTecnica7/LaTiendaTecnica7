//recuperar carrito del locarlStorage
const recuperarCarrito = () => {
    return carrito = JSON.parse(localStorage.getItem("carrito")) || []
}

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

//eliminar un producto del carrito
const eliminarProducto = (id_eliminar) => {
    recuperarCarrito()
    carrito = carrito.filter(item => item.id != id_eliminar)
    if (carrito.length == 0) {
        localStorage.removeItem("carrito")
    } else {
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
}

//Modificar cantidad (sumar1, restar1 o tomando el campo cantidad)
const modificarCantidad = (cant, stock, id) => {
    // console.log(cant, stock, id)
    recuperarCarrito()
    if (cant > stock) {
        mostrarMensaje(`Cant insuficiente, en stock ${stock}`)
    } else if (cant < 1) {
        mostrarMensaje(`Cantidad minima 1`)
    } else {
        //actualizo la cantidad en el carrito
        const prodIndice = carrito.findIndex(p => p.id == id)
        carrito[prodIndice] = {
            ...carrito[prodIndice],
            amount: cant
        }
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
}

//Vaciar carrito
const vaciarCarrito = () => {
    localStorage.removeItem("carrito")
}

//Finalizar compra
const finalizarCompra = () => {
    recuperarCarrito()

    //envio el carrito al backend para procesar
    //****** Esto en la siguiente etapa*/

    //vacio carrito
    localStorage.removeItem("carrito")
    //muestro mensaje de compra procesada
    mostrarMensaje("Compra finalizada Exitosamente")
    //despues de 1.5 segundo redirecciono al index.html
    setTimeout(() => { window.location.href = 'tienda.html' }, 1500)
}

