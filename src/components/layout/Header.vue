<script setup lang="ts">
import { ref } from 'vue'
import { Heart, ShoppingCart, User, Store } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

import { useCartStore } from '@/stores/cart.store'
import { useFavoritesStore } from '@/stores/favorites.store'
import { useAuthStore } from '@/stores/auth.store'
import AuthModal from '@/components/AuthModal.vue'

const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()
const authStore = useAuthStore()

const showUserMenu = ref(false)

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const logout = () => {
  authStore.logout()
  showUserMenu.value = false
}

const showAuthModal = ref(false)

const openAuthModal = () => {
  showAuthModal.value = true
}

const closeAuthModal = () => {
  showAuthModal.value = false
}

</script>

<template>
  <header class="header">
    <div class="container header__container">

      <RouterLink to="/" class="logo">
        <Store :size="28" />
        <span>NOVA STORE</span>
      </RouterLink>

      <nav class="nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/catalog">Catalog</RouterLink>
        <RouterLink to="/new">New</RouterLink>
        <RouterLink to="/sale">Sale</RouterLink>
      </nav>

      <div class="actions">

    <RouterLink to="/favorites" class="icon-btn favorites-link">
      <Heart :size="20" />

      <span
        v-if="favoritesStore.totalItems > 0"
        class="favorites-badge"
      >
        {{ favoritesStore.totalItems }}
      </span>
    </RouterLink>

        <RouterLink to="/cart" class="icon-btn cart-link">
        <ShoppingCart :size="20" />

        <span
          v-if="cartStore.totalItems > 0"
          class="cart-badge"
        >
          {{ cartStore.totalItems }}
        </span>
      </RouterLink>

     <div class="user-menu">

  <button
    v-if="!authStore.isAuthenticated"
    class="icon-btn"
    type="button"
    @click="openAuthModal"
  >
    <User :size="20" />
  </button>

  <button
    v-else
    class="user-button"
    type="button"
    @click="toggleUserMenu"
  >
    <User :size="20" />

    <span>
      {{ authStore.user?.name }}
    </span>
  </button>

  <div
    v-if="authStore.isAuthenticated && showUserMenu"
    class="user-dropdown"
  >
    <div class="user-info">
      <div class="user-avatar">
        <User :size="18" />
      </div>

      <div>
        <strong>
          {{ authStore.user?.name }}
        </strong>

        <span>
          {{ authStore.user?.email }}
        </span>
      </div>
    </div>

    <div class="dropdown-divider"></div>

<RouterLink
  to="/profile"
  class="profile-link"
  @click="showUserMenu = false"
>
  <User :size="17" />
  <span>Профиль</span>
</RouterLink>

<button
  class="logout-button"
  type="button"
  @click="logout"
>
  Выйти
</button>
  </div>

</div>

      </div>

    </div>
  </header>
  <AuthModal
  :is-open="showAuthModal"
  @close="closeAuthModal"
/>
</template>

<style scoped>

.header{
    position: sticky;
    top:0;
    z-index:100;

    backdrop-filter: blur(20px);

    background: rgba(8,15,32,.65);

    border-bottom:1px solid rgba(255,255,255,.08);
}

.header__container{
    height:80px;

    display:flex;
    align-items:center;
    justify-content:space-between;
}

.logo{
    display:flex;
    align-items:center;
    gap:10px;

    color:white;
    font-size:24px;
    font-weight:700;
    letter-spacing:1px;
}

.logo svg{
    color:#5B7CFA;
}

.nav{
    display:flex;
    gap:40px;
}

.nav a{
    color:#cfd7eb;
    text-decoration:none;
    transition:.25s;
}

.nav a:hover{
    color:white;
}

.actions{
    display:flex;
    gap:12px;
}

.icon-btn{

    width:42px;
    height:42px;

    display:flex;
    justify-content:center;
    align-items:center;

    border:none;

    border-radius:12px;

    background:rgba(255,255,255,.05);

    color:white;

    transition:.3s;
}

.icon-btn:hover{

    background:#5B7CFA;

    transform:translateY(-2px);

    box-shadow:0 8px 20px rgba(91,124,250,.35);

}

.cart-link {
  position: relative;
  text-decoration: none;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;

  min-width: 19px;
  height: 19px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 5px;

  border-radius: 10px;

  background: #5b7cfa;
  color: white;

  font-size: 10px;
  font-weight: 700;

  box-shadow: 0 4px 10px rgba(91, 124, 250, 0.35);
}

