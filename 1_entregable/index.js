class Product {
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
        
        if (product.title === "" || product.description === "" || product.price === "" || product.thumbnail === "" || 
        product.code === "" || product.stock === ""){
            console.log("rellenar los campos del producto")
            return
        }
        if (this.products.find(x => x.product.code === product.code)){
            console.log("producto repetido")
            return
        }
        this.products.push({product: product, id: this.id})
        this.id++
    }
    getProduct(){
        return this.products.map(x => x.product)
    }
}

let PM = new ProductManager()
let P1 = new Product("pc", "computadora escritorio", 125000, "-", "T125", 6 )
let P2 = new Product("Notebook", "Notebook hp ommen 15 ", 1250000, "-", "N109", 4 )
let P3 = new Product("pc", "computadora escritorio", 125000, "-", "T125", 6 )

PM.addProduct(P1)
PM.addProduct(P2)
PM.addProduct(P3)
console.log(PM.getProduct())