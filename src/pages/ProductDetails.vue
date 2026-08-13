<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { ArrowLeft, Heart, ShoppingCart, Star } from 'lucide-vue-next'
import { RouterLink, useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart.store'
import { useProductsStore } from '@/stores/products.store'
import { useFavoritesStore } from '@/stores/favorites.store'

const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

onMounted(() => {
  productsStore.fetchProducts()
})

const product = computed(() => {
  const id = Number(route.params.id)

  return productsStore.products.find(
    (item) => item.id === id,
  )
})

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value)
  }
}
</script>

<template>
  <section class="product-page">
    <div class="container">

      <RouterLink to="/catalog" class="back-link">
        <ArrowLeft :size="18" />
        Back to catalog
      </RouterLink>

      <div v-if="productsStore.isLoading" class="state">
        Loading product...
      </div>

      <div
        v-else-if="!product"
        class="state"
      >
        <h2>Product not found</h2>

        <RouterLink to="/catalog" class="back-button">
          Back to catalog
        </RouterLink>
      </div>

      <div
        v-else
        class="product"
      >

        <div class="product__image">
          <img
            :src="product.image"
            :alt="product.title"
          />
        </div>

        <div class="product__content">

          <span class="product__category">
            {{ product.category }}
          </span>

          <h1>
            {{ product.title }}
          </h1>

          <div class="rating">
            <div class="rating__stars">
              <Star
                v-for="star in 5"
                :key="star"
                :size="18"
                :fill="star <= Math.round(product.rating.rate)
                  ? 'currentColor'
                  : 'none'"
              />
            </div>

            <span>
              {{ product.rating.rate }}
              ({{ product.rating.count }} reviews)
            </span>
          </div>

          <p class="product__description">
            {{ product.description }}
          </p>

          <div class="product__price">
            ${{ product.price.toFixed(2) }}
          </div>

          <div class="product__actions">

            <button
            type="button"
            class="cart-button"
            @click="addToCart"
            >
              <ShoppingCart :size="20" />
              Add to cart
            </button>

            <button
            type="button"
            class="favorite-button"
            :class="{
              'favorite-button--active':
                product && favoritesStore.isFavorite(product.id)
            }"
            @click="product && favoritesStore.toggleFavorite(product)"
          >
            <Heart
              :size="20"
              :fill="
                product && favoritesStore.isFavorite(product.id)
                  ? 'currentColor'
                  : 'none'
              "
            />
          </button>

          </div>

        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>
.product-page {
  min-height: 70vh;
  padding: 70px 0 120px;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 80px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 45px;

  color: #8d98b3;
  text-decoration: none;

  transition: 0.25s;
}

.back-link:hover {
  color: white;
}

.product {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;

  align-items: center;
}

.product__image {
  height: 620px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 60px;

  border-radius: 28px;

  background: white;

  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.2);
}

.product__image img {
  width: 100%;
  height: 100%;

  object-fit: contain;
}

.product__category {
  color: #5b7cfa;

  font-size: 13px;
  font-weight: 700;

  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.product h1 {
  margin: 14px 0 20px;

  color: white;

  font-size: 48px;
  line-height: 1.1;
  letter-spacing: -1.5px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 12px;

  margin-bottom: 30px;

  color: #8d98b3;
  font-size: 14px;
}

.rating__stars {
  display: flex;
  gap: 3px;

  color: #ffd75b;
}

.product__description {
  margin-bottom: 35px;

  color: #aab3c5;

  font-size: 16px;
  line-height: 1.8;
}

.product__price {
  margin-bottom: 30px;

  color: white;

  font-size: 36px;
  font-weight: 700;
}

.product__actions {
  display: flex;
  gap: 12px;
}

.cart-button,
.favorite-button {
  height: 54px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  border: none;
  border-radius: 14px;

  cursor: pointer;

  transition: 0.25s;
}

.cart-button {
  flex: 1;

  background: #5b7cfa;
  color: white;

  font-size: 15px;
  font-weight: 600;
}

.cart-button:hover {
  transform: translateY(-2px);

  box-shadow: 0 12px 25px rgba(91, 124, 250, 0.3);
}

.favorite-button {
  width: 54px;

  background: rgba(255, 255, 255, 0.06);
  color: white;
}

.favorite-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.favorite-button--active {
  color: #ff6f91;
}

.state {
  min-height: 500px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 20px;

  color: #8d98b3;
  text-align: center;
}

.state h2 {
  color: white;
}

.back-button {
  padding: 12px 20px;

  border-radius: 10px;

  background: #5b7cfa;
  color: white;

  text-decoration: none;
}

/* =========================
   TABLET
========================= */

@media (max-width: 1100px) {
  .container {
    padding: 0 40px;
  }

  .product {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  .product__image {
    height: 500px;
    padding: 40px;
  }

  .product h1 {
    font-size: 40px;
  }

  .product__description {
    font-size: 15px;
  }

  .product__price {
    font-size: 32px;
  }
}


/* =========================
   MOBILE
========================= */

@media (max-width: 800px) {
  .product-page {
    padding: 45px 0 80px;
  }

  .container {
    padding: 0 24px;
  }

  .back-link {
    margin-bottom: 30px;
  }

  .product {
    grid-template-columns: 1fr;
    gap: 35px;
  }

  .product__image {
    width: 100%;
    height: 460px;
    box-sizing: border-box;
    padding: 35px;
    border-radius: 22px;
  }

  .product__content {
    width: 100%;
  }

  .product h1 {
    margin: 12px 0 18px;

    font-size: 36px;
    line-height: 1.15;
    letter-spacing: -1px;
  }

  .rating {
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;
  }

  .product__description {
    margin-bottom: 28px;

    font-size: 15px;
    line-height: 1.7;
  }

  .product__price {
    margin-bottom: 24px;
    font-size: 30px;
  }
}


/* =========================
   SMALL MOBILE
========================= */

@media (max-width: 500px) {
  .product-page {
    padding: 30px 0 60px;
  }

  .container {
    padding: 0 16px;
  }

  .back-link {
    margin-bottom: 22px;
    font-size: 14px;
  }

  .product {
    gap: 28px;
  }

  .product__image {
    height: 360px;
    padding: 25px;

    border-radius: 18px;
  }

  .product h1 {
    font-size: 30px;
  }

  .product__category {
    font-size: 11px;
  }

  .rating {
    font-size: 13px;
  }

  .product__description {
    font-size: 14px;
    line-height: 1.65;
  }

  .product__price {
    font-size: 28px;
  }

  .product__actions {
    width: 100%;
    gap: 10px;
  }

  .cart-button {
    min-width: 0;
    height: 52px;

    padding: 0 14px;

    font-size: 14px;
  }

  .favorite-button {
    width: 52px;
    min-width: 52px;
  }
}


/* =========================
   VERY SMALL PHONES
========================= */

@media (max-width: 360px) {
  .container {
    padding: 0 12px;
  }

  .product__image {
    height: 320px;
    padding: 20px;
  }

  .product h1 {
    font-size: 27px;
  }

  .product__description {
    font-size: 13px;
  }

  .cart-button {
    font-size: 13px;
  }
}
</style>