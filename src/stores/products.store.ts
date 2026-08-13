import { defineStore } from 'pinia'
import axios from 'axios'

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    isLoading: false,
    error: null as string | null,

    searchQuery: '',
    selectedCategory: 'all',
    sortBy: 'default',
  }),

  getters: {
    categories: (state) => {
      return [...new Set(state.products.map((product) => product.category))]
    },

    filteredProducts: (state) => {
      let result = [...state.products]

      if (state.selectedCategory !== 'all') {
        result = result.filter(
          (product) => product.category === state.selectedCategory,
        )
      }

      if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase().trim()

        result = result.filter((product) =>
          product.title.toLowerCase().includes(query),
        )
      }

      if (state.sortBy === 'price-asc') {
        result.sort((a, b) => a.price - b.price)
      }

      if (state.sortBy === 'price-desc') {
        result.sort((a, b) => b.price - a.price)
      }

      return result
    },

    featuredProducts: (state) => state.products.slice(0, 4),
  },

  actions: {
    async fetchProducts() {
      if (this.products.length > 0) {
        return
      }

      this.isLoading = true
      this.error = null

      try {
        const response = await axios.get<Product[]>(
          'https://fakestoreapi.com/products',
        )

        this.products = response.data
      } catch (error) {
        console.error(error)
        this.error = 'Не удалось загрузить товары'
      } finally {
        this.isLoading = false
      }
    },

    setSearchQuery(query: string) {
      this.searchQuery = query
    },

    setCategory(category: string) {
      this.selectedCategory = category
    },

    setSort(sort: string) {
      this.sortBy = sort
    },

    resetFilters() {
      this.searchQuery = ''
      this.selectedCategory = 'all'
      this.sortBy = 'default'
    },
  },
})