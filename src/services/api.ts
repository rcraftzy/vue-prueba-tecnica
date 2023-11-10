import axios from 'axios'

export const getAllProducts = async () => {
  const res = await axios.get('https://fakestoreapi.com/products')
  return res.data
}

export const getAllCategories = async () => {
  const res = await axios.get('https://fakestoreapi.com/products/categories')
  return res.data
}
