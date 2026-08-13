<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { ArrowRight, Sparkles } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

import ProductCard from '@/components/ProductCard.vue'
import { useProductsStore } from '@/stores/products.store'

const productsStore = useProductsStore()

const heroProduct = computed(() => {
  return productsStore.products[0]
})

onMounted(() => {
  productsStore.fetchProducts()
})
</script>

<template>
  <section class="hero">
    <div class="hero__glow hero__glow--one"></div>
    <div class="hero__glow hero__glow--two"></div>

    <div class="container hero__container">
      <div class="hero__content">
        <div class="hero__badge">
          <Sparkles :size="16" />
          <span>New collection 2026</span>
        </div>

        <h1>
          Discover products
          <span>you'll love.</span>
        </h1>

        <p>
          Modern products, great prices and a shopping experience
          designed for you.
        </p>

        <div class="hero__actions">
          <RouterLink to="/catalog" class="btn btn--primary">
            Shop now
            <ArrowRight :size="18" />
          </RouterLink>

          <RouterLink to="/catalog" class="btn btn--secondary">
            Explore catalog
          </RouterLink>
        </div>
      </div>

      <div class="hero__visual">
        <div class="hero__circle"></div>

<RouterLink
  v-if="heroProduct"
  :to="`/product/${heroProduct.id}`"
  class="product-card product-card--main"
>
  <div class="product-card__image">
    <img
      :src="heroProduct.image"
      :alt="heroProduct.title"
    />

    <span>FEATURED</span>
  </div>

  <div class="product-card__info">
    <div>
      <strong>{{ heroProduct.title }}</strong>

      <small>
        ★ {{ heroProduct.rating.rate }}
      </small>
    </div>

    <strong>${{ heroProduct.price.toFixed(2) }}</strong>
  </div>
</RouterLink>

        <div class="floating-card floating-card--top">
          <span>★</span>
          <div>
            <strong>4.9</strong>
            <small>Customer rating</small>
          </div>
        </div>

        <div class="floating-card floating-card--bottom">
          <strong>500+</strong>
          <small>Products</small>
        </div>
      </div>
    </div>
  </section>
  <section class="products-section">
  <div class="container">
    <div class="section-header">
      <div>
        <span class="section-label">Our selection</span>

        <h2>Featured Products</h2>

        <p>
          Discover some of our most popular products.
        </p>
      </div>

      <RouterLink to="/catalog" class="view-all">
        View all
        <ArrowRight :size="18" />
      </RouterLink>
    </div>

    <div v-if="productsStore.isLoading" class="products-loading">
      Loading products...
    </div>

    <div v-else-if="productsStore.error" class="products-error">
      {{ productsStore.error }}
    </div>

    <div v-else class="products-grid">
      <ProductCard
        v-for="product in productsStore.featuredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: calc(100vh - 80px);
  overflow: hidden;
  display: flex;
  align-items: center;
}

.container {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 80px;
}

.hero__container {
  min-height: calc(100vh - 80px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 60px;
}

.hero__content {
  position: relative;
  z-index: 2;
}

.hero__badge {
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  margin-bottom: 24px;

  border: 1px solid rgba(91, 124, 250, 0.35);
  border-radius: 30px;

  background: rgba(91, 124, 250, 0.08);
  color: #9eafff;

  font-size: 14px;
}

.hero h1 {
  max-width: 700px;
  margin: 0;

  color: white;
  font-size: clamp(52px, 6vw, 82px);
  line-height: 1.05;
  letter-spacing: -3px;
}

.hero h1 span {
  display: block;

  background: linear-gradient(90deg, #5b7cfa, #9b7cff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero p {
  max-width: 570px;
  margin: 28px 0 36px;

  color: #aab3c5;
  font-size: 18px;
  line-height: 1.7;
}

.hero__actions {
  display: flex;
  gap: 14px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  min-height: 52px;
  padding: 0 24px;

  border-radius: 14px;

  text-decoration: none;
  font-weight: 600;

  transition: 0.3s;
}

.btn--primary {
  background: #5b7cfa;
  color: white;
  box-shadow: 0 12px 30px rgba(91, 124, 250, 0.25);
}

.btn--primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 35px rgba(91, 124, 250, 0.4);
}

.btn--secondary {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: #e7ebf5;
}

.btn--secondary:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-3px);
}

.hero__visual {
  position: relative;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero__circle {
  position: absolute;
  width: 440px;
  height: 440px;

  border-radius: 50%;

  background: radial-gradient(
    circle,
    rgba(91, 124, 250, 0.28),
    rgba(155, 124, 255, 0.08) 50%,
    transparent 70%
  );

  filter: blur(10px);
}

.product-card {
  position: relative;
  z-index: 2;

  width: 330px;

  padding: 14px;

  text-decoration: none;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;

  background: rgba(20, 29, 53, 0.72);

  backdrop-filter: blur(20px);

  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.35),
    0 0 60px rgba(91, 124, 250, 0.12);

  transform: rotate(-5deg);

  transition: 0.4s;
}

.product-card:hover {
  transform: rotate(0deg) translateY(-8px);
}

