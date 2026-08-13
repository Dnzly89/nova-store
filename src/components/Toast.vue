<script setup lang="ts">
import { Check, X } from 'lucide-vue-next'

defineProps<{
  visible: boolean
  message: string
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Transition name="toast">
    <div
      v-if="visible"
      class="toast"
    >
      <div class="toast__icon">
        <Check :size="18" />
      </div>

      <div class="toast__content">
        <strong>{{ message }}</strong>
        <span>Product successfully added</span>
      </div>

      <button
        type="button"
        class="toast__close"
        @click="emit('close')"
      >
        <X :size="17" />
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.toast {
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 1000;

  min-width: 320px;

  display: flex;
  align-items: center;
  gap: 13px;

  padding: 15px 17px;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;

  background: rgba(15, 24, 45, 0.92);

  backdrop-filter: blur(20px);

  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.35),
    0 0 30px rgba(91, 124, 250, 0.12);

  color: white;
}

.toast__icon {
  width: 36px;
  height: 36px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: rgba(76, 217, 143, 0.15);
  color: #4cd98f;
}

.toast__content {
  display: flex;
  flex-direction: column;
  gap: 3px;

  flex: 1;
}

.toast__content strong {
  font-size: 14px;
}

.toast__content span {
  color: #8d98b3;
  font-size: 12px;
}

.toast__close {
  width: 30px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 8px;

  background: transparent;
  color: #7f8baa;

  cursor: pointer;

  transition: 0.2s;
}

.toast__close:hover {
  background: rgba(255, 255, 255, 0.06);
  color: white;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 600px) {
  .toast {
    right: 15px;
    bottom: 15px;
    left: 15px;

    min-width: auto;
  }
}
</style>