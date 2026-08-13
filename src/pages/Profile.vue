<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <main class="profile-page">

    <div class="profile-card">

      <div class="profile-avatar">
        👤
      </div>

      <h1>
        {{ authStore.user?.name }}
      </h1>

      <p class="profile-email">
        {{ authStore.user?.email }}
      </p>

      <div class="profile-info">
        <div>
          <span>Имя</span>
          <strong>{{ authStore.user?.name }}</strong>
        </div>

        <div>
          <span>Email</span>
          <strong>{{ authStore.user?.email }}</strong>
        </div>
      </div>

      <button
        class="logout-button"
        type="button"
        @click="handleLogout"
        >
        Выйти
        </button>

    </div>

  </main>
</template>

<style scoped>
.profile-page {
  min-height: calc(100vh - 80px);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 40px 20px;
}

.profile-card {
  width: 100%;
  max-width: 500px;

  padding: 40px;

  border-radius: 24px;

  text-align: center;

  background:
    linear-gradient(
      145deg,
      rgba(22, 34, 67, 0.95),
      rgba(9, 16, 35, 0.95)
    );

  border: 1px solid rgba(255, 255, 255, 0.08);

  box-shadow:
    0 25px 70px rgba(0, 0, 0, 0.35);
}

.profile-avatar {
  width: 80px;
  height: 80px;

  margin: 0 auto 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: rgba(91, 124, 250, 0.15);

  font-size: 36px;
}

.profile-card h1 {
  margin: 0 0 8px;

  color: white;

  font-size: 28px;
}

.profile-email {
  margin: 0 0 30px;

  color: #8792ac;
}

.profile-info {
  display: flex;
  flex-direction: column;

  gap: 12px;

  margin-bottom: 25px;
}

.profile-info div {
  padding: 15px;

  border-radius: 12px;

  background: rgba(255, 255, 255, 0.04);

  text-align: left;
}

.profile-info span {
  display: block;

  margin-bottom: 5px;

  color: #69758f;

  font-size: 12px;
}

.profile-info strong {
  color: white;

  font-size: 14px;
}

.logout-button {
  width: 100%;

  padding: 13px;

  border: none;

  border-radius: 11px;

  background: #5b7cfa;

  color: white;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.25s;
}

.logout-button:hover {
  transform: translateY(-1px);
}
</style>