<script setup lang="ts">
import { computed } from 'vue'
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

import { useCartStore } from '@/stores/cart.store'

const cartStore = useCartStore()

const formattedTotal = computed(() => {
  return cartStore.totalPrice.toFixed(2)
})
</script>

<template>
  <section class="cart-page">
    <div class="container">

      <div class="cart-header">
        <div>
          <span class="cart-label">Nova Store</span>

          <h1>Your Cart</h1>

          <p>
            {{ cartStore.totalItems }}
            {{ cartStore.totalItems === 1 ? 'item' : 'items' }}
            in your cart
          </p>
        </div>

        <button
          v-if="cartStore.items.length"
          type="button"
          class="clear-button"
          @click="cartStore.clearCart"
        >
          <Trash2 :size="17" />
          Clear cart
        </button>
      </div>

      <!-- Empty cart -->
      <div
        v-if="cartStore.items.length === 0"
        class="empty-cart"
      >
        <div class="empty-cart__icon">
          🛒
        </div>

        <h2>Your cart is empty</h2>

        <p>
          Looks like you haven't added anything yet.
        </p>

        <RouterLink
          to="/catalog"
          class="shop-button"
        >
          Start shopping
        </RouterLink>
      </div>

      <!-- Cart -->
      <div
        v-else
        class="cart-layout"
      >

        <div class="cart-items">

          <article
            v-for="item in cartStore.items"
            :key="item.product.id"
            class="cart-item"
          >

            <RouterLink
              :to="`/product/${item.product.id}`"
              class="cart-item__image"
            >
              <img
                :src="item.product.image"
                :alt="item.product.title"
              />
            </RouterLink>

            <div class="cart-item__info">

              <span>
                {{ item.product.category }}
              </span>

              <RouterLink
                :to="`/product/${item.product.id}`"
                class="cart-item__title"
              >
                {{ item.product.title }}
              </RouterLink>

              <strong>
                ${{ item.product.price.toFixed(2) }}
              </strong>

            </div>

            <div class="cart-item__quantity">

              <button
                type="button"
                @click="cartStore.decreaseQuantity(item.product.id)"
              >
                <Minus :size="16" />
              </button>

              <span>
                {{ item.quantity }}
              </span>

              <button
                type="button"
                @click="cartStore.increaseQuantity(item.product.id)"
              >
                <Plus :size="16" />
              </button>

            </div>

            <div class="cart-item__total">
              ${{ (item.product.price * item.quantity).toFixed(2) }}
            </div>

            <button
              type="button"
              class="remove-button"
              @click="cartStore.removeFromCart(item.product.id)"
            >
              <Trash2 :size="18" />
            </button>

          </article>

        </div>

        <!-- Summary -->
        <aside class="summary">

          <h2>Order Summary</h2>

          <div class="summary__row">
            <span>Products</span>
            <span>{{ cartStore.totalItems }}</span>
          </div>

          <div class="summary__row">
            <span>Subtotal</span>
            <span>${{ formattedTotal }}</span>
          </div>

          <div class="summary__row">
            <span>Delivery</span>
            <span>Free</span>
          </div>

          <div class="summary__divider"></div>

          <div class="summary__total">
            <span>Total</span>
            <strong>${{ formattedTotal }}</strong>
          </div>

          <button
            type="button"
            class="checkout-button"
          >
            Checkout
          </button>

          <RouterLink
            to="/catalog"
            class="continue-link"
          >
            <ArrowLeft :size="16" />
            Continue shopping
          </RouterLink>

        </aside>

      </div>

    </div>
  </section>
</template>

<style scoped>
.cart-page {
  min-height: 70vh;
  padding: 80px 0 120px;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 80px;
}

.cart-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  margin-bottom: 45px;
}

