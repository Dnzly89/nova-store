<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Search, SlidersHorizontal, X } from 'lucide-vue-next'

import ProductCard from '@/components/ProductCard.vue'
import { useProductsStore } from '@/stores/products.store'

const productsStore = useProductsStore()

onMounted(() => {
  productsStore.fetchProducts()
})

const searchQuery = computed({
  get: () => productsStore.searchQuery,
  set: (value: string) => productsStore.setSearchQuery(value),
})

const selectedCategory = computed({
  get: () => productsStore.selectedCategory,
  set: (value: string) => productsStore.setCategory(value),
})

const sortBy = computed({
  get: () => productsStore.sortBy,
  set: (value: string) => productsStore.setSort(value),
})

const hasFilters = computed(() => {
  return (
    productsStore.searchQuery !== '' ||
    productsStore.selectedCategory !== 'all' ||
    productsStore.sortBy !== 'default'
  )
})

const clearFilters = () => {
  productsStore.resetFilters()
}
</script>

<template>
  <section class="catalog">
    <div class="container">

      <!-- Header -->
      <div class="catalog__header">
        <div>
          <span class="catalog__label">Nova Store</span>

          <h1>Catalog</h1>

          <p>
            Find something you'll love.
          </p>
        </div>

        <div class="catalog__count">
          {{ productsStore.filteredProducts.length }}
          products
        </div>
      </div>

      <!-- Filters -->
      <div class="filters">

        <!-- Search -->
        <div class="search">
          <Search :size="20" />

          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
          />

          <button
            v-if="searchQuery"
            type="button"
            class="search__clear"
            @click="searchQuery = ''"
          >
            <X :size="18" />
          </button>
        </div>

        <!-- Sort -->
        <div class="sort">
          <SlidersHorizontal :size="18" />

          <select v-model="sortBy">
            <option value="default">
              Sort by
            </option>

            <option value="price-asc">
              Price: Low to high
            </option>

            <option value="price-desc">
              Price: High to low
            </option>
          </select>
        </div>

      </div>

      <!-- Categories -->
      <div class="categories">

        <button
          type="button"
          :class="[
            'category-btn',
            { 'category-btn--active': selectedCategory === 'all' }
          ]"
          @click="selectedCategory = 'all'"
        >
          All
        </button>

        <button
          v-for="category in productsStore.categories"
          :key="category"
          type="button"
          :class="[
            'category-btn',
            { 'category-btn--active': selectedCategory === category }
          ]"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>

      </div>

      <!-- Active filters -->
      <div v-if="hasFilters" class="active-filters">
        <span>
          {{ productsStore.filteredProducts.length }}
          results found
        </span>

        <button
          type="button"
          @click="clearFilters"
        >
          Clear filters
          <X :size="16" />
        </button>
      </div>

      <!-- Loading -->
      <div
        v-if="productsStore.isLoading"
        class="state"
      >
        Loading products...
      </div>

      <!-- Error -->
      <div
        v-else-if="productsStore.error"
        class="state state--error"
      >
        {{ productsStore.error }}
      </div>

      <!-- No products -->
      <div
        v-else-if="productsStore.filteredProducts.length === 0"
        class="state"
      >
        <div>
          <h2>No products found</h2>

          <p>
            Try changing your search or category.
          </p>

          <button
            type="button"
            class="reset-btn"
            @click="clearFilters"
          >
            Reset filters
          </button>
        </div>
      </div>

      <!-- Products -->
      <div
        v-else
        class="products-grid"
      >
        <ProductCard
          v-for="product in productsStore.filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>

    </div>
  </section>
</template>

<style scoped>
.catalog {
  min-height: 70vh;

  padding: 90px 0 120px;
}

.container {
  max-width: 1440px;
  width: 100%;

  margin: 0 auto;

  padding: 0 80px;
}


/* =========================
   HEADER
========================= */

.catalog__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 30px;

  margin-bottom: 40px;
}

