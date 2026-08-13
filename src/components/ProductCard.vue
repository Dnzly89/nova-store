<script setup lang="ts">
import { Heart, ShoppingCart } from 'lucide-vue-next'
import type { Product } from '@/stores/products.store'
import { RouterLink } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites.store'
import { useCartStore } from '@/stores/cart.store'
import { ref } from 'vue'
import Toast from '@/components/Toast.vue'
const props = defineProps<{
  product: Product
}>()
const favoritesStore = useFavoritesStore()
const cartStore = useCartStore()

const showToast = ref(false)

let toastTimer: ReturnType<typeof setTimeout> | undefined

const addToCart = () => {
  cartStore.addToCart(props.product)

  showToast.value = true

  if (toastTimer) {
    clearTimeout(toastTimer)
  }

  toastTimer = setTimeout(() => {
    showToast.value = false
  }, 2500)
}
</script>

<template>
  <RouterLink
  :to="`/product/${product.id}`"
  class="product-card"
>
    <div class="product-card__image">
      <img :src="product.image" :alt="product.title" />

      <button
      class="favorite-btn"
      :class="{ 'favorite-btn--active': favoritesStore.isFavorite(product.id) }"
      type="button"
      @click.prevent.stop="favoritesStore.toggleFavorite(product)"
    >
      <Heart
        :size="18"
        :fill="favoritesStore.isFavorite(product.id) ? 'currentColor' : 'none'"
      />
    </button>
    </div>

    <div class="product-card__content">
      <span class="product-card__category">
        {{ product.category }}
      </span>

      <h3>{{ product.title }}</h3>

      <div class="product-card__bottom">
        <strong>${{ product.price.toFixed(2) }}</strong>

      <button
      class="cart-btn"
      type="button"
      @click.prevent.stop="addToCart"
    >
      <ShoppingCart :size="18" />
    </button>
      </div>
    </div>
  </RouterLink>
  <Toast
  :visible="showToast"
  message="Added to cart"
  @close="showToast = false"
/>
</template>

<style scoped>
.product-card {
  position: relative;

  overflow: hidden;

  display: block;

  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;

  background: rgba(255, 255, 255, 0.04);

  color: inherit;
  text-decoration: none;

  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-6px);

  border-color: rgba(91, 124, 250, 0.35);

  box-shadow:
    0 20px 45px rgba(0, 0, 0, 0.22),
    0 0 30px rgba(91, 124, 250, 0.06);
}


/* =========================
   IMAGE
========================= */

.product-card__image {
  position: relative;

  height: 280px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 28px;

  overflow: hidden;

  background:
    radial-gradient(
      circle at 50% 40%,
      rgba(91, 124, 250, 0.08),
      transparent 60%
    ),
    rgba(255, 255, 255, 0.96);
}

.product-card__image::after {
  content: '';

  position: absolute;
  inset: 0;

  background: linear-gradient(
    135deg,
    transparent 40%,
    rgba(255, 255, 255, 0.2),
    transparent 65%
  );

  opacity: 0;

  transform: translateX(-100%);

  transition:
    opacity 0.3s ease,
    transform 0.6s ease;

  pointer-events: none;
}

.product-card:hover .product-card__image::after {
  opacity: 1;

  transform: translateX(100%);
}

.product-card__image img {
  width: 100%;
  height: 100%;

  object-fit: contain;

  transition:
    transform 0.4s ease,
    filter 0.4s ease;
}

.product-card:hover .product-card__image img {
  transform: scale(1.06);

  filter: drop-shadow(
    0 15px 18px rgba(0, 0, 0, 0.14)
  );
}


/* =========================
   FAVORITE
========================= */

.favorite-btn {
  position: absolute;

  top: 14px;
  right: 14px;

  z-index: 2;

  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 12px;

  background: rgba(255, 255, 255, 0.92);

  color: #29324a;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;
}

.favorite-btn:hover {
  transform: scale(1.08);

  background: white;

  color: #5b7cfa;
}

.favorite-btn--active {
  color: #ff6f91;
}

.favorite-btn--active:hover {
  color: #ff6f91;
}


/* =========================
   CONTENT
========================= */

.product-card__content {
  padding: 20px;
}

.product-card__category {
  display: block;

  margin-bottom: 8px;

  color: #7f8baa;

  font-size: 11px;
  font-weight: 600;

  text-transform: uppercase;
  letter-spacing: 1px;
}

.product-card h3 {
  min-height: 48px;

  margin: 0 0 20px;

  color: white;

  font-size: 16px;
  font-weight: 600;

  line-height: 1.5;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  overflow: hidden;
}


/* =========================
   BOTTOM
========================= */

.product-card__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 15px;
}

.product-card__bottom strong {
  color: white;

  font-size: 21px;
  font-weight: 700;

  letter-spacing: -0.3px;
}


/* =========================
   CART
========================= */

.cart-btn {
  flex-shrink: 0;

  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 12px;

  background: #5b7cfa;

  color: white;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.cart-btn:hover {
  transform: translateY(-2px);

  background: #6b89ff;

  box-shadow:
    0 8px 20px rgba(91, 124, 250, 0.35);
}

.cart-btn:active {
  transform: scale(0.95);
}


/* =========================
   TABLET
========================= */

@media (max-width: 900px) {
  .product-card__image {
    height: 250px;

    padding: 24px;
  }

  .product-card__content {
    padding: 17px;
  }

  .product-card h3 {
    font-size: 15px;
  }

  .product-card__bottom strong {
    font-size: 19px;
  }
}


/* =========================
   MOBILE
========================= */

@media (max-width: 600px) {
  .product-card {
    border-radius: 18px;
  }

  .product-card:hover {
    transform: translateY(-3px);
  }

  .product-card__image {
    height: 260px;

    padding: 25px;
  }

  .favorite-btn {
    top: 12px;
    right: 12px;

    width: 38px;
    height: 38px;

    border-radius: 11px;
  }

  .product-card__content {
    padding: 16px;
  }

  .product-card__category {
    font-size: 10px;
  }

  .product-card h3 {
    min-height: 44px;

    margin-bottom: 16px;

    font-size: 15px;
    line-height: 1.45;
  }

  .product-card__bottom strong {
    font-size: 19px;
  }

  .cart-btn {
    width: 40px;
    height: 40px;

    border-radius: 11px;
  }
}


/* =========================
   SMALL MOBILE
========================= */

@media (max-width: 380px) {
  .product-card__image {
    height: 230px;

    padding: 22px;
  }

  .product-card__content {
    padding: 14px;
  }

  .product-card h3 {
    font-size: 14px;
  }

  .product-card__bottom strong {
    font-size: 18px;
  }
}
</style>