import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface User {
  login: string
  password: string
  name: string
  age: number | null
}

export const useUserStore = defineStore('userStore', () => {
  const usersList = ref<User[]>([
    {
      login: 'admin',
      password: 'qwe123',
      name: 'Max',
      age: 32,
    },
    {
      login: 'lolka',
      password: '123',
      name: 'Egor',
      age: 38,
    },
    {
      login: 'kek228',
      password: '123123',
      name: 'Valera',
      age: 21,
    },
  ])

  const currentUser = ref<User | null>(null)

  const loginUpperCase = computed(() => (currentUser.value ? currentUser.value.login.toUpperCase() : ''))

  function loginHandler(login: string, password: string): User | null {
    // console.log('--------------------')
    // console.log(login, typeof password)
    const user = usersList.value.find((item) => item.login === login)
    console.log('in store ', user, user?.password === password)
    if (user) {
      currentUser.value = user.password === password ? user : null
      return currentUser.value
    } else {
      return null
    }
  }

  function logout(): void {
    currentUser.value = null
  }

  return { currentUser, loginUpperCase, loginHandler, logout }
})
