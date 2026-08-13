<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { ArrowRight, Tag } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

import ProductCard from '@/components/ProductCard.vue'
import { useProductsStore } from '@/stores/products.store'

const productsStore = useProductsStore()

const SALE_PERCENT = 20

onMounted(() => {
  productsStore.fetchProducts()
})

const saleProducts = computed(() => {
  return productsStore.products.slice(2, 10)
})

const getSalePrice = (price: number) => {
  return price * (1 - SALE_PERCENT / 100)
}
</script>

<template>
  <main class="sale-page">
    <!-- HERO -->
    <section class="sale-hero">
      <div class="sale-glow sale-glow--one"></div>
      <div class="sale-glow sale-glow--two"></div>

      <div class="container sale-hero__container">
        <div class="sale-hero__content">
          <div class="sale-badge">
            <Tag :size="16" />
            <span>Limited time offer</span>
          </div>

          <h1>
            Big deals.
            <span>Better prices.</span>
          </h1>

          <p>
            Save on selected products and find your next
            favorite item for less.
          </p>

          <div class="sale-offer">
            <strong>20%</strong>

            <div>
              <span>OFF</span>
              <small>Selected products</small>
            </div>
          </div>

          <RouterLink to="/catalog" class="catalog-btn">
            Explore catalog
            <ArrowRight :size="18" />
          </RouterLink>
        </div>

        <div class="sale-visual">
          <div class="discount-circle">
            <span>UP TO</span>
            <strong>20%</strong>
            <span>OFF</span>
          </div>
        </div>
      </div>
    </section>

    <!-- PRODUCTS -->
    <section class="products-section">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="section-label">Special offers</span>

            <h2>Sale Products</h2>

            <p>
              Great products. Better prices.
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
          Loading sale products...
        </div>

        <div
          v-else-if="productsStore.error"
          class="state-message state-message--error"
        >
          {{ productsStore.error }}
        </div>

        <div
          v-else-if="saleProducts.length === 0"
          class="state-message"
        >
          No sale products available.
        </div>

        <div
          v-else
          class="products-grid"
        >
          <div
            v-for="product in saleProducts"
            :key="product.id"
            class="sale-product"
          >
            <div class="sale-label">
              -{{ SALE_PERCENT }}%
            </div>

            <ProductCard :product="product" />

            <div class="sale-price">
              <span class="old-price">
                ${{ product.price.toFixed(2) }}
              </span>

              <strong>
                ${{ getSalePrice(product.price).toFixed(2) }}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.sale-page {
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 80px;
}

/* HERO */

.sale-hero {
  position: relative;
  min-height: 520px;

  display: flex;
  align-items: center;

  overflow: hidden;

  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.sale-hero__container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  gap: 60px;
}

.sale-hero__content {
  position: relative;
  z-index: 2;

  padding: 80px 0;
}

.sale-badge {
  width: fit-content;

  display: flex;
  align-items: center;
  gap: 8px;

  padding: 8px 14px;
  margin-bottom: 22px;

  border: 1px solid rgba(255, 107, 130, 0.35);
  border-radius: 30px;

  background: rgba(255, 107, 130, 0.08);

  color: #ff9aaa;

  font-size: 14px;
}

.sale-hero h1 {
  margin: 0;

  color: white;

  font-size: clamp(52px, 6vw, 78px);
  line-height: 1.02;

  letter-spacing: -4px;
}

.sale-hero h1 span {
  display: block;

  background: linear-gradient(
    90deg,
    #ff718d,
    #ff9b7c
  );

  -webkit-background-clip: text;
  background-clip: text;

  color: transparent;
}

.sale-hero p {
  max-width: 570px;

  margin: 25px 0 30px;

  color: #aab3c5;

  font-size: 18px;
  line-height: 1.7;
}

.sale-offer {
  display: flex;
  align-items: center;
  gap: 12px;

  margin-bottom: 30px;
}

.sale-offer strong {
  color: #ff718d;

  font-size: 48px;
  line-height: 1;
}

.sale-offer div {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.sale-offer span {
  color: white;

  font-size: 16px;
  font-weight: 700;
}

.sale-offer small {
  color: #8d98b3;
}

.catalog-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  min-height: 52px;

  padding: 0 24px;

  border-radius: 14px;

  background: #ff718d;

  color: white;

  text-decoration: none;
  font-weight: 600;

  box-shadow:
    0 12px 30px rgba(255, 113, 141, 0.25);

  transition: 0.3s;
}

.catalog-btn:hover {
  transform: translateY(-3px);

  box-shadow:
    0 16px 35px rgba(255, 113, 141, 0.4);
}

/* VISUAL */

.sale-visual {
  position: relative;

  height: 420px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.discount-circle {
  width: 330px;
  height: 330px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;

  background:
    radial-gradient(
      circle,
      rgba(255, 113, 141, 0.22),
      rgba(255, 113, 141, 0.05) 55%,
      transparent 70%
    );

  box-shadow:
    0 0 100px rgba(255, 113, 141, 0.12);

  transform: rotate(-6deg);

  transition: 0.4s;
}

.discount-circle:hover {
  transform: rotate(0deg) scale(1.05);
}

.discount-circle span {
  color: #aab3c5;

  font-size: 14px;
  font-weight: 700;

  letter-spacing: 3px;
}

.discount-circle strong {
  margin: 8px 0;

  color: white;

  font-size: 90px;
  line-height: 1;

  letter-spacing: -5px;
}

.sale-glow {
  position: absolute;

  width: 350px;
  height: 350px;

  border-radius: 50%;

  filter: blur(100px);

  pointer-events: none;
}

.sale-glow--one {
  top: -120px;
  right: 10%;

  background: rgba(255, 113, 141, 0.12);
}

.sale-glow--two {
  bottom: -160px;
  left: 40%;

  background: rgba(255, 155, 124, 0.08);
}

/* PRODUCTS */

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
  color: #ff718d;

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
  color: #ff718d;
}

.products-grid {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 24px;
}

.sale-product {
  position: relative;
  padding-bottom: 55px;
}

.sale-label {
  position: absolute;
  z-index: 5;

  top: 12px;
  left: 12px;

  padding: 7px 10px;

  border-radius: 9px;

  background: #ff718d;

  color: white;

  font-size: 12px;
  font-weight: 800;

  box-shadow:
    0 8px 20px rgba(255, 113, 141, 0.3);
}

.sale-price {
  position: absolute;

  left: 12px;
  right: 12px;
  bottom: 0;

  display: flex;
  align-items: center;
  gap: 10px;
}

.old-price {
  color: #707b94;

  font-size: 14px;

  text-decoration: line-through;
}

.sale-price strong {
  color: #ff718d;

  font-size: 20px;
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

/* RESPONSIVE */

@media (max-width: 1100px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .container {
    padding: 0 30px;
  }

  .sale-hero__container {
    grid-template-columns: 1fr;
  }

  .sale-hero__content {
    padding: 70px 0 20px;
  }

  .sale-visual {
    height: 350px;
  }

  .discount-circle {
    width: 270px;
    height: 270px;
  }

  .discount-circle strong {
    font-size: 72px;
  }
}

@media (max-width: 600px) {
  .container {
    padding: 0 20px;
  }

  .sale-hero h1 {
    font-size: 50px;
    letter-spacing: -2px;
  }

  .sale-hero p {
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