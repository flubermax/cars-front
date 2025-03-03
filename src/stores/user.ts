import { CarItem } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
// import { useCarsStore } from '@/stores/cars'
import { User } from '@/components/models'
import Api from '@/utils/api'

export const useUserStore = defineStore('userStore', () => {
  const currentUser = ref<User | null>(null)

  const isAuth = computed(() => currentUser.value !== null)

  const loginUpperCase = computed(() => (currentUser.value ? currentUser.value.login.toUpperCase() : ''))

  const favoritesCars = computed(() => (currentUser.value ? currentUser.value.favorites : []))

  function updateUserData(user: User) {
    currentUser.value = { ...user }
  }

  async function loginUser(login: User['login'], password: User['password']) {
    try {
      const res = await Api.post('user/login', { login, password })
      if (res.success) {
        currentUser.value = res.user
        localStorage.setItem('quasarCarsToken', JSON.stringify(res.token))
      }
      return res
    } catch (error) {
      console.log(error)
    }
  }

  function logoutUser(): void {
    localStorage.removeItem('quasarCarsToken')
    currentUser.value = null
  }

  async function addToFav(item: CarItem) {
    try {
      const res = await Api.post('user/add-to-fav', { userIdf: currentUser.value?.idf, carIdf: item.idf })
      if (res.success) {
        currentUser.value = res.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    currentUser,
    updateUserData,
    loginUpperCase,
    loginUser,
    logoutUser,
    isAuth,
    favoritesCars,
    addToFav,
  }
})