.cart-label {
  color: #5b7cfa;

  font-size: 13px;
  font-weight: 700;

  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.cart-header h1 {
  margin: 10px 0;

  color: white;

  font-size: 52px;
  letter-spacing: -2px;
}

.cart-header p {
  margin: 0;

  color: #8d98b3;
}

.clear-button {
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 11px 16px;

  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;

  background: transparent;
  color: #aab3c5;

  cursor: pointer;

  transition: 0.25s;
}

.clear-button:hover {
  color: #ff7d8d;
  border-color: rgba(255, 125, 141, 0.3);
}

/* Empty */

.empty-cart {
  min-height: 450px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
}

.empty-cart__icon {
  margin-bottom: 20px;

  font-size: 60px;
}

.empty-cart h2 {
  margin: 0 0 10px;

  color: white;
  font-size: 28px;
}

.empty-cart p {
  margin: 0 0 30px;

  color: #8d98b3;
}

.shop-button {
  padding: 13px 22px;

  border-radius: 12px;

  background: #5b7cfa;
  color: white;

  text-decoration: none;

  transition: 0.25s;
}

.shop-button:hover {
  transform: translateY(-2px);
}

/* Layout */

.cart-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 30px;

  align-items: start;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* Item */

.cart-item {
  min-height: 150px;

  display: grid;
  grid-template-columns: 110px minmax(0, 1fr) auto auto auto;
  align-items: center;
  gap: 20px;

  padding: 18px;

  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 18px;

  background: rgba(255, 255, 255, 0.04);
}

.cart-item__image {
  width: 110px;
  height: 110px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 12px;

  border-radius: 12px;

  background: white;
}

.cart-item__image img {
  width: 100%;
  height: 100%;

  object-fit: contain;
}

.cart-item__info {
  min-width: 0;
}

.cart-item__info > span {
  color: #7f8baa;

  font-size: 11px;

  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.cart-item__title {
  display: block;

  margin: 7px 0 12px;

  color: white;

  font-size: 16px;
  line-height: 1.4;

  text-decoration: none;
}

.cart-item__title:hover {
  color: #5b7cfa;
}

.cart-item__info strong {
  color: #dce2f2;
}

/* Quantity */

.cart-item__quantity {
  display: flex;
  align-items: center;

  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;

  overflow: hidden;
}

.cart-item__quantity button {
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;

  background: transparent;
  color: #aab3c5;

  cursor: pointer;
}

.cart-item__quantity button:hover {
  background: rgba(255, 255, 255, 0.06);
  color: white;
}

.cart-item__quantity span {
  min-width: 32px;

  color: white;

  text-align: center;
  font-size: 14px;
}

/* Total */

.cart-item__total {
  min-width: 85px;

  color: white;

  font-size: 17px;
  font-weight: 600;

  text-align: right;
}

/* Remove */

.remove-button {
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 10px;

  background: transparent;
  color: #7f8baa;

  cursor: pointer;

  transition: 0.25s;
}

.remove-button:hover {
  background: rgba(255, 125, 141, 0.1);
  color: #ff7d8d;
}

/* Summary */

.summary {
  position: sticky;
  top: 110px;

  padding: 28px;

  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;

  background: rgba(255, 255, 255, 0.04);
}

.summary h2 {
  margin: 0 0 25px;

  color: white;
  font-size: 22px;
}

.summary__row {
  display: flex;
  justify-content: space-between;

  margin-bottom: 16px;

  color: #8d98b3;
  font-size: 14px;
}

.summary__row span:last-child {
  color: #dce2f2;
}

.summary__divider {
  height: 1px;

  margin: 25px 0;

  background: rgba(255, 255, 255, 0.08);
}

.summary__total {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 25px;

  color: white;
}

.summary__total strong {
  font-size: 25px;
}

.checkout-button {
  width: 100%;
  height: 52px;

  border: none;
  border-radius: 13px;

  background: #5b7cfa;
  color: white;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.25s;
}

.checkout-button:hover {
  transform: translateY(-2px);

  box-shadow: 0 12px 25px rgba(91, 124, 250, 0.3);
}

.continue-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  margin-top: 18px;

  color: #8d98b3;

  font-size: 13px;
  text-decoration: none;
}

.continue-link:hover {
  color: white;
}

/* =========================
   Responsive
========================= */

@media (max-width: 1100px) {
  .container {
    padding: 0 40px;
  }

  .cart-layout {
    grid-template-columns: 1fr;
  }

  .summary {
    position: static;
  }

  .cart-item {
    grid-template-columns: 100px minmax(0, 1fr) auto;
  }

  .cart-item__quantity {
    grid-column: 2;
    justify-self: start;
  }

  .cart-item__total {
    grid-column: 3;
    grid-row: 2;
  }

  .remove-button {
    grid-column: 3;
    grid-row: 1;
  }
}

@media (max-width: 700px) {
  .container {
    padding: 0 20px;
  }

  .cart-page {
    padding: 55px 0 80px;
  }

  /* Header */

  .cart-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 18px;

    margin-bottom: 30px;
  }

  .cart-header h1 {
    font-size: 40px;
    letter-spacing: -1.5px;
  }

  .cart-header p {
    font-size: 14px;
  }

  .clear-button {
    width: 100%;
    justify-content: center;
  }

  /* Empty cart */

  .empty-cart {
    min-height: 380px;
  }

  .empty-cart__icon {
    font-size: 50px;
  }

  .empty-cart h2 {
    font-size: 24px;
  }

  .shop-button {
    width: 100%;
    box-sizing: border-box;
    text-align: center;
  }

  /* Cart item */

  .cart-items {
    gap: 12px;
  }

  .cart-item {
    display: grid;

    grid-template-columns: 78px minmax(0, 1fr);

    gap: 14px;

    padding: 14px;

    border-radius: 16px;
  }

  .cart-item__image {
    width: 78px;
    height: 78px;

    padding: 10px;

    grid-row: 1 / span 2;
  }

  .cart-item__info {
    min-width: 0;
  }

  .cart-item__info > span {
    font-size: 10px;
  }

  .cart-item__title {
    margin: 5px 0 8px;

    font-size: 14px;
    line-height: 1.35;
  }

  .cart-item__info strong {
    font-size: 15px;
  }

  /* Quantity */

  .cart-item__quantity {
    grid-column: 2;

    justify-self: start;
  }

  .cart-item__quantity button {
    width: 34px;
    height: 34px;
  }

  /* Total */

  .cart-item__total {
    grid-column: 2;
    grid-row: auto;

    min-width: 0;

    font-size: 16px;

    text-align: left;
  }

  /* Remove */

  .remove-button {
    grid-column: 2;
    grid-row: auto;

    justify-self: start;

    width: 36px;
    height: 36px;
  }

  /* Summary */

  .summary {
    padding: 22px;

    border-radius: 16px;
  }

  .summary h2 {
    font-size: 20px;
  }

  .checkout-button {
    height: 54px;
  }
}

@media (max-width: 420px) {
  .container {
    padding: 0 16px;
  }

  .cart-page {
    padding-top: 45px;
  }

  .cart-header h1 {
    font-size: 36px;
  }

  .cart-item {
    grid-template-columns: 68px minmax(0, 1fr);
    padding: 12px;
  }

  .cart-item__image {
    width: 68px;
    height: 68px;
  }

  .cart-item__title {
    font-size: 13px;
  }

  .cart-item__quantity button {
    width: 32px;
    height: 32px;
  }

  .summary {
    padding: 18px;
  }

  .summary__total strong {
    font-size: 22px;
  }
}


</style>