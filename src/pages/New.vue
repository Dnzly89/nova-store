<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { ArrowRight, Sparkles } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

import ProductCard from '@/components/ProductCard.vue'
import { useProductsStore } from '@/stores/products.store'

const productsStore = useProductsStore()

onMounted(() => {
  productsStore.fetchProducts()
})

const newProducts = computed(() => {
  return [...productsStore.products].reverse().slice(0, 8)
})
</script>

<template>
  <main class="new-page">
    <section class="new-hero">
      <div class="new-glow new-glow--one"></div>
      <div class="new-glow new-glow--two"></div>

      <div class="container">
        <div class="new-hero__content">
          <div class="new-badge">
            <Sparkles :size="16" />
            <span>Fresh arrivals</span>
          </div>

          <h1>
            New
            <span>Products.</span>
          </h1>

          <p>
            Discover the latest products added to Nova Store.
            Find something new for your collection.
          </p>

          <RouterLink to="/catalog" class="catalog-btn">
            Explore catalog
            <ArrowRight :size="18" />
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="products-section">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="section-label">Just added</span>

            <h2>New Arrivals</h2>

            <p>
              The latest products available in our store.
            </p>
          </div>

          <RouterLink to="/catalog" class="view-all">
            View all
            <ArrowRight :size="18" />
          </RouterLink>
        </div>

        <div
          v-if="productsStore.isLoading"
          class="state-message"
        >
          Loading new products...
        </div>

        <div
          v-else-if="productsStore.error"
          class="state-message state-message--error"
        >
          {{ productsStore.error }}
        </div>

        <div
          v-else-if="newProducts.length === 0"
          class="state-message"
        >
          No new products found.
        </div>

        <div
          v-else
          class="products-grid"
        >
          <ProductCard
            v-for="product in newProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.new-page {
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 80px;
}

.new-hero {
  position: relative;
  min-height: 430px;

  display: flex;
  align-items: center;

  overflow: hidden;

  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.new-hero__content {
  position: relative;
  z-index: 2;

  max-width: 700px;

  padding: 90px 0;
}

.new-badge {
  width: fit-content;

  display: flex;
  align-items: center;
  gap: 8px;

  padding: 8px 14px;
  margin-bottom: 22px;

  border: 1px solid rgba(91, 124, 250, 0.35);
  border-radius: 30px;

  background: rgba(91, 124, 250, 0.08);

  color: #9eafff;

  font-size: 14px;
}

.new-hero h1 {
  margin: 0;

  color: white;

  font-size: clamp(52px, 7vw, 82px);
  line-height: 1;

  letter-spacing: -4px;
}

.new-hero h1 span {
  display: block;

  background: linear-gradient(
    90deg,
    #5b7cfa,
    #9b7cff
  );

  -webkit-background-clip: text;
  background-clip: text;

  color: transparent;
}

.new-hero p {
  max-width: 600px;

  margin: 25px 0 32px;

  color: #aab3c5;

  font-size: 18px;
  line-height: 1.7;
}

.catalog-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  min-height: 52px;

  padding: 0 24px;

  border-radius: 14px;

  background: #5b7cfa;

  color: white;

  text-decoration: none;
  font-weight: 600;

  box-shadow:
    0 12px 30px rgba(91, 124, 250, 0.25);

  transition: 0.3s;
}

.catalog-btn:hover {
  transform: translateY(-3px);

  box-shadow:
    0 16px 35px rgba(91, 124, 250, 0.4);
}

.new-glow {
  position: absolute;

  width: 350px;
  height: 350px;

  border-radius: 50%;

  filter: blur(100px);

  pointer-events: none;
}

.new-glow--one {
  top: -150px;
  right: 15%;

  background: rgba(91, 124, 250, 0.16);
}

.new-glow--two {
  bottom: -180px;
  right: -80px;

  background: rgba(155, 124, 255, 0.12);
}

.products-section {
  padding: 90px 0 110px;
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 30px;

  margin-bottom: 40px;
}

.section-label {
  color: #5b7cfa;

  font-size: 13px;
  font-weight: 700;

  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.section-header h2 {
  margin: 10px 0;

  color: white;

  font-size: 42px;
  letter-spacing: -1px;
}

.section-header p {
  margin: 0;

  color: #8d98b3;
}

.view-all {
  display: flex;
  align-items: center;
  gap: 8px;

  color: #dce2f2;

  text-decoration: none;
  font-weight: 600;

  transition: 0.25s;
}

.view-all:hover {
  color: #5b7cfa;
}

.products-grid {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 24px;
}

.state-message {
  min-height: 250px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #8d98b3;
}

.state-message--error {
  color: #ff7d8d;
}

@media (max-width: 1100px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .container {
    padding: 0 30px;
  }

  .new-hero__content {
    padding: 70px 0;
  }
}

@media (max-width: 600px) {
  .container {
    padding: 0 20px;
  }

  .new-hero {
    min-height: 400px;
  }

  .new-hero h1 {
    font-size: 52px;
    letter-spacing: -2px;
  }

  .new-hero p {
    font-size: 16px;
  }

  .catalog-btn {
    width: 100%;
    justify-content: center;
  }

  .products-section {
    padding: 70px 0;
  }

  .section-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .section-header h2 {
    font-size: 34px;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>