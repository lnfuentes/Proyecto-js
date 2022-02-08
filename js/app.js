// CARRITO DE COMPRAS 
const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
const tbody = document.querySelector('.tbody');
let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

items.addEventListener('click', e => {
    añadirCarrito(e);
})

// Traer info del JSON
const fetchData = async () => {
    try {
        const res = await fetch('api.json');
        const data = await res.json();
        recorrerCards(data);
    } catch (error) {
        console.log(error);
    }
}


// Manipular el DOM
const recorrerCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.nombre;
        templateCard.querySelector('p').textContent = '$' + producto.precio;
        templateCard.querySelector('img').setAttribute('src', producto.img);
        templateCard.querySelector('a').dataset.id = producto.id;

        const clonar = templateCard.cloneNode(true);
        fragment.appendChild(clonar);
    });
    items.appendChild(fragment);
}


// Creando carrito con productos elegidos
const añadirCarrito = e => {
    if(e.target.classList.contains('btn')){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Producto añadido!',
            showConfirmButton: false,
            timer: 1500
        })
        definirProducto(e.target.parentElement);
    }
} 


// Definir que se va a mostrar en el carrito
const definirProducto = elemento => {
    const producto = {
        id: elemento.querySelector('a').dataset.id,
        nombre: elemento.querySelector('h5').textContent,
        precio: elemento.querySelector('p').textContent,
        cantidad: 1
    }

    añadirProducto(producto);
}


// Añadir productos al carrito
const añadirProducto = (producto) => {
    const input = tbody.getElementsByClassName('input');

    for (let i = 0; i < carrito.length; i++) {
        if(carrito[i].nombre.trim() === producto.nombre.trim()) {
            carrito[i].cantidad ++;
            input[i].value ++;
            sumatotal();
            return null;
        }
        
    }

    carrito.push(producto);

    mostrarCarrito()
}


// Mostrar productos del carrito
const mostrarCarrito = () => {
    tbody.innerHTML = '';
    
    carrito.map(item => {
        const tr = document.createElement('tr');
        tr.classList.add('item-carrito');
        const contenido = `
            <td>
                <p class="nombre">${item.nombre}</p>
            </td>
            <td>
                <p>${item.precio}</p>
            </td>
            <td>
                <input class="input" type="number" min="1" value="${item.cantidad}">
                <button class="delete btn btn-danger">x</button>
            </td>
        `

        tr.innerHTML = contenido;
        tbody.appendChild(tr);

        tr.querySelector('.delete').addEventListener('click', eliminarProducto);
        tr.querySelector('.input').addEventListener('change', modificarCantidad);
    })
    sumatotal();
}


// Suma del precio
const sumatotal = () => {
    let total = 0;
    const carritoTotal = document.querySelector('.total');
    carrito.forEach(element => {
        const precio = Number(element.precio.replace('$', ''));
        total = total + precio*element.cantidad;
    });

    carritoTotal.innerHTML = `Total a pagar: $${total}`;
    addLocalStorage()
}


// Eliminar producto del carrito
const eliminarProducto = e => {
    const btnEliminar = e.target;
    const tr = btnEliminar.closest('.item-carrito');
    const nombre = tr.querySelector('.nombre').textContent;
    for (let i = 0; i < carrito.length; i++) {
        if(carrito[i].nombre.trim() === nombre.trim()){
            carrito.splice(i, 1);
        }
    }
    tr.remove();
    sumatotal();
}


// Modificar Cantidad del producto
const modificarCantidad = e => {
    const sumaInput = e.target;
    const tr = sumaInput.closest('.item-carrito');
    const nombre = tr.querySelector('.nombre').textContent;
    carrito.forEach(item => {
        if(item.nombre.trim() === nombre) {
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            sumatotal();
        }
    })
}


// Uso del localStorage
function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }
  
window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
      carrito = storage;
      mostrarCarrito()
    }
}


// Vaciar Carrito 
const btnVaciar = document.querySelector('#vaciar-carrito');
const confirmarCarrito = (pregunta, respuesta) => {
    if(carrito.length === 0){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: '¡El carrito está vacío!',
            showConfirmButton: false,
            timer: 1500
        })
    } else {
        Swal.fire({
            title: `¿Está seguro que desea ${pregunta}?`,
            showDenyButton: true,
            confirmButtonText: 'Confirmar',
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(`¡${respuesta}!`, '', 'success')
                carrito = [];
                mostrarCarrito();
            }
        });
    }
}

btnVaciar.addEventListener('click', () => {
    confirmarCarrito('vaciar el carrito', 'Carrito vaciado');
});


// Finalizar compra 
const btnFinalizar = document.querySelector('#finalizar-compra');

btnFinalizar.addEventListener('click', () => {
    confirmarCarrito('finalizar la compra', 'Compra realizada correctamente');
});