
const fs = require('fs');


class ProductManager {
    constructor(path) {
        this.path = path
        this.id = 1;
        this.products = []
    }

    async getProduct() {
        try {
            const json = await fs.promises.readFile(this.path, 'utf-8')
            if (json === "") return "la lista esta vacia"
            else {
                this.products = JSON.parse(json)
                this.id = this.products[this.products.length - 1].id
            }

            return this.products
        } catch (e) {
            return this
        }

    }

    async salveProduct() {
        try {
            const json = JSON.stringify(this.products, null, 2)
            await fs.promises.writeFile(this.path, json)
            return "se guardo el producto"

        } catch (error) {
            return error
        }

    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            await this.getProduct()
            if (this.products.find((aux) => aux.code === code)) return console.log("el producto ya esta cargado");
            else {
                this.products.push({ id: this.id++, title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock })
            }
            console.log(await this.salveProduct())

        } catch (error) {
            console.log(error)
            return
        }
    }

    async getProductsById(id) {
        try {
            await this.getProduct()
            let respuesta = this.products.find((producto) => producto.id === id);
            (respuesta === undefined) ? respuesta = "no se encuentra el producto" : console.log("producto encontrado: ",respuesta);
        } catch (error) {
            console.log(error)
            return
        }
    }

    async updateProduct(id, campoActualizar, cambio) {
        try {
            await this.getProduct()
            const indice = this.products.findIndex(aux => aux.id === id)
            if (indice === -1) {
                console.log ("no hay producto a actualizar")
                return
            }
            const producto = this.products[indice]
            producto[campoActualizar] = cambio
            this.products[indice] = producto
            await this.salveProduct()
            console.log("Producto actualizado")
            console.log(await this.getProduct()) 
        }
        catch (error) {
            console.log(error)
            return
        }
    }

    async deleteProduct(id) {
        try {
            await this.getProduct()
            this.products = this.products.filter((producto) => producto.id !== id)
            await this.salveProduct()
        } catch (error) {
            console.log(error)
            return

        }

    }
}
const agenda = new ProductManager('./Archivo.txt')


agenda.addProduct("tablet", "tablet samsung", 100000, "Sin imagen", "a5", 20)
agenda.addProduct("PC", "NPC gamer", 200000, "Sin imagen", "a167", 16)
agenda.getProductsById(2)
agenda.addProduct("teclado", "teclado mecanico", 40000, "Sin imagen", "a166", 6)
agenda.updateProduct(2, "thumbnail", "con imagen en algun lado")

