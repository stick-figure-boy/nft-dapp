export type ProductResponse = {
  id: string
  seller_id: string
  name: string
  image_url: string
  description: string
  price: number
  timestamp: string
}

export type CreateProductRequest = {
  seller_id: string
  name: string
  image_url: string
  description: string
  price: number
}
