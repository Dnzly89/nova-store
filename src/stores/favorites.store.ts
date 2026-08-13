import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

import type { Product } from './products.store'

export const useFavoritesStore = defineStore('favorites', () => {
  const savedFavorites = localStorage.getItem('nova-favorites')

const items = ref<Product[]>(
  savedFavorites ? JSON.parse(savedFavorites) : [],
)

  const totalItems = computed(() => items.value.length)

  const isFavorite = (productId: number) => {
    return items.value.some(
      (product) => product.id === productId,
    )
  }

  const toggleFavorite = (product: Product) => {
    const index = items.value.findIndex(
      (item) => item.id === product.id,
    )

    if (index !== -1) {
      items.value.splice(index, 1)
      return
    }

    items.value.push(product)
  }

  const removeFavorite = (productId: number) => {
    items.value = items.value.filter(
      (product) => product.id !== productId,
    )
  }

  const clearFavorites = () => {
    items.value = []
  }

  watch(
  items,
  (newItems) => {
    localStorage.setItem(
      'nova-favorites',
      JSON.stringify(newItems),
    )
  },
  {
    deep: true,
  },
)

  return {
    items,
    totalItems,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearFavorites,
  }
})