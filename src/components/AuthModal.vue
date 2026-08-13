<script setup lang="ts">
import { ref } from 'vue'
import { Check, X } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth.store'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const authStore = useAuthStore()

const mode = ref<'login' | 'register'>('login')

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const error = ref('')
const successMessage = ref('')

const switchMode = (newMode: 'login' | 'register') => {
  mode.value = newMode

  error.value = ''
  successMessage.value = ''
}

const closeModal = () => {
  error.value = ''
  successMessage.value = ''

  emit('close')
}

const handleSubmit = () => {
  error.value = ''
  successMessage.value = ''

  // =========================
  // LOGIN
  // =========================

  if (mode.value === 'login') {
    if (!email.value || !password.value) {
      error.value = 'Заполните все поля'
      return
    }

    const success = authStore.login(
      email.value,
      password.value
    )

    if (!success) {
      error.value = 'Неверный email или пароль'
      return
    }

    successMessage.value =
      `Добро пожаловать, ${authStore.user?.name}!`

    return
  }

  // =========================
  // REGISTER
  // =========================

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

  successMessage.value =
    `Аккаунт создан! Добро пожаловать, ${name.value}!`
}
</script>

<template>
  <Transition name="modal">
    <div
      v-if="props.isOpen"
      class="modal-overlay"
      @click.self="closeModal"
    >
      <div class="auth-modal">

        <!-- CLOSE -->

        <button
          class="close-button"
          type="button"
          @click="closeModal"
        >
          <X :size="22" />
        </button>


        <!-- ========================= -->
        <!-- SUCCESS SCREEN -->
        <!-- ========================= -->

        <div
          v-if="successMessage"
          class="success-screen"
        >
          <div class="success-icon">
            <Check :size="36" />
          </div>

          <h2>
            Вы успешно авторизованы!
          </h2>

          <p>
            {{ successMessage }}
          </p>

          <button
            type="button"
            class="submit-button"
            @click="closeModal"
          >
            Продолжить
          </button>
        </div>


        <!-- ========================= -->
        <!-- AUTH FORM -->
        <!-- ========================= -->

        <div v-else>

          <!-- HEADER -->

          <div class="modal-header">

            <div class="modal-icon">
              <span>✦</span>
            </div>

            <h2>
              {{
                mode === 'login'
                  ? 'С возвращением'
                  : 'Создать аккаунт'
              }}
            </h2>

            <p>
              {{
                mode === 'login'
                  ? 'Войдите в свой аккаунт Nova Store'
                  : 'Присоединяйтесь к Nova Store'
              }}
            </p>

          </div>


          <!-- TABS -->

          <div class="tabs">

            <button
              type="button"
              :class="{ active: mode === 'login' }"
              @click="switchMode('login')"
            >
              Войти
            </button>

            <button
              type="button"
              :class="{ active: mode === 'register' }"
              @click="switchMode('register')"
            >
              Регистрация
            </button>

          </div>


          <!-- FORM -->

          <form @submit.prevent="handleSubmit">

            <!-- NAME -->

            <div
              v-if="mode === 'register'"
              class="form-group"
            >
              <label for="auth-name">
                Имя
              </label>

              <input
                id="auth-name"
                v-model="name"
                type="text"
                placeholder="Ваше имя"
              />
            </div>


            <!-- EMAIL -->

            <div class="form-group">

              <label for="auth-email">
                Email
              </label>

              <input
                id="auth-email"
                v-model="email"
                type="email"
                placeholder="example@mail.com"
              />

            </div>


            <!-- PASSWORD -->

            <div class="form-group">

              <label for="auth-password">
                Пароль
              </label>

              <input
                id="auth-password"
                v-model="password"
                type="password"
                placeholder="Минимум 6 символов"
              />

            </div>


            <!-- CONFIRM PASSWORD -->

            <div
              v-if="mode === 'register'"
              class="form-group"
            >

              <label for="auth-confirm-password">
                Повторите пароль
              </label>

              <input
                id="auth-confirm-password"
                v-model="confirmPassword"
                type="password"
                placeholder="Повторите пароль"
              />

            </div>


            <!-- ERROR -->

            <p
              v-if="error"
              class="error"
            >
              {{ error }}
            </p>


            <!-- SUBMIT -->

            <button
              class="submit-button"
              type="submit"
            >
              {{
                mode === 'login'
                  ? 'Войти в аккаунт'
                  : 'Создать аккаунт'
              }}
            </button>

          </form>


          <!-- BOTTOM -->

          <p class="bottom-text">

            {{
              mode === 'login'
                ? 'Нет аккаунта?'
                : 'Уже есть аккаунт?'
            }}

            <button
              type="button"
              @click="
                switchMode(
                  mode === 'login'
                    ? 'register'
                    : 'login'
                )
              "
            >
              {{
                mode === 'login'
                  ? 'Зарегистрироваться'
                  : 'Войти'
              }}
            </button>

          </p>

        </div>

      </div>
    </div>
  </Transition>
