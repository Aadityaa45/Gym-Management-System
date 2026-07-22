import express from "express"
import { gymAuth } from "../../middelwares/gymauth.middelware.js"
import { addNewProduct } from "../../controllers/AdminOperations/products.admin.controller.js"
import { searchProducts } from "../../controllers/AdminOperations/products.admin.controller.js"

const productRoutes = express.Router()

productRoutes.post("/add-product",gymAuth,addNewProduct)
productRoutes.get('/fetch-products',gymAuth,searchProducts)



export default productRoutes