.product-card__image {
  height: 360px;

  border-radius: 18px;

  display: flex;
  align-items: flex-start;
  justify-content: flex-end;

  padding: 16px;

  background:
    radial-gradient(circle at 30% 20%, #718bff, transparent 35%),
    linear-gradient(145deg, #182544, #0d1529);
}

.product-card__image img {
  width: 100%;
  height: 100%;

  object-fit: contain;

  padding: 35px;

  filter: drop-shadow(0 20px 25px rgba(0, 0, 0, 0.25));

  transition: 0.4s;
}

.product-card:hover .product-card__image img {
  transform: scale(1.05);
}

.product-card__image span {
  padding: 6px 10px;

  border-radius: 8px;

  background: #5b7cfa;

  color: white;

  font-size: 11px;
  font-weight: 700;
}

.product-card__info {
  padding: 18px 8px 6px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: white;
}

.product-card__info div {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.product-card__info small {
  color: #8d98b3;
}

.floating-card {
  position: absolute;
  z-index: 3;

  display: flex;
  align-items: center;
  gap: 10px;

  padding: 14px 18px;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;

  background: rgba(16, 25, 47, 0.8);

  backdrop-filter: blur(20px);

  color: white;

  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

.floating-card strong {
  display: block;
}

.floating-card small {
  display: block;
  margin-top: 3px;
  color: #8d98b3;
}

.floating-card--top {
  top: 100px;
  right: 30px;
}

.floating-card--top span {
  color: #ffd75b;
  font-size: 22px;
}

.floating-card--bottom {
  bottom: 110px;
  left: 30px;
}

.hero__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
}

.hero__glow--one {
  width: 300px;
  height: 300px;
  top: 5%;
  left: -100px;
  background: rgba(91, 124, 250, 0.12);
}

.hero__glow--two {
  width: 300px;
  height: 300px;
  right: -100px;
  bottom: 0;
  background: rgba(155, 124, 255, 0.1);
}

@media (max-width: 900px) {
  .container {
    padding: 0 30px;
  }

  .hero {
    min-height: auto;
  }

  .hero__container {
    grid-template-columns: 1fr;

    min-height: auto;

    padding-top: 90px;
    padding-bottom: 70px;

    gap: 30px;
  }

  .hero__content {
    text-align: center;
  }

  .hero__badge {
    margin-left: auto;
    margin-right: auto;
  }

  .hero h1 {
    max-width: 800px;
    margin: 0 auto;

    font-size: clamp(48px, 8vw, 70px);
  }

  .hero p {
    margin-left: auto;
    margin-right: auto;
  }

  .hero__actions {
    justify-content: center;
  }

  .hero__visual {
    height: 520px;
  }

  .floating-card--top {
    top: 60px;
    right: 10%;
  }

  .floating-card--bottom {
    bottom: 60px;
    left: 10%;
  }
}


@media (max-width: 600px) {
  .container {
    padding: 0 20px;
  }

  .hero__container {
    padding-top: 60px;
    padding-bottom: 50px;

    gap: 10px;
  }

  .hero__badge {
    padding: 7px 11px;

    font-size: 12px;
  }

  .hero h1 {
    font-size: clamp(38px, 11vw, 48px);

    line-height: 1.08;

    letter-spacing: -1.5px;
  }

  .hero p {
    margin: 20px auto 28px;

    font-size: 15px;
    line-height: 1.6;
  }

  .hero__actions {
    flex-direction: column;

    gap: 10px;
  }

  .btn {
    width: 100%;

    min-height: 48px;

    padding: 0 18px;

    border-radius: 12px;
  }

  .hero__visual {
    width: 100%;
    height: 420px;

    margin: 10px 0 0;

    transform: none;
  }

  .hero__circle {
    width: 320px;
    height: 320px;
  }

  .product-card {
    width: 270px;

    border-radius: 20px;

    transform: rotate(-3deg);
  }

  .product-card__image {
    height: 290px;

    border-radius: 15px;

    padding: 12px;
  }

  .product-card__image img {
    padding: 25px;
  }

  .product-card__info {
    padding: 14px 6px 5px;

    font-size: 13px;
  }

  .floating-card {
    padding: 10px 13px;

    border-radius: 12px;

    font-size: 12px;
  }

  .floating-card--top {
    top: 35px;
    right: 0;
  }

  .floating-card--bottom {
    bottom: 35px;
    left: 0;
  }

  .floating-card--top span {
    font-size: 18px;
  }
}


@media (max-width: 380px) {
  .hero h1 {
    font-size: 36px;
  }

  .hero__visual {
    height: 390px;
  }

  .product-card {
    width: 245px;
  }

  .product-card__image {
    height: 260px;
  }

  .floating-card--top {
    right: -5px;
  }

  .floating-card--bottom {
    left: -5px;
  }
}

.products-section {
  position: relative;
  padding: 100px 0;
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

.products-loading,
.products-error {
  min-height: 200px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #8d98b3;
}

.products-error {
  color: #ff7d8d;
}

@media (max-width: 1100px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
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

@media (max-width: 600px) {
  .section-header {
    margin-bottom: 28px;
  }

  .section-header h2 {
    margin: 8px 0;

    font-size: 32px;
  }

  .section-header p {
    font-size: 14px;
    line-height: 1.5;
  }

  .view-all {
    padding: 10px 14px;

    border-radius: 10px;

    background: rgba(255, 255, 255, 0.04);

    font-size: 14px;
  }

  .products-grid {
    gap: 18px;
  }
}
</style>