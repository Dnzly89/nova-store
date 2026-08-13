import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'


import type { Product } from './products.store'

export interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const savedCart = localStorage.getItem('nova-cart')

const items = ref<CartItem[]>(
  savedCart ? JSON.parse(savedCart) : [],
)

  const totalItems = computed(() => {
    return items.value.reduce(
      (total, item) => total + item.quantity,
      0,
    )
  })

  const totalPrice = computed(() => {
    return items.value.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    )
  })

  const addToCart = (product: Product) => {
    const existingItem = items.value.find(
      (item) => item.product.id === product.id,
    )

    if (existingItem) {
      existingItem.quantity++
      return
    }

    items.value.push({
      product,
      quantity: 1,
    })
  }

  const removeFromCart = (productId: number) => {
    items.value = items.value.filter(
      (item) => item.product.id !== productId,
    )
  }

  const increaseQuantity = (productId: number) => {
    const item = items.value.find(
      (item) => item.product.id === productId,
    )

    if (item) {
      item.quantity++
    }
  }

  const decreaseQuantity = (productId: number) => {
    const item = items.value.find(
      (item) => item.product.id === productId,
    )

    if (!item) {
      return
    }

    if (item.quantity > 1) {
      item.quantity--
    } else {
      removeFromCart(productId)
    }
  }

  const clearCart = () => {
    items.value = []
  }

  watch(
  items,
  (newItems) => {
    localStorage.setItem(
      'nova-cart',
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
    totalPrice,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  }
})