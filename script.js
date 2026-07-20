// ===============================
// CyberShop93 - script.js
// ===============================

// Mostrar animación al hacer scroll
const elementos = document.querySelectorAll(".card");

const mostrarElementos = () => {
    const alturaPantalla = window.innerHeight;

    elementos.forEach((elemento) => {
        const posicion = elemento.getBoundingClientRect().top;

        if (posicion < alturaPantalla - 100) {
            elemento.style.opacity = "1";
            elemento.style.transform = "translateY(0)";
        }
    });
};

elementos.forEach((elemento) => {
    elemento.style.opacity = "0";
    elemento.style.transform = "translateY(40px)";
    elemento.style.transition = "all 0.6s ease";
});

window.addEventListener("scroll", mostrarElementos);
window.addEventListener("load", mostrarElementos);

// Efecto suave al navegar por el menú
document.querySelectorAll('a[href^="#"]').forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
        e.preventDefault();

        const destino = document.querySelector(this.getAttribute("href"));

        if (destino) {
            destino.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Mensaje de bienvenida
window.addEventListener("load", () => {
    console.log("Bienvenido a CyberShop93 🚀");
});

// Año automático en el footer (opcional)
const footer = document.querySelector("footer");

if (footer) {
    footer.innerHTML += `<p style="margin-top:20px;">© ${new Date().getFullYear()} CyberShop93 - Todos los derechos reservados.</p>`;
}
// Animación de bienvenida
window.addEventListener("load", function(){

document.body.style.opacity="0";

setTimeout(()=>{

document.body.style.transition="1s";

document.body.style.opacity="1";

},200);

});
const btnArriba = document.getElementById("volverArriba");

if(btnArriba){

    window.addEventListener("scroll", () => {

        if(window.scrollY > 300){
            btnArriba.style.display = "block";
        }else{
            btnArriba.style.display = "none";
        }

    });

    btnArriba.addEventListener("click", () => {

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    });

}
function toggleMenu(){

    document
    .getElementById("menu")
    .classList
    .toggle("mostrar");

}
const slides = document.querySelectorAll(".slide");
let actual = 0;

setInterval(() => {
    slides[actual].classList.remove("activo");
    actual = (actual + 1) % slides.length;
    slides[actual].classList.add("activo");
}, 3000);
function abrirCarrito(){
    document.getElementById("carrito").classList.add("activo");
}

function cerrarCarrito(){
    document.getElementById("carrito").classList.remove("activo");
}
let carrito = [];
const carritoGuardado = localStorage.getItem("carrito");

if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
}
let total = 0;

function agregarCarrito(nombre, precio){

    const productoExistente = carrito.find(
        producto => producto.nombre === nombre
    );

    if(productoExistente){

        productoExistente.cantidad++;

    }else{

        carrito.push({
            nombre,
            precio,
            cantidad:1
        });

    }

    actualizarCarrito();
localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito(){

    const lista = document.getElementById("lista-carrito");

    lista.innerHTML = "";

    carrito.forEach((producto, indice)=>{

        lista.innerHTML += `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <div>
                <strong>${producto.nombre}</strong><br>
                $${producto.precio.toLocaleString()}
            </div>

            <button onclick="eliminarProducto(${indice})"
            style="background:red;color:white;border:none;padding:6px 10px;border-radius:8px;cursor:pointer;">
                ❌
            </button>
        </div>
        `;

    });

    document.getElementById("total").innerText = total.toLocaleString();

}
function eliminarProducto(indice){

    total -= carrito[indice].precio;

    carrito.splice(indice,1);

    document.getElementById("contador").innerText = carrito.length;

    mostrarCarrito();

}
function actualizarCarrito(){

    const lista = document.getElementById("lista-carrito");

    lista.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach((producto, indice)=>{

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;

        cantidadTotal += producto.cantidad;

        lista.innerHTML += `
        <div style="margin-bottom:15px;border-bottom:1px solid #444;padding-bottom:10px;">

            <strong>${producto.nombre}</strong><br>

            $${producto.precio.toLocaleString()} x ${producto.cantidad}

            <br><br>

            <button onclick="disminuirCantidad(${indice})">➖</button>

            <strong>${producto.cantidad}</strong>

            <button onclick="aumentarCantidad(${indice})">➕</button>

            <button onclick="eliminarProducto(${indice})">❌</button>

        </div>
        `;

    });

    document.getElementById("contador").innerText = cantidadTotal;

    document.getElementById("total").innerText =
    total.toLocaleString();

}
function aumentarCantidad(indice){

    carrito[indice].cantidad++;

    actualizarCarrito();

}

function disminuirCantidad(indice){

    if(carrito[indice].cantidad > 1){

        carrito[indice].cantidad--;

    }else{

        carrito.splice(indice,1);

    }

    actualizarCarrito();

}
function vaciarCarrito(){

    carrito = [];

    actualizarCarrito();

    localStorage.removeItem("carrito");

}
function buscarProductos(){

    const texto = document.getElementById("buscar").value.toLowerCase();

    const tarjetas = document.querySelectorAll(".card");

    tarjetas.forEach(card => {

        const nombre = card.querySelector("h3").textContent.toLowerCase();

        if(nombre.includes(texto)){
            card.style.display = "block";
        }else{
            card.style.display = "none";
        }

    });

}
function filtrarProductos(categoria){

    const tarjetas = document.querySelectorAll(".card");

    tarjetas.forEach(card => {

        if(categoria === "todos"){

            card.style.display = "block";

        }else{

            if(card.dataset.categoria === categoria){

                card.style.display = "block";

            }else{

                card.style.display = "none";

            }

        }

    });

}
function finalizarPedido(){

    if(carrito.length === 0){
        alert("Tu carrito está vacío.");
        return;
    }

    let mensaje = "Hola CyberShop93 👋%0A%0A";
    mensaje += "Quiero realizar el siguiente pedido:%0A%0A";

    let totalPedido = 0;

    carrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;
        totalPedido += subtotal;

        mensaje += `🛒 ${producto.nombre}%0A`;
        mensaje += `Cantidad: ${producto.cantidad}%0A`;
        mensaje += `Subtotal: $${subtotal.toLocaleString()}%0A%0A`;

    });

    mensaje += `💰 Total: $${totalPedido.toLocaleString()}`;

    window.location.href =
    "https://wa.me/573017627261?text=" + mensaje;

}