</template>

<style scoped>

.modal-overlay {
  position: fixed;
  inset: 0;

  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  background: rgba(3, 7, 18, 0.75);

  backdrop-filter: blur(8px);
}


/* =========================
   MODAL
========================= */

.auth-modal {
  position: relative;

  width: 100%;
  max-width: 440px;

  padding: 36px;

  border-radius: 24px;

  background:
    linear-gradient(
      145deg,
      rgba(22, 34, 67, 0.98),
      rgba(9, 16, 35, 0.98)
    );

  border: 1px solid rgba(255, 255, 255, 0.1);

  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.5),
    0 0 50px rgba(91, 124, 250, 0.08);
}


/* =========================
   CLOSE
========================= */

.close-button {
  position: absolute;

  top: 18px;
  right: 18px;

  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 10px;

  background: rgba(255, 255, 255, 0.06);

  color: #cfd7eb;

  cursor: pointer;

  transition: 0.2s;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.12);
  color: white;
}


/* =========================
   HEADER
========================= */

.modal-header {
  text-align: center;

  margin-bottom: 26px;
}

.modal-icon {
  width: 54px;
  height: 54px;

  margin: 0 auto 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 16px;

  background: rgba(91, 124, 250, 0.15);

  color: #7f9aff;

  font-size: 25px;

  box-shadow:
    0 0 30px rgba(91, 124, 250, 0.12);
}

.modal-header h2 {
  margin: 0 0 8px;

  color: white;

  font-size: 26px;
}

.modal-header p {
  margin: 0;

  color: #8792ac;

  font-size: 14px;
}


/* =========================
   TABS
========================= */

.tabs {
  display: grid;

  grid-template-columns: 1fr 1fr;

  padding: 4px;

  margin-bottom: 24px;

  border-radius: 12px;

  background: rgba(255, 255, 255, 0.05);
}

.tabs button {
  padding: 10px;

  border: none;

  border-radius: 9px;

  background: transparent;

  color: #8792ac;

  font-size: 14px;

  cursor: pointer;

  transition: 0.25s;
}

.tabs button.active {
  background: #5b7cfa;

  color: white;

  box-shadow:
    0 5px 15px rgba(91, 124, 250, 0.25);
}


/* =========================
   FORM
========================= */

.form-group {
  margin-bottom: 17px;
}

.form-group label {
  display: block;

  margin-bottom: 8px;

  color: #dce3f5;

  font-size: 13px;

  font-weight: 500;
}

.form-group input {
  width: 100%;

  box-sizing: border-box;

  padding: 13px 14px;

  border: 1px solid rgba(255, 255, 255, 0.1);

  border-radius: 11px;

  outline: none;

  background: rgba(255, 255, 255, 0.05);

  color: white;

  font-size: 14px;

  transition: 0.2s;
}

.form-group input::placeholder {
  color: #69758f;
}

.form-group input:focus {
  border-color: #5b7cfa;

  background: rgba(91, 124, 250, 0.07);

  box-shadow:
    0 0 0 3px rgba(91, 124, 250, 0.1);
}


/* =========================
   ERROR
========================= */

.error {
  margin: 0 0 15px;

  color: #ff718e;

  font-size: 13px;

  text-align: center;
}


/* =========================
   SUBMIT
========================= */

.submit-button {
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

  box-shadow:
    0 8px 25px rgba(91, 124, 250, 0.25);
}

.submit-button:hover {
  transform: translateY(-1px);

  box-shadow:
    0 12px 30px rgba(91, 124, 250, 0.35);
}


/* =========================
   SUCCESS
========================= */

.success-screen {
  text-align: center;

  padding: 25px 0 10px;
}

.success-icon {
  width: 72px;
  height: 72px;

  margin: 0 auto 22px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: rgba(91, 124, 250, 0.15);

  border: 1px solid rgba(91, 124, 250, 0.35);

  color: #7f9aff;

  box-shadow:
    0 0 35px rgba(91, 124, 250, 0.2);
}

.success-screen h2 {
  margin: 0 0 12px;

  color: white;

  font-size: 24px;
}

.success-screen p {
  margin: 0 0 28px;

  color: #8792ac;

  font-size: 14px;

  line-height: 1.5;
}


/* =========================
   BOTTOM
========================= */

.bottom-text {
  margin: 20px 0 0;

  color: #7f8ba5;

  font-size: 13px;

  text-align: center;
}

.bottom-text button {
  padding: 0;

  border: none;

  background: transparent;

  color: #7f9aff;

  font-size: 13px;

  cursor: pointer;
}


/* =========================
   ANIMATION
========================= */

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-active .auth-modal,
.modal-leave-active .auth-modal {
  transition: transform 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .auth-modal,
.modal-leave-to .auth-modal {
  transform: translateY(20px) scale(0.97);
}


/* =========================
   MOBILE
========================= */

@media (max-width: 500px) {
  .auth-modal {
    padding: 28px 20px;
  }
}

</style>