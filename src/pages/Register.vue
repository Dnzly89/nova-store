<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

const handleRegister = () => {
  error.value = ''

  if (
    !name.value ||
    !email.value ||
    !password.value ||
    !confirmPassword.value
  ) {
    error.value = 'Заполните все поля'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Пароли не совпадают'
    return
  }

  if (password.value.length < 6) {
    error.value = 'Пароль должен содержать минимум 6 символов'
    return
  }

  authStore.register(
    name.value,
    email.value,
    password.value
  )

  router.push('/')
}
</script>

<template>
  <main class="auth-page">
    <div class="auth-card">
      <h1>Регистрация</h1>

      <p class="auth-subtitle">
        Создайте аккаунт Nova Store
      </p>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="name">Имя</label>

          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="Введите ваше имя"
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>

          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Введите email"
          />
        </div>

        <div class="form-group">
          <label for="password">Пароль</label>

          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Минимум 6 символов"
          />
        </div>

        <div class="form-group">
          <label for="confirm-password">
            Повторите пароль
          </label>

          <input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            placeholder="Повторите пароль"
          />
        </div>

        <p v-if="error" class="error">
          {{ error }}
        </p>

        <button type="submit">
          Зарегистрироваться
        </button>
      </form>

      <p class="login-link">
        Уже есть аккаунт?
        <RouterLink to="/login">
          Войти
        </RouterLink>
      </p>
    </div>
  </main>
</template>

<style scoped>
.auth-page {
  min-height: calc(100vh - 160px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  padding: 40px;
  border-radius: 20px;
  background: white;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

h1 {
  margin-bottom: 10px;
  text-align: center;
}

.auth-subtitle {
  margin-bottom: 30px;
  text-align: center;
  color: #777;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #555;
}

button {
  width: 100%;
  padding: 13px;
  border: none;
  border-radius: 10px;
  background: #111;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}

.error {
  margin-bottom: 15px;
  color: #d33;
  text-align: center;
}

.login-link {
  margin-top: 25px;
  text-align: center;
  color: #777;
}

.login-link a {
  color: #111;
  font-weight: 500;
}
</style>