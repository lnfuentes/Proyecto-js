// e-commerce


// Carrito
class Carrito {
    constructor(lista) {
        this.lista = lista;
    }

    findAllItems() {
        return this.lista;
    }

    createitem(item) {
        this.lista.push(item);
    }

    findOneByIdItem(itemId) {
        const item = this.lista.find(element => element.id === itemId);

        if ( !item ) {
            throw new Error(`No existe el item con el id ${id}`);
        }

        return item;
    }

    updateItem(itemId, cantidad) {
        const item = this.findOneByIdItem(itemId);
        const index = this.lista.indexOf(item);
        this.lista[index].cantidad = cantidad;
        if(cantidad <= 0) {
            this.lista[index].stock = false;
        }
    }

    deleteItem(itemId) {
        const item = this.findOneByIdItem(itemId);
        const index = this.lista.indexOf(item);
        this.lista.splice(index, 1);
    }
}


// Producto
class Producto {
    constructor(id, nombre, precio, cantidad, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.stock = stock;
        this.informacion = `Producto: ${nombre} || Precio: $${precio} || ${this.comprobarstock()}`; 
    }
    verInfo() {
        console.log(this.informacion);
    }
    comprobarstock() {
        if(this.stock) {
            return 'Hay stock';
        } else {
            return 'No hay stock';
        }
    }
}

// Crear Productos
const producto1 = new Producto(1, 'Notebook', 2000, 50, true);
const producto2 = new Producto(2, 'Monitor', 4000, 20, true);
const producto3 = new Producto(3, 'Celular', 1000, 30, true);
const producto4 = new Producto(4, 'Auriculares', 500, 0, false);
const producto5 = new Producto(5, 'Parlante', 900, 0, false);


// Interaccion del usuario 
producto1.verInfo();
producto2.verInfo();
producto3.verInfo();
producto4.verInfo();
producto5.verInfo();


alert('Elegir productos, consultando precio y stock en la consola');
let productos; 

// Crear Carrito
const carrito = new Carrito([]);

function compra() {
    while(productos !== 6) {
        productos = Number(prompt('1: Notebook || 2: Monitor || 3: Celular || 4: Auriculares || 5: Parlante || 6: Nada más'));
    
        switch (productos) {
            case 1:
                if(producto1['stock']){
                    carrito.createitem(producto1['precio']);
                } else{
                    alert('no se puede añadir el producto porque no cuenta con stock');
                }
                break;
        
            case 2:
                if(producto2['stock']){
                    carrito.createitem(producto2['precio']);
                } else{
                    alert('no se puede añadir el producto porque no cuenta con stock');
                }
                break;
                
            case 3:
                if(producto3['stock']){
                    carrito.createitem(producto3['precio']);
                } else{
                    alert('no se puede añadir el producto porque no cuenta con stock');
                }
                break;

            case 4:
                if(producto4['stock']){
                    carrito.createitem(producto4['precio']);
                } else{
                    alert('no se puede añadir el producto porque no cuenta con stock');
                }
                break;

            case 5:
                if(producto5['stock']){
                    carrito.createitem(producto5['precio']);
                } else{
                    alert('no se puede añadir el producto porque no cuenta con stock');
                }
                break;
        }
    }
}

compra();

let total = 0;

const sumaTotal = () => {
    for (let i = 0; i < carrito.lista.length; i++) {
        total += carrito.lista[i];
    }
}

sumaTotal();

alert('total a pagar: $' + total);

