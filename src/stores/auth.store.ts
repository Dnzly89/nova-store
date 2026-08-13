import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

interface User {
  name: string
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(
    JSON.parse(localStorage.getItem('nova-user') || 'null')
  )

  const isAuthenticated = computed(() => user.value !== null)

  const register = (name: string, email: string, password: string) => {
    const newUser: User = {
      name,
      email,
      password,
    }

    localStorage.setItem('nova-user', JSON.stringify(newUser))
    user.value = newUser
  }

  const login = (email: string, password: string) => {
    const savedUser = JSON.parse(
      localStorage.getItem('nova-user') || 'null'
    ) as User | null

    if (!savedUser) {
      return false
    }

    if (savedUser.email !== email || savedUser.password !== password) {
      return false
    }

    user.value = savedUser
    return true
  }

  const logout = () => {
    localStorage.removeItem('nova-user')
    user.value = null
  }

  return {
    user,
    isAuthenticated,
    register,
    login,
    logout,
  }
})