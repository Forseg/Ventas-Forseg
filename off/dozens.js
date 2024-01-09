const side_bar = document.querySelector(".sidebar");
const btn_menu = document.querySelector(".btn-menu");
side_bar.addEventListener("mouseenter", function () {
    side_bar.classList.add("expand");
    changebtn();
});
side_bar.addEventListener("mouseleave", function () {
    side_bar.classList.remove("expand");
    changebtn();
});
function changebtn() {
    if (side_bar.classList.contains("expand")) {
        btn_menu.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
        btn_menu.classList.replace("bx-menu-alt-right", "bx-menu");
    }
}
var carritoVisible = false;
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (var i = 0; i < botonesEliminarItem.length; i++) {
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (var i = 0; i < botonesSumarCantidad.length; i++) {
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var i = 0; i < botonesRestarCantidad.length; i++) {
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked)
}
function agregarAlCarritoClicked(event) {
    var button = event.target;
    var item = button.parentElement;
    var titulo = "Productos x unidad";
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    agregarItemAlCarrito(titulo, precio, imagenSrc);
    hacerVisibleCarrito();
}

function hacerVisibleCarrito() {
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (var i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText == titulo) {
            alert("El producto ya se encuentra en el carrito");
            return;
        }
    }
    var itemCarritoContenido = `
    <div class="carrito-item">
        <img src="${imagenSrc}" width="80px" alt="">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${titulo}</span>
            <div class="selector-cantidad">
                <i class="fa-solid fa-minus restar-cantidad"></i>
                <input type="text" value="1" class="carrito-item-cantidad" disabled>
                <i class="fa-solid fa-plus sumar-cantidad"></i>
            </div>
            <span class="carrito-item-precio">${precio}</span>
        </div>
        <button class="btn-eliminar">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);
    actualizarTotalCarrito();
}
function sumarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
function restarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if (cantidadActual >= 1) {
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}
function eliminarItemCarrito(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    actualizarTotalCarrito();
    ocultarCarrito();
}
function ocultarCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount == 0) {
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}

function actualizarTotalCarrito() {
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        var precio = parseFloat(precioElemento.innerText.replace('S/.', '').replace(',', ''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = total.toFixed(2);
    document.getElementsByClassName('carrito-precio-total')[0].innerText = 'S/.' + total;
}

document.addEventListener("DOMContentLoaded", function () {
    d
    function pagarClicked() {
        console.log("Botón de pagar clickeado");
    }
    const botonPagar = document.querySelector(".btn-pagar");
    botonPagar.addEventListener("click", pagarClicked);
});

var categoryList = document.querySelectorAll('.category_item');
categoryList.forEach(function (category) {
    category.addEventListener('click', function () {
        categoryList.forEach(function (ct) {
            ct.classList.remove('ct_item-active');
        });
        category.classList.add('ct_item-active');
        var selectedCategory = category.getAttribute('data-category');
        filtrarPorCategoria(selectedCategory);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const categorias = document.querySelectorAll(".nav-links li");
    const productos = document.querySelectorAll(".item");
    categorias.forEach(function (categoria) {
        categoria.addEventListener("click", function () {
            const categoriaSeleccionada = categoria.getAttribute("data-category");

            productos.forEach(function (producto) {
                const categoriaProducto = producto.getAttribute("category");

                if (categoriaProducto === categoriaSeleccionada || categoriaSeleccionada === "todos") {
                    producto.style.display = "block";
                } else {
                    producto.style.display = "none";
                }
            });
        });
    });
});

function filterCategory(category) {
    var items = document.querySelectorAll('.item');
    items.forEach(function (item) {
        var categoriaItem = item.dataset.categoria;
        if (categoriaItem === category || category === 'all') {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

const darkThemeButton = document.getElementById('dark-theme-button');
darkThemeButton.addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');
});

const searchForm = document.querySelector('.search-form');
const productItems = document.querySelectorAll('.item');

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const searchTerm = searchForm.querySelector('input[name="q"]').value.toLowerCase();
    productItems.forEach(function (item) {
        const productName = item.getAttribute('data-product-name').toLowerCase();
        if (productName.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});


const productData = $(this).data();
const tallas = productData.tallas;

$.ajax({
    url: "/carrito/agregar",
    type: "POST",
    data: {
        producto: productData.id,
        tallas: tallas,
    },
    success: function (data) {
        $("#tallas").html(tallas);
        $("#tallas").append(" TALLAS: 2242-GY-8 T8");
        $("#tallas").append(" TALLAS: 2242-GY-9 T9");
    },
});





