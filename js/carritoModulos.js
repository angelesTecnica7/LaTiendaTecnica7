const agregarAlCarrito = (item) => {
let carrito = JSON.parse(localStorage.getItem("carrito")) || []
console.log(carrito)
carrito.push(item)
localStorage.setItem("carrito", JSON.stringify(carrito))
alert('producto agregado')
}