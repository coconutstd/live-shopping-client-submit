import { Product } from "../entities/product.entity"

export interface ProductsResponse {
  products: Product[]
}

export interface ProductResponse {
  product: Product
}