.favorites-link {
  position: relative;
  text-decoration: none;
}

.favorites-badge {
  position: absolute;
  top: -5px;
  right: -5px;

  min-width: 19px;
  height: 19px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 5px;

  border-radius: 50%;

  background: #ff6f91;
  color: white;

  font-size: 10px;
  font-weight: 700;

  box-shadow: 0 4px 10px rgba(255, 111, 145, 0.3);
}

.user-menu {
  position: relative;
}

.user-button {
  height: 42px;

  display: flex;
  align-items: center;
  gap: 8px;

  padding: 0 13px;

  border: none;
  border-radius: 12px;

  background: rgba(255, 255, 255, 0.05);

  color: white;

  font-size: 14px;
  font-weight: 500;

  cursor: pointer;

  transition: 0.3s;
}

.user-button:hover {
  background: #5b7cfa;

  transform: translateY(-2px);

  box-shadow:
    0 8px 20px rgba(91, 124, 250, 0.35);
}

.user-dropdown {
  position: absolute;

  top: 54px;
  right: 0;

  width: 250px;

  padding: 16px;

  border-radius: 16px;

  background: rgba(15, 25, 50, 0.98);

  border: 1px solid rgba(255, 255, 255, 0.1);

  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.4);

  backdrop-filter: blur(20px);

  z-index: 300;
}

.user-info {
  display: flex;
  align-items: center;

  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;

  background: rgba(91, 124, 250, 0.15);

  color: #7f9aff;
}

.user-info strong {
  display: block;

  margin-bottom: 4px;

  color: white;

  font-size: 14px;
}

.user-info span {
  display: block;

  color: #7f8ba5;

  font-size: 12px;

  word-break: break-all;
}

.dropdown-divider {
  height: 1px;

  margin: 15px 0;

  background: rgba(255, 255, 255, 0.08);
}

.logout-button {
  width: 100%;

  padding: 10px 12px;

  border: none;
  border-radius: 10px;

  background: rgba(255, 255, 255, 0.05);

  color: #cfd7eb;

  font-size: 14px;

  text-align: left;

  cursor: pointer;

  transition: 0.2s;
}

.logout-button:hover {
  background: rgba(255, 113, 142, 0.12);

  color: #ff718e;
}

.profile-link {
  width: 100%;

  box-sizing: border-box;

  padding: 10px 12px;

  display: flex;
  align-items: center;
  gap: 10px;

  border-radius: 10px;

  color: #cfd7eb;

  text-decoration: none;

  font-size: 14px;

  transition: 0.2s;
}

.profile-link:hover {
  background: rgba(91, 124, 250, 0.12);

  color: white;
}

.profile-link svg {
  color: #7f9aff;
}

/* =========================
   TABLET
========================= */

@media (max-width: 900px) {

  .header__container {
    height: 72px;
  }

  .logo {
    font-size: 20px;
  }

  .logo svg {
    width: 25px;
    height: 25px;
  }

  .nav {
    gap: 20px;
  }

  .nav a {
    font-size: 14px;
  }

  .actions {
    gap: 8px;
  }

  .user-button {
    padding: 0 10px;
  }
}


/* =========================
   MOBILE
========================= */

@media (max-width: 700px) {

  .header__container {
    height: 68px;
  }

  .logo {
    font-size: 18px;
    gap: 7px;
  }

  .logo svg {
    width: 23px;
    height: 23px;
  }

  .nav {
    display: none;
  }

  .actions {
    gap: 7px;
  }

  .icon-btn {
    width: 40px;
    height: 40px;
  }

  .user-button {
    width: 40px;
    height: 40px;

    padding: 0;

    justify-content: center;
  }

  .user-button span {
    display: none;
  }

  .user-dropdown {
    top: 50px;
    right: -5px;

    width: 240px;
  }
}


/* =========================
   SMALL MOBILE
========================= */

@media (max-width: 450px) {

  .header__container {
    padding-left: 16px;
    padding-right: 16px;
  }

  .logo span {
    display: none;
  }

  .logo {
    width: 40px;
    height: 40px;

    justify-content: center;
  }

  .actions {
    gap: 6px;
  }

  .icon-btn,
  .user-button {
    width: 38px;
    height: 38px;

    border-radius: 10px;
  }

  .cart-badge,
  .favorites-badge {
    top: -4px;
    right: -4px;

    min-width: 17px;
    height: 17px;

    padding: 0 4px;

    font-size: 9px;
  }

  .user-dropdown {
    right: -10px;
  }
}

</style>