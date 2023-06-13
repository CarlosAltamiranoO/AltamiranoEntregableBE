class Product {
    /* por conveniencia cre una clase producto , ahunque no fue tan conveniente despues de todo... */
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}
class ProductManager {
    constructor() {
        this.id = 1;
        this.products = []
    }
    addProduct(product) {
        // se comprueva si algunos de los campos no esta definido
        if (product.title === undefined || product.description === undefined || product.price === undefined || product.thumbnail === undefined || 
        product.code === undefined || product.stock === undefined)  return "rellenar los campos del producto"

        //metodo find para buscar si el producto esta repetido con el atributo code
        if (this.products.find(x => x.producto.code === product.code)) return "producto repetido"

        /* para no modificar el objeto ,ya que uso una clase producto, se guarda dos elemtos uno producto y el otro id, no se si se tenia que 
        hacer asi o se tenia que agregar el id al producto directamente */
        this.products.push({producto: product, id: this.id})
        /* en cada casilla del array hay un objeto que consta de dos elementos el producto y el id,
         le puse poducto y no product porque ya se hace muy confuso  */
        this.id++
        return ("se cargo el producto")
    }
    getProduct(){
        /* console.log para que se distinga mejor el la terminal */
        console.log("Mostrando lista de Productos...")
        /* devuelbe solo el producto y no el id si se quiere devolber las dos cosas se saca el .producto y listo */
        return this.products.map(x => x.producto)
    }
    getProductById(id){
        /* console.log para que se distinga mejor el la terminal */
        console.log("Buscando Producto...")
        let aux = this.products.find(x => x.id === id)
        if(aux) return aux.producto; else return "Not Found"
    }
}

let PM = new ProductManager()
let P1 = new Product("pc", "computadora escritorio", 125000, "-", "T125", 6 )
let P2 = new Product("Notebook", "Notebook hp ommen 15 ", 1250000, "-", "N109", 4 )
let P3 = new Product("pc", "computadora escritorio", 125000, "-", "T125", 6 )
let P4 = new Product( )
let P5 = new Product("tablet", "tablet lenovo N10", 85000, "-", "N10-1", 9 )

console.log(PM.addProduct(P1))
console.log(PM.addProduct(P2))
console.log(PM.addProduct(P3))
console.log(PM.addProduct(P4))
console.log(PM.addProduct(P5))
console.log(PM.getProduct())
console.log(PM.getProductById(1))