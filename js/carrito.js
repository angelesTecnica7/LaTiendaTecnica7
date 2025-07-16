document.addEventListener("DOMContentLoaded", () => {

    //Mostrar carrito   
    const mostrarCarrito = () => {
        let carrito = JSON.parse(localStorage.getItem("carrito"))

        // limpiarCarrito, eliminamos contenidos de los contenedores de item de productos y totales
        contenedorProd = document.querySelector("#itemsCarrito")
        contenedorProd.innerHTML = ""
        contenedorTotal = document.querySelector("#total")
        contenedorTotal.innerHTML = ""

        if (carrito) {
            // console.log(carrito)
            let total = 0;

            carrito.forEach(item => {
                // console.log(item)
                const card = document.createElement("div")
                card.className = "prodCarrito"
                card.innerHTML = `
                        <img src="images/productos/${item.image}" alt="">
                        <div class="detalle">
                            <button id="eliminarProd"><i class="fa-solid fa-trash-can"></i></button>
                            <p>${item.title}</p>
                            <div class="agregar">
                                <div class="amount">
                                    <button class="restar" id="restar"><i class="fa-solid fa-square-minus"></i></button>
                                    <input type="number" name="cant" min="1" max=${parseInt(item.stock)} value="${item.amount}">
                                    <button class="sumar" id="sumar"><i class="fa-solid fa-square-plus"></i></button>
                                </div>
                                <div>
                                    <p class="subtotal">$${item.price} c/u</p>
                                    <p class="precio">$${item.amount * item.price}</p>
                                </div>
                            </div>
                        </div>`
                total = total + (item.amount * item.price);

                //Agrego el producto al contenedor
                contenedorProd.appendChild(card);

                //eliminar producto
                card.querySelector("#eliminarProd").onclick = () => {
                    eliminarProducto(item.id)
                    mostrarCarrito()
                }

                //sumar 1 a la cantidad
                card.querySelector("#sumar").onclick = () => {
                    item.amount++
                    modificarCantidad(item.amount, item.stock, item.id)
                    mostrarCarrito()
                }

                //restar 1 a la cantidad
                card.querySelector("#restar").onclick = () => {
                    item.amount--                  
                    modificarCantidad(item.amount, item.stock, item.id)
                    mostrarCarrito()
                }

                //leer cambios campo cantidad
                card.querySelector('[name="cant"]').onchange = () => {
                    const cant = parseInt(card.querySelector('[name="cant"]').value)
                    modificarCantidad(cant, item.stock, item.id)
                    mostrarCarrito()
                    }

                });

            contenedorTotal.innerHTML = `
                <div class="total">
                    <p>TOTAL</p>
                    <p class="precio">$${total}</p>
                </div>

                <button class="comprar" id="finalizarCompra">Comprar Ahora</button>
                <button class="vaciar" id="vaciar">Vaciar Carrito</button>`


            //vaciar carrito
            document.querySelector("#vaciar").onclick = () => {
                vaciarCarrito()
                mostrarCarrito()
            }

            //Finalizar compra
            document.querySelector("#finalizarCompra").onclick = () => {
                finalizarCompra()
            }

        } else {
            mostrarMensaje("Carrito Vacio")
        }
    }

    mostrarCarrito()

})


