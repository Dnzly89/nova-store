<script setup lang="ts">
import { Heart, Trash2 } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

import ProductCard from '@/components/ProductCard.vue'
import { useFavoritesStore } from '@/stores/favorites.store'

const favoritesStore = useFavoritesStore()
</script>

<template>
  <section class="favorites-page">
    <div class="container">

      <div class="favorites-header">
        <div>
          <span class="favorites-label">Nova Store</span>

          <h1>Favorites</h1>

          <p>
            Your favorite products.
          </p>
        </div>

        <button
          v-if="favoritesStore.items.length"
          type="button"
          class="clear-button"
          @click="favoritesStore.clearFavorites"
        >
          <Trash2 :size="17" />
          Clear favorites
        </button>
      </div>

      <!-- Empty -->
      <div
        v-if="favoritesStore.items.length === 0"
        class="empty"
      >
        <Heart :size="56" />

        <h2>No favorites yet</h2>

        <p>
          Save products you like and find them here later.
        </p>

        <RouterLink
          to="/catalog"
          class="shop-button"
        >
          Browse catalog
        </RouterLink>
      </div>

      <!-- Products -->
      <div
        v-else
        class="products-grid"
      >
        <ProductCard
          v-for="product in favoritesStore.items"
          :key="product.id"
          :product="product"
        />
      </div>

    </div>
  </section>
</template>

<style scoped>
.favorites-page {
  min-height: 70vh;
  padding: 80px 0 120px;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 80px;
}

.favorites-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  margin-bottom: 45px;
}

.favorites-label {
  color: #5b7cfa;

  font-size: 13px;
  font-weight: 700;

  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.favorites-header h1 {
  margin: 10px 0;

  color: white;

  font-size: 52px;
  letter-spacing: -2px;
}

.favorites-header p {
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

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.empty {
  min-height: 450px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;

  color: #7f8baa;
}

.empty h2 {
  margin: 20px 0 10px;

  color: white;
  font-size: 28px;
}

.empty p {
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

/* =========================
   Responsive
========================= */

@media (max-width: 1100px) {
  .container {
    padding: 0 40px;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 700px) {
  .container {
    padding: 0 20px;
  }

  .favorites-page {
    padding: 55px 0 80px;
  }

  /* Header */

  .favorites-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 18px;

    margin-bottom: 30px;
  }

  .favorites-header h1 {
    margin: 8px 0;

    font-size: 40px;
    letter-spacing: -1.5px;
  }

  .favorites-header p {
    font-size: 14px;
  }

  .clear-button {
    width: 100%;

    justify-content: center;

    padding: 12px 16px;
  }

  /* Products */

  .products-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  /* Empty state */

  .empty {
    min-height: 380px;

    padding: 20px 0;
  }

  .empty h2 {
    font-size: 24px;
  }

  .empty p {
    max-width: 320px;

    line-height: 1.6;
  }

  .shop-button {
    width: 100%;
    max-width: 320px;

    box-sizing: border-box;

    text-align: center;
  }
}

@media (max-width: 420px) {
  .container {
    padding: 0 16px;
  }

  .favorites-page {
    padding-top: 45px;
  }

  .favorites-header h1 {
    font-size: 36px;
  }

  .favorites-label {
    font-size: 12px;
  }

  .clear-button {
    font-size: 13px;
  }

  .products-grid {
    gap: 14px;
  }

  .empty {
    min-height: 350px;
  }

  .empty h2 {
    font-size: 22px;
  }

  .empty p {
    font-size: 14px;
  }
}
</style>