
const fs = require('fs');


class ProductManager {
    constructor(path) {
        this.path = path
        this.id = 0;
        this.products = []
    }

    async getProduct() {
        try {
            const json = await fs.promises.readFile(this.path, 'utf-8')
            if (json === "") return "la lista esta vacia"
            else {
                this.products = JSON.parse(json)
            }
            return this.products

        } catch (error) {
            console.error(error)
        }

    }

    async salveProduct() {
        try {
            const json = JSON.stringify(this.products, null, 2)
            await fs.promises.writeFile(this.path, json)
            return "se guardo el producto"

        } catch (error) {
            console.error(error)

        }

    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            await this.getProduct()
            if (this.products.find((aux) => aux.code === code)) return console.log("el producto ya esta cargado");
            else {
                this.id++
                this.products.push({ id: this.id, title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock })
            }
            console.log(await this.salveProduct())

        } catch (error) {
            console.error(error)
        }

    }

    async getProductsById(id) {
        try {
            await this.getProduct()
            let respuesta = this.products.find((producto) => producto.id === id);
            (respuesta === undefined) ? console.log("no se encuentra el producto") : console.log("producto encontrado: ", respuesta);

        } catch (error) {
            console.error(error)
        }

    }

    async updateProduct(id, campoActualizar, cambio) {
        try {
            await this.getProduct()
            const indice = this.products.findIndex(aux => aux.id === id)
            if (indice === -1) {
                console.log("no hay producto a actualizar")
                return
            }
            const producto = this.products[indice]
            producto[campoActualizar] = cambio
            this.products[indice] = producto
            await this.salveProduct()
            console.log("Producto actualizado:", producto)

        } catch (error) {
            console.log(error)
        }

    }

    async deleteProduct(id) {
        try {
            await this.getProduct()
            const aux = this.products.filter((producto) => producto.id !== id)
            if (JSON.stringify(aux) === JSON.stringify(this.products)) {
                console.log("No hay producto a eliminar")
            }
            else {
                this.products = aux
                await this.salveProduct()
                console.log("producto eliminado")
            }

        } catch (error) {
            console.log(error)
        }

    }
}



async function prueva(aux) {
    try {
        await aux.addProduct("tablet", "tablet samsung", 100000, "Sin imagen", "a5", 20)
        await aux.addProduct("PC", "NPC gamer", 200000, "Sin imagen", "a167", 16)
        await aux.getProductsById(2)
        await aux.addProduct("teclado", "teclado mecanico", 40000, "Sin imagen", "a166", 6)
        await aux.updateProduct(2, "thumbnail", "con imagen en algun lado")
        await aux.deleteProduct(1)
        console.log("lista final: ", await aux.getProduct())

    } catch (error) {
        console.log(error)
    }

}

const agenda = new ProductManager('./Archivo.txt')
prueva(agenda)