.catalog__label {
  color: #5b7cfa;

  font-size: 13px;
  font-weight: 700;

  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.catalog h1 {
  margin: 10px 0;

  color: white;

  font-size: 52px;
  line-height: 1.05;

  letter-spacing: -2px;
}

.catalog__header p {
  margin: 0;

  color: #8d98b3;

  font-size: 18px;
}

.catalog__count {
  flex-shrink: 0;

  padding: 9px 13px;

  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 10px;

  background: rgba(255, 255, 255, 0.035);

  color: #8d98b3;

  font-size: 13px;
}


/* =========================
   FILTERS
========================= */

.filters {
  display: grid;

  grid-template-columns: minmax(0, 1fr) 220px;

  gap: 14px;

  margin-bottom: 18px;
}

.search,
.sort {
  height: 54px;

  display: flex;
  align-items: center;

  box-sizing: border-box;

  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;

  background: rgba(255, 255, 255, 0.04);

  color: #8d98b3;

  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;
}

.search:focus-within,
.sort:focus-within {
  border-color: rgba(91, 124, 250, 0.45);

  background: rgba(91, 124, 250, 0.04);

  box-shadow:
    0 0 0 3px rgba(91, 124, 250, 0.08);
}

.search {
  padding: 0 16px;
}

.search svg {
  flex-shrink: 0;
}

.search input {
  width: 100%;
  height: 100%;

  box-sizing: border-box;

  padding: 0 12px;

  border: none;
  outline: none;

  background: transparent;

  color: white;

  font-size: 15px;
}

.search input::placeholder {
  color: #6f7a93;
}

.search__clear {
  flex-shrink: 0;

  width: 32px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 8px;

  background: transparent;

  color: #8d98b3;

  cursor: pointer;

  transition: 0.2s;
}

.search__clear:hover {
  background: rgba(255, 255, 255, 0.08);

  color: white;
}


/* =========================
   SORT
========================= */

.sort {
  padding: 0 14px;

  gap: 8px;
}

.sort svg {
  flex-shrink: 0;
}

.sort select {
  width: 100%;

  border: none;
  outline: none;

  background: transparent;

  color: #dce2f2;

  font-size: 14px;

  cursor: pointer;
}

.sort select option {
  background: #151d34;

  color: white;
}


/* =========================
   CATEGORIES
========================= */

.categories {
  display: flex;
  flex-wrap: wrap;

  gap: 9px;

  margin-bottom: 25px;
}

.category-btn {
  padding: 10px 16px;

  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;

  background: rgba(255, 255, 255, 0.03);

  color: #aab3c5;

  font-size: 13px;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.category-btn:hover {
  border-color: rgba(91, 124, 250, 0.4);

  background: rgba(91, 124, 250, 0.06);

  color: white;

  transform: translateY(-1px);
}

.category-btn--active {
  background: #5b7cfa;

  border-color: #5b7cfa;

  color: white;

  box-shadow:
    0 6px 18px rgba(91, 124, 250, 0.18);
}

.category-btn--active:hover {
  background: #5b7cfa;

  border-color: #5b7cfa;

  transform: none;
}


/* =========================
   ACTIVE FILTERS
========================= */

.active-filters {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  margin-bottom: 25px;

  color: #8d98b3;

  font-size: 14px;
}

.active-filters button {
  display: flex;
  align-items: center;

  gap: 6px;

  padding: 7px 10px;

  border: none;
  border-radius: 8px;

  background: transparent;

  color: #8d98b3;

  cursor: pointer;

  transition: 0.2s;
}

.active-filters button:hover {
  background: rgba(255, 255, 255, 0.05);

  color: white;
}


/* =========================
   PRODUCTS
========================= */

.products-grid {
  display: grid;

  grid-template-columns: repeat(4, minmax(0, 1fr));

  gap: 24px;
}


/* =========================
   STATES
========================= */

.state {
  min-height: 320px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 30px;

  box-sizing: border-box;

  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;

  background: rgba(255, 255, 255, 0.025);

  text-align: center;

  color: #8d98b3;
}

.state h2 {
  margin: 0 0 10px;

  color: white;

  font-size: 24px;
}

.state p {
  margin: 0 0 22px;

  color: #8d98b3;

  line-height: 1.5;
}

.state--error {
  color: #ff7d8d;
}

.reset-btn {
  padding: 11px 18px;

  border: none;
  border-radius: 10px;

  background: #5b7cfa;

  color: white;

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.reset-btn:hover {
  transform: translateY(-2px);

  box-shadow:
    0 8px 20px rgba(91, 124, 250, 0.3);
}


/* =========================
   TABLET
========================= */

@media (max-width: 1100px) {
  .container {
    padding: 0 40px;
  }

  .products-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 20px;
  }
}


/* =========================
   MOBILE
========================= */

@media (max-width: 700px) {
  .catalog {
    padding: 60px 0 80px;
  }

  .container {
    padding: 0 20px;
  }

  .catalog__header {
    align-items: flex-start;

    flex-direction: column;

    gap: 18px;

    margin-bottom: 28px;
  }

  .catalog h1 {
    margin: 8px 0;

    font-size: 42px;

    letter-spacing: -1.5px;
  }

  .catalog__header p {
    font-size: 15px;
  }

  .catalog__count {
    padding: 8px 11px;
  }

  .filters {
    grid-template-columns: 1fr;

    gap: 10px;

    margin-bottom: 14px;
  }

  .search,
  .sort {
    height: 50px;

    border-radius: 12px;
  }

  .categories {
    flex-wrap: nowrap;

    overflow-x: auto;

    margin: 0 -20px 22px;

    padding: 0 20px 5px;

    scrollbar-width: none;
  }

  .categories::-webkit-scrollbar {
    display: none;
  }

  .category-btn {
    flex-shrink: 0;

    padding: 9px 14px;

    font-size: 12px;
  }

  .active-filters {
    align-items: flex-start;

    flex-direction: column;

    gap: 10px;

    margin-bottom: 20px;
  }

  .active-filters button {
    padding-left: 0;
  }

  .products-grid {
    grid-template-columns: 1fr;

    gap: 18px;
  }

  .state {
    min-height: 260px;

    padding: 25px;
  }
}


/* =========================
   SMALL MOBILE
========================= */

@media (max-width: 380px) {
  .catalog {
    padding-top: 45px;
  }

  .catalog h1 {
    font-size: 36px;
  }

  .catalog__header p {
    font-size: 14px;
  }

  .search input {
    font-size: 14px;
  }
}
</style>