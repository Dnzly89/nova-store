import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Home from '@/pages/Home.vue'
import Catalog from '@/pages/Catalog.vue'
import { useAuthStore } from '@/stores/auth.store'
import NewProducts from '@/pages/NewProducts.vue'
import Sale from '@/pages/Sale.vue'
import ProductDetails from '@/pages/ProductDetails.vue'
import Cart from '@/pages/Cart.vue'
import Favorites from '@/pages/Favorites.vue'
import Profile from '@/pages/Profile.vue'
import New from '@/pages/New.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: Catalog,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
    },
      {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites,
    },
    {
      path: '/new',
      name: 'new',
      component: New,
    },
    {
      path: '/sale',
      name: 'sale',
      component: Sale,
    },
    {
    path: '/product/:id',
    name: 'product',
    component: ProductDetails,
  },
  ],
})
router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return '/'
  }
})
export default router